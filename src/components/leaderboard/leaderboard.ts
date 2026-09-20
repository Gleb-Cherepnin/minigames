import { getLeaderboard } from '@/services/games-service';
import type { LeaderboardEntry } from '@/types/game';
import { createElement } from '@/utils/dom';
import { formatCount } from '@/utils/format';

import './leaderboard.scss';

const AVATAR_VARIANTS = 5;
const VISIBLE_ON_NARROW = 3;

export class Leaderboard {
  public render(): HTMLElement {
    return createElement('section', {
      className: 'leaderboard',
      attributes: { 'aria-labelledby': 'leaderboard-title' },
      children: [this.renderHeading(), this.renderTable()],
    });
  }

  private renderHeading(): HTMLElement {
    const title = createElement('h2', {
      className: 'leaderboard__title',
      attributes: { id: 'leaderboard-title' },
      children: [
        createElement('span', { text: 'Top Players' }),
        createElement('span', { className: 'leaderboard__long', text: ' This Week' }),
      ],
    });

    return createElement('div', {
      className: 'leaderboard__heading',
      children: [
        createElement('span', {
          className: 'leaderboard__accent',
          attributes: { 'aria-hidden': 'true' },
        }),
        title,
      ],
    });
  }

  private renderTable(): HTMLElement {
    const rows = getLeaderboard().map((entry, index) => this.renderRow(entry, index));

    return createElement('table', {
      className: 'leaderboard__table',
      children: [
        createElement('thead', { children: [this.renderHeadRow()] }),
        createElement('tbody', { children: rows }),
      ],
    });
  }

  private renderHeadRow(): HTMLElement {
    return createElement('tr', {
      className: 'leaderboard__head-row',
      children: [
        this.renderTh('Rank', 'leaderboard__th leaderboard__col--rank'),
        this.renderTh('Player', 'leaderboard__th leaderboard__col--player'),
        this.renderResponsiveTh('Games', 'Games Played', 'leaderboard__col--games'),
        this.renderResponsiveTh('Score', 'Total Score', ''),
        this.renderTh('Streak', 'leaderboard__th leaderboard__col--streak'),
        this.renderTh('Favorite Game', 'leaderboard__th leaderboard__col--favorite'),
      ],
    });
  }

  private renderTh(label: string, className: string): HTMLElement {
    return createElement('th', {
      className,
      text: label,
      attributes: { scope: 'col' },
    });
  }

  private renderResponsiveTh(short: string, long: string, extraClass: string): HTMLElement {
    return createElement('th', {
      className: `leaderboard__th ${extraClass}`.trim(),
      attributes: { scope: 'col' },
      children: [
        createElement('span', { className: 'leaderboard__col-short', text: short }),
        createElement('span', { className: 'leaderboard__col-long', text: long }),
      ],
    });
  }

  private renderRow(entry: LeaderboardEntry, index: number): HTMLElement {
    const isExtra = index >= VISIBLE_ON_NARROW;
    const baseRankClass = 'leaderboard__td leaderboard__col--rank leaderboard__td--rank';
    const rankClass =
      entry.rank === 1 ? `${baseRankClass} leaderboard__td--rank-first` : baseRankClass;

    return createElement('tr', {
      className: isExtra ? 'leaderboard__row leaderboard__row--extra' : 'leaderboard__row',
      children: [
        createElement('td', { className: rankClass, text: `#${String(entry.rank)}` }),
        this.renderPlayerCell(entry, index),
        createElement('td', {
          className: 'leaderboard__td leaderboard__games leaderboard__col--games',
          text: String(entry.gamesPlayed),
        }),
        this.renderScoreCell(entry.totalScore),
        this.renderStreakCell(entry.streakDays),
        createElement('td', {
          className: 'leaderboard__td leaderboard__col--favorite',
          children: [
            createElement('span', { className: 'leaderboard__chip', text: entry.favoriteGameName }),
          ],
        }),
      ],
    });
  }

  private renderPlayerCell(entry: LeaderboardEntry, index: number): HTMLElement {
    const variant = (index % AVATAR_VARIANTS) + 1;
    const avatar = createElement('span', {
      className: `leaderboard__avatar leaderboard__avatar--${String(variant)}`,
      text: getInitials(entry.playerName),
      attributes: { 'aria-hidden': 'true' },
    });

    const inner = createElement('div', {
      className: 'leaderboard__player-inner',
      children: [
        avatar,
        createElement('span', { className: 'leaderboard__name', text: entry.playerName }),
      ],
    });

    return createElement('td', {
      className: 'leaderboard__td leaderboard__td--player leaderboard__col--player',
      children: [inner],
    });
  }

  private renderScoreCell(score: number): HTMLElement {
    return createElement('td', {
      className: 'leaderboard__td',
      children: [
        createElement('span', { className: 'leaderboard__short', text: formatCount(score) }),
        createElement('span', {
          className: 'leaderboard__long',
          text: score.toLocaleString('en-US'),
        }),
      ],
    });
  }

  private renderStreakCell(days: number): HTMLElement {
    return createElement('td', {
      className: 'leaderboard__td leaderboard__col--streak',
      children: [
        createElement('span', { text: `🔥 ${String(days)}` }),
        createElement('span', { className: 'leaderboard__streak-unit-short', text: 'd' }),
        createElement('span', { className: 'leaderboard__streak-unit-long', text: ' days' }),
      ],
    });
  }
}

function getInitials(name: string): string {
  const capitals = name.match(/[A-Z]/g) ?? [];

  return capitals.length >= 2
    ? `${capitals[0] ?? ''}${capitals[1] ?? ''}`
    : name.slice(0, 2).toUpperCase();
}
