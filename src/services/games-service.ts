import type { Category, Game, LeaderboardEntry } from '@/types/game';

import categoriesData from './mock/categories.json';
import gamesData from './mock/games.json';
import leaderboardData from './mock/leaderboard.json';

export function getGames(): Game[] {
  return gamesData.data;
}

export function getFeaturedGames(): Game[] {
  return gamesData.data.filter((game) => game.featured);
}

export function getCategories(): Category[] {
  return categoriesData.data;
}

export function getLeaderboard(): LeaderboardEntry[] {
  return leaderboardData.data;
}
