import multer = require('multer');
import path = require('path');
import { extname } from 'path';

export default {
  jwtSecret: '@QEGTUI',
};

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (
    _req: any,
    file: { originalname: string },
    callback: (arg0: any, arg1: string) => void
  ) {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = `${new Date().toDateString()}-${new Date().getTime()}`;
    callback(null, `${name}-${randomName.trim()}${fileExtName}`);
  },
});

export const fileFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Image uploaded is not of type jpg/jpeg or png'), false);
  }
};
