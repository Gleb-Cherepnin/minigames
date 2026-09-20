import type { Page } from '@/app/router';
import { Header } from '@/components/header/header';
import { createElement } from '@/utils/dom';

import './home-page.scss';

export class HomePage implements Page {
  private readonly header = new Header();

  public render(): HTMLElement {
    return createElement('div', {
      className: 'home-page',
      children: [
        this.header.render(),
        createElement('main', { className: 'home-page__main' }),
        this.header.renderMenu(),
      ],
    });
  }

  public destroy(): void {
    this.header.destroy();
  }
}
