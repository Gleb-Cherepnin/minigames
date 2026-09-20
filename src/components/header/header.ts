import { AppRoute } from '@/types/routes';
import { createElement } from '@/utils/dom';

import '@/components/button/button.scss';
import './header.scss';

const NAV_LINKS = ['Home', 'Library', 'Tournaments', 'Community'] as const;

export class Header {
  public render(): HTMLElement {
    return createElement('header', {
      className: 'header',
      children: [this.renderBrand(), this.renderActions()],
    });
  }

  private renderBrand(): HTMLElement {
    return createElement('a', {
      className: 'header__brand',
      attributes: { href: AppRoute.Home },
      children: [
        createElement('img', {
          className: 'header__logo',
          attributes: { src: '/assets/icons/logo.png', alt: '', width: '32', height: '32' },
        }),
        createElement('span', { className: 'header__brand-name', text: 'MiniGames' }),
      ],
    });
  }

  private renderActions(): HTMLElement {
    return createElement('div', {
      className: 'header__actions',
      children: [this.renderNav(), this.renderButtons(), this.renderBurger()],
    });
  }

  private renderNav(): HTMLElement {
    const items = NAV_LINKS.map((label, index) => {
      const isActive = index === 0;
      const link = createElement('a', {
        className: isActive ? 'header__nav-link header__nav-link--active' : 'header__nav-link',
        text: label,
        attributes: isActive
          ? { href: AppRoute.Home, 'aria-current': 'page' }
          : { href: AppRoute.Home },
      });

      return createElement('li', { children: [link] });
    });

    return createElement('nav', {
      className: 'header__nav',
      attributes: { 'aria-label': 'Main navigation' },
      children: [createElement('ul', { className: 'header__nav-list', children: items })],
    });
  }

  private renderButtons(): HTMLElement {
    return createElement('div', {
      className: 'header__buttons',
      children: [
        createElement('button', {
          className: 'button header__login',
          text: 'Log In',
          attributes: { type: 'button' },
        }),
        createElement('button', {
          className: 'button button--primary header__signup',
          text: 'Sign Up',
          attributes: { type: 'button' },
        }),
      ],
    });
  }

  private renderBurger(): HTMLElement {
    return createElement('button', {
      className: 'header__burger',
      attributes: { type: 'button', 'aria-label': 'Open menu', 'aria-expanded': 'false' },
      children: [
        createElement('img', {
          attributes: { src: '/assets/icons/burger.svg', alt: '', width: '32', height: '32' },
        }),
      ],
    });
  }
}
