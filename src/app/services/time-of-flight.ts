export function timeOfFlight(startDate: string, arrDate: string) {
  const diff = new Date(arrDate).getTime() - new Date(startDate).getTime();
  const h = Math.floor(diff / 1000 / 3600);
  const min = Math.floor((diff - h * 1000 * 3600) / 60 / 1000);
  return `${h}h ${min}m`;
}
