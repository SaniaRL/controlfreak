export interface RRule {
    freq: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
    until?: string;
    dtstart: string;
}
  