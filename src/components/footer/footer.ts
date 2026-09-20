import { AppRoute } from '@/types/routes';
import { createElement } from '@/utils/dom';

import './footer.scss';
import { assetUrl } from '@/utils/asset';

const GITHUB_USER = 'Gleb-Cherepnin';
const GITHUB_URL = `https://github.com/${GITHUB_USER}`;
const RS_SCHOOL_URL = 'https://rs.school/courses/short-track';

const ABOUT =
  'Take a short break and have fun. Hundreds of curated casual mini-games right in your web browser. No download required.';

const EXPLORE_LINKS = ['Home', 'Library', 'Categories', 'Tournaments'];
const COMPANY_LINKS = ['About Us', 'Contact', 'Privacy Policy', 'Terms of Service'];
const SOCIALS = [
  { icon: 'share', label: 'Share' },
  { icon: 'chat', label: 'Chat' },
  { icon: 'rss', label: 'RSS feed' },
];

export class Footer {
  public render(): HTMLElement {
    return createElement('footer', {
      className: 'footer',
      children: [this.renderTop(), this.renderBottom()],
    });
  }

  private renderTop(): HTMLElement {
    return createElement('div', {
      className: 'footer__top',
      children: [this.renderBrandBlock(), this.renderColumns()],
    });
  }

  private renderBrandBlock(): HTMLElement {
    const brand = createElement('a', {
      className: 'footer__brand',
      attributes: { href: AppRoute.Home },
      children: [
        createElement('img', {
          className: 'footer__logo',
          attributes: {
            src: assetUrl('/assets/icons/logo.svg'),
            alt: '',
            width: '32',
            height: '32',
          },
        }),
        createElement('span', { className: 'footer__brand-name', text: 'MiniGames' }),
      ],
    });

    return createElement('div', {
      className: 'footer__brand-block',
      children: [brand, createElement('p', { className: 'footer__about', text: ABOUT })],
    });
  }

  private renderColumns(): HTMLElement {
    return createElement('div', {
      className: 'footer__columns',
      children: [
        this.renderLinkColumn('Explore', EXPLORE_LINKS),
        this.renderLinkColumn('Company', COMPANY_LINKS),
        this.renderCommunity(),
      ],
    });
  }

  private renderLinkColumn(title: string, labels: string[]): HTMLElement {
    const items = labels.map((label) =>
      createElement('li', {
        children: [
          createElement('a', {
            className: 'footer__link',
            text: label,
            attributes: { href: AppRoute.Home },
          }),
        ],
      }),
    );

    return createElement('nav', {
      className: 'footer__column',
      attributes: { 'aria-label': title },
      children: [
        createElement('h3', { className: 'footer__column-title', text: title }),
        createElement('ul', { className: 'footer__column', children: items }),
      ],
    });
  }

  private renderCommunity(): HTMLElement {
    const socials = SOCIALS.map((social) => {
      const icon = createElement('img', {
        attributes: {
          src: assetUrl(`/assets/icons/${social.icon}.svg`),
          alt: '',
          width: '20',
          height: '20',
        },
      });

      const link = createElement('a', {
        className: 'footer__social',
        attributes: { href: AppRoute.Home, 'aria-label': social.label },
        children: [icon],
      });

      return createElement('li', { children: [link] });
    });

    return createElement('div', {
      className: 'footer__column',
      children: [
        createElement('h3', { className: 'footer__column-title', text: 'Community' }),
        createElement('ul', { className: 'footer__socials', children: socials }),
      ],
    });
  }

  private renderBottom(): HTMLElement {
    const meta = createElement('div', {
      className: 'footer__meta',
      children: [this.renderRsLink(), this.renderGithubLink()],
    });

    const row = createElement('div', {
      className: 'footer__bottom-row',
      children: [
        createElement('p', {
          className: 'footer__copyright',
          text: '© 2026 MiniGames. All rights reserved.',
        }),
        meta,
        createElement('p', { className: 'footer__designed', text: 'Designed with love' }),
      ],
    });

    return createElement('div', {
      className: 'footer__bottom',
      children: [createElement('hr', { className: 'footer__divider' }), row],
    });
  }

  private renderRsLink(): HTMLElement {
    return createElement('a', {
      className: 'footer__credit',
      attributes: { href: RS_SCHOOL_URL, target: '_blank', rel: 'noopener noreferrer' },
      children: [
        createElement('span', {
          className: 'footer__badge footer__badge--rs',
          text: 'RS',
          attributes: { 'aria-hidden': 'true' },
        }),
        createElement('span', { text: 'RS School' }),
      ],
    });
  }

  private renderGithubLink(): HTMLElement {
    const icon = createElement('img', {
      attributes: { src: assetUrl('/assets/icons/code.svg'), alt: '', width: '16', height: '16' },
    });

    const badge = createElement('span', {
      className: 'footer__badge footer__badge--github',
      attributes: { 'aria-hidden': 'true' },
      children: [icon],
    });

    return createElement('a', {
      className: 'footer__credit',
      attributes: { href: GITHUB_URL, target: '_blank', rel: 'noopener noreferrer' },
      children: [badge, createElement('span', { text: `@${GITHUB_USER}` })],
    });
  }
}
