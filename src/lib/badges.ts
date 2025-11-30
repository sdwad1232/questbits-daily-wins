import { Badge } from '@/types';

export const BADGES: Badge[] = [
  {
    id: 'bronze',
    name: 'Bronze Bit',
    description: 'Earn 50 points',
    pointsRequired: 50,
    icon: '🥉'
  },
  {
    id: 'silver',
    name: 'Silver Bit',
    description: 'Earn 150 points',
    pointsRequired: 150,
    icon: '🥈'
  },
  {
    id: 'gold',
    name: 'Gold Bit',
    description: 'Earn 300 points',
    pointsRequired: 300,
    icon: '🥇'
  }
];

export function getEarnedBadges(points: number): Badge[] {
  return BADGES.filter(badge => points >= badge.pointsRequired);
}

export function getLockedBadges(points: number): Badge[] {
  return BADGES.filter(badge => points < badge.pointsRequired);
}
