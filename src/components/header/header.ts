import { AuthMode } from '@/components/auth-dialog/auth-dialog';
import { MobileMenu } from '@/components/mobile-menu/mobile-menu';
import { AppRoute } from '@/types/routes';
import { createElement } from '@/utils/dom';

import '@/components/button/button.scss';
import './header.scss';

const NAV_LINKS = ['Home', 'Library', 'Tournaments', 'Community'] as const;

export class Header {
  private readonly burger: HTMLButtonElement;

  private readonly menu: MobileMenu;

  constructor(private readonly onAuthRequest: (mode: AuthMode) => void) {
    this.burger = this.buildBurger();
    this.menu = new MobileMenu(() => {
      this.setBurgerOpen(false);
    }, onAuthRequest);

    this.burger.addEventListener('click', () => {
      this.menu.open();
      this.setBurgerOpen(true);
    });
  }

  public render(): HTMLElement {
    return createElement('header', {
      className: 'header',
      children: [this.renderBrand(), this.renderActions()],
    });
  }

  public renderMenu(): HTMLElement {
    return this.menu.render();
  }

  public destroy(): void {
    this.menu.destroy();
  }

  private setBurgerOpen(isOpen: boolean): void {
    this.burger.classList.toggle('header__burger--open', isOpen);
    this.burger.setAttribute('aria-expanded', String(isOpen));
  }

  private renderBrand(): HTMLElement {
    return createElement('a', {
      className: 'header__brand',
      attributes: { href: AppRoute.Home },
      children: [
        createElement('img', {
          className: 'header__logo',
          attributes: { src: '/assets/icons/logo.svg', alt: '', width: '32', height: '32' },
        }),
        createElement('span', { className: 'header__brand-name', text: 'MiniGames' }),
      ],
    });
  }

  private renderActions(): HTMLElement {
    return createElement('div', {
      className: 'header__actions',
      children: [this.renderNav(), this.renderButtons(), this.burger],
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
    const login = createElement('button', {
      className: 'button header__login',
      text: 'Log In',
      attributes: { type: 'button' },
    });

    const signup = createElement('button', {
      className: 'button button--primary header__signup',
      text: 'Sign Up',
      attributes: { type: 'button' },
    });

    login.addEventListener('click', () => {
      this.onAuthRequest(AuthMode.Login);
    });

    signup.addEventListener('click', () => {
      this.onAuthRequest(AuthMode.Register);
    });

    return createElement('div', {
      className: 'header__buttons',
      children: [login, signup],
    });
  }

  private buildBurger(): HTMLButtonElement {
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
