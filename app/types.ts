export type Movie = {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string;
  vote_average: number;
};

export type Video = {
  site: string;
  type: string;
  key: string;
};
