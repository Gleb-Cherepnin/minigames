import type { Page } from '@/app/router';
import { createElement } from '@/utils/dom';

import './home-page.scss';

export class HomePage implements Page {
  public render(): HTMLElement {
    return createElement('main', {
      className: 'home-page',
      children: [createElement('h1', { text: 'MiniGames' })],
    });
  }
}
