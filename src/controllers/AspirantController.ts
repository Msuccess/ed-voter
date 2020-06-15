import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { AspirantDto } from '../entity/dto/aspirant.dto';
import { Aspirant } from '../entity/Aspirant';

export class AspirantController {
  public async getAspirant(req: Request, res: Response) {
    const aspirantRepository = getRepository(Aspirant);
    try {
      const aspirants = await aspirantRepository.find();
      res.status(200).send(aspirants);
    } catch (error) {
      res.status(500).send('An error occured');
      return;
    }
  }

  public async createAspirant(req: Request, res: Response) {
    const aspirantRepository = getRepository(Aspirant);
    try {
      const aspirant: AspirantDto = req.body;
      await aspirantRepository.save(aspirant);
      res.status(201).send('Aspirant Created');
    } catch (error) {
      res.status(500).send('An error occured');
      return;
    }
  }

  public async updateAspirant(req: Request, res: Response) {
    const aspirantRepository = getRepository(Aspirant);

    try {
      const { id } = req.params;
      const aspirant: AspirantDto = req.body;

      const aspirantdb = await aspirantRepository.findOne(id);
      if (!aspirantdb) {
        return res.status(400).send('Aspirant does not exist');
      }
      const newAspirant = await aspirantRepository.update(id, aspirant);

      res.status(201).send('Aspirant Updated');
    } catch (error) {
      console.log('EEEEE', error);
      res.status(500).send('An error occured');
      return;
    }
  }

  public async getAspirantById(req: Request, res: Response) {
    const aspirantRepository = getRepository(Aspirant);

    try {
      const { id } = req.params;
      const aspirant = await aspirantRepository.findOne(id);
      res.status(200).send(aspirant);
    } catch (error) {
      res.status(500).send('An error occured');
      return;
    }
  }

  public async deleteAspirant(req: Request, res: Response) {
    const aspirantRepository = getRepository(Aspirant);

    try {
      const { id } = req.params;
      await aspirantRepository.delete(id);
      res.status(200).send('Aspirant deleted');
    } catch (error) {
      res.status(500).send('An error occured');
      return;
    }
  }
}
