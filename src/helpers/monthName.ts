export function getCurrentMonthName(): string {
  return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date());
}
