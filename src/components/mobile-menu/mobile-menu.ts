import { AppRoute } from '@/types/routes';
import { createElement } from '@/utils/dom';

import '@/components/button/button.scss';
import './mobile-menu.scss';

const MENU_LINKS = ['Home', 'Library', 'Tournaments', 'Community'] as const;

export class MobileMenu {
  private readonly element: HTMLElement;

  private isOpen = false;

  constructor(private readonly onClose: () => void) {
    this.element = this.build();
    document.addEventListener('keydown', this.handleKeydown);
  }

  public render(): HTMLElement {
    return this.element;
  }

  public open(): void {
    this.isOpen = true;
    this.element.classList.add('mobile-menu--open');
    this.element.removeAttribute('inert');
  }

  public close(): void {
    this.isOpen = false;
    this.element.classList.remove('mobile-menu--open');
    this.element.setAttribute('inert', '');
    this.onClose();
  }

  public destroy(): void {
    document.removeEventListener('keydown', this.handleKeydown);
    this.element.remove();
  }

  private readonly handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.isOpen) {
      this.close();
    }
  };

  private build(): HTMLElement {
    const menu = createElement('div', {
      className: 'mobile-menu',
      attributes: { inert: '' },
      children: [this.buildTop(), this.buildNav(), this.buildActions()],
    });

    return menu;
  }

  private buildTop(): HTMLElement {
    const closeButton = createElement('button', {
      className: 'mobile-menu__close',
      attributes: { type: 'button', 'aria-label': 'Close menu' },
      children: [
        createElement('img', {
          attributes: { src: '/assets/icons/close.svg', alt: '', width: '20', height: '20' },
        }),
      ],
    });

    closeButton.addEventListener('click', () => {
      this.close();
    });

    const brand = createElement('div', {
      className: 'mobile-menu__brand',
      children: [
        createElement('img', {
          className: 'mobile-menu__logo',
          attributes: { src: '/assets/icons/logo.png', alt: '', width: '32', height: '32' },
        }),
        createElement('span', { className: 'mobile-menu__brand-name', text: 'MiniGames' }),
      ],
    });

    return createElement('div', {
      className: 'mobile-menu__top',
      children: [brand, closeButton],
    });
  }

  private buildNav(): HTMLElement {
    const items = MENU_LINKS.map((label, index) => {
      const isActive = index === 0;
      const link = createElement('a', {
        className: isActive ? 'mobile-menu__link mobile-menu__link--active' : 'mobile-menu__link',
        text: label,
        attributes: isActive
          ? { href: AppRoute.Home, 'aria-current': 'page' }
          : { href: AppRoute.Home },
      });

      link.addEventListener('click', () => {
        this.close();
      });

      return createElement('li', { children: [link] });
    });

    return createElement('nav', {
      className: 'mobile-menu__nav',
      attributes: { 'aria-label': 'Mobile navigation' },
      children: [createElement('ul', { className: 'mobile-menu__list', children: items })],
    });
  }

  private buildActions(): HTMLElement {
    const login = createElement('button', {
      className: 'button mobile-menu__button mobile-menu__button--login',
      text: 'Log In',
      attributes: { type: 'button' },
    });

    const signup = createElement('button', {
      className: 'button button--primary mobile-menu__button',
      text: 'Sign Up',
      attributes: { type: 'button' },
    });

    for (const button of [login, signup]) {
      button.addEventListener('click', () => {
        this.close();
      });
    }

    return createElement('div', {
      className: 'mobile-menu__actions',
      children: [login, signup],
    });
  }
}
