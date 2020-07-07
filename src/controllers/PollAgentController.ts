import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { PollAgent } from '../entity/PollAgent';

export class PollAgentController {
  public async getPollAgent(req: Request, res: Response) {
    const PollAgentRepository = getRepository(PollAgent);
    try {
      const PollAgents = await PollAgentRepository.find();
      res.status(200).send(PollAgents);
    } catch (error) {
      res.status(500).send('An error occured');
      return;
    }
  }

  public async createPollAgent(req: Request, res: Response) {
    const PollAgentRepository = getRepository(PollAgent);
    try {
      const PollAgent: PollAgent = req.body;
      await PollAgentRepository.save(PollAgent);
      res.status(201).send('PollAgent Created');
    } catch (error) {
      res.status(500).send('An error occured');
      return;
    }
  }

  public async updatePollAgent(req: Request, res: Response) {
    const PollAgentRepository = getRepository(PollAgent);

    try {
      const { id } = req.params;
      const PollAgent: PollAgent = req.body;

      const PollAgentdb = await PollAgentRepository.findOne(id);
      if (!PollAgentdb) {
        return res.status(400).send('PollAgent does not exist');
      }
      const newPollAgent = await PollAgentRepository.update(id, PollAgent);

      res.status(201).send('PollAgent Updated');
    } catch (error) {
      console.log('EEEEE', error);
      res.status(500).send('An error occured');
      return;
    }
  }

  public async getPollAgentById(req: Request, res: Response) {
    const PollAgentRepository = getRepository(PollAgent);

    try {
      const { id } = req.params;
      const PollAgent = await PollAgentRepository.findOne(id);
      res.status(200).send(PollAgent);
    } catch (error) {
      res.status(500).send('An error occured');
      return;
    }
  }

  public async deletePollAgent(req: Request, res: Response) {
    const PollAgentRepository = getRepository(PollAgent);

    try {
      const { id } = req.params;
      await PollAgentRepository.delete(id);
      res.status(200).send('PollAgent deleted');
    } catch (error) {
      res.status(500).send('An error occured');
      return;
    }
  }
}
