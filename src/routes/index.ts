import { Router } from 'express';
import auth from './auth';
import aspirant from './aspirant';
import shared from './shared';
import pollagent from './pollagent';
import voter from './voter';
import { IndexController } from '../controllers/IndexController';

const indexController = new IndexController();

const routes = Router();
routes.use('/', indexController.welcome);
routes.use('/auth', auth);
routes.use('/aspirant', aspirant);
routes.use('/pollagent', pollagent);
routes.use('/voter', voter);

routes.use('/upload', shared);

export default routes;
