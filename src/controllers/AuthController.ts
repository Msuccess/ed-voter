import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import { User } from '../entity/User';
import config from '../config/config';

export class AuthController {
  public async changePassword(req: Request, res: Response) {
    const id = res.locals.jwtPayload.userId;

    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }

    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send();
      return;
    }

    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    user.hashPassword();
    userRepository.save(user);

    res.status(204).send();
  }

  public async register(req: Request, res: Response) {
    const user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;

    user.role = 'user';

    await validate(user)
      .then((errors) => {
        if (errors.length > 0) {
          res.status(400).send(errors);
          return;
        }
      })
      .catch((err) => {
        console.log('Error>>>', err);
      });

    user.hashPassword();

    const userRepository = getRepository(User);

    await userRepository
      .save(user)
      .then(() => {
        res.status(201).send('User created');
      })
      .catch((err) => {
        console.log('Error>>>', err);
        res.status(409).send('Username  already in use');
      });
  }

  public async login(req: Request, res: Response) {
    let { username, password } = req.body;

    if (!(username && password)) {
      res.status(400).send('Wrong credentials');
    }

    const userRepository = getRepository(User);
    let user: User;

    try {
      user = await userRepository.findOne({ where: { username } });
      user.checkIfUnencryptedPasswordIsValid(password);
    } catch (error) {
      res.status(401).send('username or password invalid');
      return;
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      token: token,
      data: user,
      message: 'Login successful',
    });
  }

  public async getUser(req: Request, res: Response) {
    const userRepository = getRepository(User);
    try {
      const users = await userRepository.find();
      res.send(users);
    } catch (error) {
      res.status(500).send('An error occured');
      return;
    }
  }

  public async getUserById(req: Request, res: Response) {
    const id: string = req.params.id;
    const userRepository = getRepository(User);

    try {
      const user = await userRepository.findOne(id);
      res.json({
        data: user,
        message: 'Get data successful',
      });
    } catch (error) {
      res.status(404).send('User not found');
      return;
    }
  }
}
