import { HomePage } from '@/pages/home/home-page';
import { AppRoute } from '@/types/routes';

import { Router } from './router';

import '@/styles/global.scss';

const root = document.createElement('div');
root.className = 'app';
document.body.append(root);

new Router(root, AppRoute.Home).addRoute(AppRoute.Home, () => new HomePage()).start();
