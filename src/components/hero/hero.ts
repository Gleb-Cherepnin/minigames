import { createElement } from '@/utils/dom';

import '@/components/button/button.scss';
import './hero.scss';
import { assetUrl } from '@/utils/asset';

const TITLE = 'Take a Short Break & Have Fun';
const TEXT_SHORT = 'Discover hundreds of curated casual mini-games right in your browser.';
const TEXT_FULL =
  'Discover hundreds of curated casual mini-games. Play instantly in your browser — puzzle, match 3, farm, and board classics.';

export class Hero {
  public render(): HTMLElement {
    return createElement('section', {
      className: 'hero',
      attributes: { 'aria-labelledby': 'hero-title' },
      children: [
        createElement('img', {
          className: 'hero__background',
          attributes: { src: assetUrl('/assets/images/hero.jpg'), alt: '', 'aria-hidden': 'true' },
        }),
        this.renderBox(),
      ],
    });
  }

  private renderBox(): HTMLElement {
    return createElement('div', {
      className: 'hero__box',
      children: [
        createElement('h1', {
          className: 'hero__title',
          text: TITLE,
          attributes: { id: 'hero-title' },
        }),
        createElement('p', { className: 'hero__text hero__text--short', text: TEXT_SHORT }),
        createElement('p', { className: 'hero__text hero__text--full', text: TEXT_FULL }),
        createElement('button', {
          className: 'button button--primary hero__button',
          text: 'Browse Library',
          attributes: { type: 'button' },
        }),
      ],
    });
  }
}
