import { GameCard } from '@/components/game-card/game-card';
import { getFeaturedGames } from '@/services/games-service';
import { createElement } from '@/utils/dom';

import './carousel.scss';

const SLOT_CLASSES = [
  'carousel__item',
  'carousel__item carousel__item--side',
  'carousel__item carousel__item--featured',
  'carousel__item carousel__item--side',
  'carousel__item',
];

export class Carousel {
  public render(): HTMLElement {
    return createElement('section', {
      className: 'carousel',
      attributes: { 'aria-labelledby': 'carousel-title' },
      children: [this.renderHead(), this.renderTrack()],
    });
  }

  private renderHead(): HTMLElement {
    const heading = createElement('div', {
      className: 'carousel__heading',
      children: [
        createElement('span', {
          className: 'carousel__accent',
          attributes: { 'aria-hidden': 'true' },
        }),
        createElement('h2', {
          className: 'carousel__title',
          text: 'New Games',
          attributes: { id: 'carousel-title' },
        }),
      ],
    });

    return createElement('div', {
      className: 'carousel__head',
      children: [heading, this.renderArrows()],
    });
  }

  private renderArrows(): HTMLElement {
    return createElement('div', {
      className: 'carousel__arrows',
      children: [
        this.renderArrow('back', 'Previous games'),
        this.renderArrow('forward', 'Next games'),
      ],
    });
  }

  private renderArrow(direction: 'back' | 'forward', label: string): HTMLElement {
    return createElement('button', {
      className:
        direction === 'forward' ? 'carousel__arrow carousel__arrow--next' : 'carousel__arrow',
      attributes: { type: 'button', 'aria-label': label },
      children: [
        createElement('img', {
          attributes: {
            src: `/assets/icons/arrow-${direction}.svg`,
            alt: '',
            width: '24',
            height: '24',
          },
        }),
      ],
    });
  }

  private renderTrack(): HTMLElement {
    const games = getFeaturedGames().slice(0, SLOT_CLASSES.length);

    const items = games.map((game, index) =>
      createElement('li', {
        className: SLOT_CLASSES[index] ?? 'carousel__item',
        children: [new GameCard(game).render()],
      }),
    );

    return createElement('ul', { className: 'carousel__track', children: items });
  }
}
