import { createElement } from '@/utils/dom';

import '@/components/button/button.scss';
import './developer-cta.scss';
import { assetUrl } from '@/utils/asset';

const TEXT =
  "Want to see your game on MiniGames? We're always looking for fun,\nengaging mini games to add to our platform. Submit your game\nand reach thousands of players!";

export class DeveloperCta {
  public render(): HTMLElement {
    return createElement('section', {
      className: 'developer-cta',
      attributes: { 'aria-labelledby': 'developer-cta-title' },
      children: [
        createElement('img', {
          className: 'developer-cta__illustration',
          attributes: {
            src: assetUrl('/assets/images/cta-illustration.jpg'),
            alt: 'Developer workplace with a computer and a game controller',
            loading: 'lazy',
          },
        }),
        this.renderCard(),
      ],
    });
  }

  private renderCard(): HTMLElement {
    return createElement('div', {
      className: 'developer-cta__card',
      children: [
        createElement('h2', {
          className: 'developer-cta__title',
          text: 'Are You a Game Developer?',
          attributes: { id: 'developer-cta-title' },
        }),
        createElement('p', { className: 'developer-cta__text', text: TEXT }),
        this.renderButton(),
        createElement('p', {
          className: 'developer-cta__contact',
          text: 'or contact us at developers@minigames.com',
        }),
      ],
    });
  }

  private renderButton(): HTMLElement {
    return createElement('button', {
      className: 'button button--primary developer-cta__button',
      attributes: { type: 'button' },
      children: [
        createElement('img', {
          className: 'developer-cta__button-icon',
          attributes: {
            src: assetUrl('/assets/icons/upload.svg'),
            alt: '',
            width: '24',
            height: '24',
          },
        }),
        createElement('span', { text: 'Submit Form' }),
      ],
    });
  }
}
