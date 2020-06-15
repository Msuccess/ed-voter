import { Request, Response, Router } from 'express';

export class UploadController {
  router = Router();

  public async uploadSingleFile(req: Request, res: Response) {
    try {
      const avatar = req.file;

      // make sure file is available
      if (!avatar) {
        res.status(400).send({
          status: false,
          data: 'No file is selected.',
        });
      } else {
        // send response
        res.send({
          status: true,
          message: 'File is uploaded.',
          data: {
            name: avatar.originalname,
            mimetype: avatar.mimetype,
            size: avatar.size,
          },
        });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }

  public async uploadMultiple(req: Request, res: Response) {
    try {
      const avatars = req.files;

      if (!avatars) {
        res.status(400).send({
          status: false,
          data: 'No photo is selected.',
        });
      } else {
        let data = [];

        // avatars.forEach((p: { originalname: any; mimetype: any; size: any }) =>
        //   data.push({
        //     name: p.originalname,
        //     mimetype: p.mimetype,
        //     size: p.size,
        //   })
        // );

        // send response
        res.send({
          status: true,
          message: 'Photos are uploaded.',
          data: data,
        });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
