export interface Repository {
  title: string;
  description: string | null;
  url: string;
  language: string | null;
  starsCount: number;
  forksCount: number;
  watchersCount: number;
}
