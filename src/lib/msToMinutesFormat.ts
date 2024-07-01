export default function msToMinutesFormat(timems: number): string {
  const minutes = Math.floor(timems / 1000 / 60);
  const seconds = Math.floor((timems / 1000) % 60);
  return `${minutes}:${seconds} min`;
}
