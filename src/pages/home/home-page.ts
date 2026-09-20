import type { Page } from '@/app/router';
import { AuthDialog, type AuthMode } from '@/components/auth-dialog/auth-dialog';
import { Carousel } from '@/components/carousel/carousel';
import { DeveloperCta } from '@/components/developer-cta/developer-cta';
import { Footer } from '@/components/footer/footer';
import { Header } from '@/components/header/header';
import { Hero } from '@/components/hero/hero';
import { Leaderboard } from '@/components/leaderboard/leaderboard';
import { createElement } from '@/utils/dom';

import './home-page.scss';

export class HomePage implements Page {
  private readonly authDialog = new AuthDialog();

  private readonly header = new Header((mode: AuthMode) => {
    this.authDialog.open(mode);
  });

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
        this.authDialog.render(),
      ],
    });
  }

  public destroy(): void {
    this.header.destroy();
  }
}
