
export interface TypeOfShow {
    id: number;
    name: string;
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
  
  interface DataSkeletonProps {
    id: number;
  }[]
  
  
  export interface RenderItemPopularShowsProps {
    item: ShowProps | DataSkeletonProps;
    handleRenderItem: () => void;
    renderSkeleton: boolean;
  }
  
  export interface RenderItemGenresProps {
    item: GenreProps | DataSkeletonProps; 
    renderSkeleton: boolean;
    getMoviesByGenreId: (item: TypeOfShow, TypeOfShow: 'MOVIE' | 'TV_SERIES') => void;
    selectedGenre: GenreProps | null;
    selectedTypeOfShow: TypeOfShow;
  }
  
  
  export interface GenreProps {
    id: number;
    name: string;
  }