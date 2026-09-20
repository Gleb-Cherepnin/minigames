import type { Page } from '@/app/router';
import { Header } from '@/components/header/header';
import { createElement } from '@/utils/dom';

import './home-page.scss';

export class HomePage implements Page {
  public render(): HTMLElement {
    return createElement('div', {
      className: 'home-page',
      children: [new Header().render(), createElement('main', { className: 'home-page__main' })],
    });
  }
}
