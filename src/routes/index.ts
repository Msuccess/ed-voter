import { Router } from 'express';
import auth from './auth';
import aspirant from './aspirant';
import shared from './shared';

const routes = Router();

routes.use('/auth', auth);
routes.use('/aspirant', aspirant);

routes.use('/upload', shared);

export default routes;
