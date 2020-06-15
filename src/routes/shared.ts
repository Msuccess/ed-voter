import { Router } from 'express';
import { UploadController } from '../controllers/shared/UploadController';
import { storage, fileFilter } from '../config/config';

import multer = require('multer');

const router = Router();

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    files: 5, // allow up to 5 files per request,
    fieldSize: 2 * 1024 * 1024, // 2 MB (max file size)
  },
});

const uploadController = new UploadController();

router.post('/', upload.single('avatar'), uploadController.uploadSingleFile);

router.post(
  '/multiple',
  upload.array('avatars', 10),
  uploadController.uploadSingleFile
);

export default router;
