import { DataSkeletonProps } from "../../Components/GlobalSkeletonComponent/model";

export interface TypeOfShow {
  id: number;
  name: string;
  label: 'movies' | 'series';
}

export interface HeaderHomeProps {
  handleRenderItem: (item: TypeOfShow) => Promise<void>;
  selectedShow: TypeOfShow;
  listOfShows: TypeOfShow[];
}

export interface ShowProps {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}


export interface RenderItemPopularShowsProps {
  item: ShowProps | DataSkeletonProps;
  handleRenderItem: (item: ShowProps) => void;
  renderSkeleton: boolean;
}

export interface RenderItemHorizontalList {
  item: GenreProps | DataSkeletonProps; 
  renderSkeleton: boolean;
  handleRenderItem: (item: TypeOfShow) => void;
  selectedOption: GenreProps | null;
}


export interface GenreProps {
  id: string;
  name: string;
  genre: string;
}