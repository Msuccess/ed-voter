import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Voter } from '../entity/Voter';

export class VoterController {
  public async getVoter(req: Request, res: Response) {
    const voterRepository = getRepository(Voter);
    try {
      const Voters = await voterRepository.find();
      res.status(200).send(Voters);
    } catch (error) {
      res.status(500).send('An error occured');
      return;
    }
  }

  public async createVoter(req: Request, res: Response) {
    const voterRepository = getRepository(Voter);
    try {
      const Voter: Voter = req.body;
      await voterRepository.save(Voter);
      res.status(201).send('Voter Created');
    } catch (error) {
      res.status(500).send('An error occured');
      return;
    }
  }

  public async updateVoter(req: Request, res: Response) {
    const voterRepository = getRepository(Voter);

    try {
      const { id } = req.params;
      const Voter: Voter = req.body;

      const Voterdb = await voterRepository.findOne(id);
      if (!Voterdb) {
        return res.status(400).send('Voter does not exist');
      }
      const newVoter = await voterRepository.update(id, Voter);

      res.status(201).send('Voter Updated');
    } catch (error) {
      console.log('EEEEE', error);
      res.status(500).send('An error occured');
      return;
    }
  }

  public async getVoterById(req: Request, res: Response) {
    const voterRepository = getRepository(Voter);

    try {
      const { id } = req.params;
      const Voter = await voterRepository.findOne(id);
      res.status(200).send(Voter);
    } catch (error) {
      res.status(500).send('An error occured');
      return;
    }
  }

  public async deleteVoter(req: Request, res: Response) {
    const voterRepository = getRepository(Voter);

    try {
      const { id } = req.params;
      await voterRepository.delete(id);
      res.status(200).send('Voter deleted');
    } catch (error) {
      res.status(500).send('An error occured');
      return;
    }
  }
}
