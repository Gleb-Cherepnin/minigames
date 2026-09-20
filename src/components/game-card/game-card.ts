import type { Game } from '@/types/game';
import { createElement } from '@/utils/dom';
import { formatCount, formatRating } from '@/utils/format';

import './game-card.scss';
import { assetUrl } from '@/utils/asset';

export class GameCard {
  constructor(private readonly game: Game) {}

  public render(): HTMLElement {
    return createElement('article', {
      className: 'game-card',
      children: [
        createElement('img', {
          className: 'game-card__image',
          attributes: {
            src: assetUrl(this.game.cardImage),
            alt: this.game.name,
            loading: 'lazy',
          },
        }),
        this.renderOverlay(),
      ],
    });
  }

  private renderOverlay(): HTMLElement {
    const rating = formatRating(this.game.rating);
    const likes = formatCount(this.game.likesCount);

    const meta = createElement('div', {
      className: 'game-card__meta',
      children: [
        this.renderStat(assetUrl('/assets/icons/star.svg'), rating, 'Rating'),
        this.renderStat(assetUrl('/assets/icons/heart.svg'), likes, 'Likes'),
      ],
    });

    return createElement('div', {
      className: 'game-card__overlay',
      children: [
        createElement('h3', { className: 'game-card__title', text: this.game.name }),
        meta,
      ],
    });
  }

  private renderStat(icon: string, value: string, label: string): HTMLElement {
    return createElement('p', {
      className: 'game-card__stat',
      children: [
        createElement('img', {
          attributes: { src: icon, alt: label, width: '20', height: '20' },
        }),
        createElement('span', { text: value }),
      ],
    });
  }
}
