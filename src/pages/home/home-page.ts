import type { Page } from '@/app/router';
import { Carousel } from '@/components/carousel/carousel';
import { DeveloperCta } from '@/components/developer-cta/developer-cta';
import { Footer } from '@/components/footer/footer';
import { Header } from '@/components/header/header';
import { Hero } from '@/components/hero/hero';
import { Leaderboard } from '@/components/leaderboard/leaderboard';
import { createElement } from '@/utils/dom';

import './home-page.scss';

export class HomePage implements Page {
  private readonly header = new Header();

  public render(): HTMLElement {
    return createElement('div', {
      className: 'home-page',
      children: [
        this.header.render(),
        createElement('main', {
          className: 'home-page__main',
          children: [
            new Hero().render(),
            new Carousel().render(),
            new Leaderboard().render(),
            new DeveloperCta().render(),
          ],
        }),
        new Footer().render(),
        this.header.renderMenu(),
      ],
    });
  }

  public destroy(): void {
    this.header.destroy();
  }
}
