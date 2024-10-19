export interface CastMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface ProviderProps {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export interface WatchOptions {
  link: string;
  rent: ProviderProps[];
  buy: ProviderProps[];
  flatrate: ProviderProps[];
}

export interface MediaHubTrailerProps {
  iso_639_1: string;    
  iso_3166_1: string;  
  name: string;         
  key: string;         
  site: string;       
  size: number;       
  type: string;      
  official: boolean;   
  published_at: string;
  id: string;        
}

export interface MediaHubImagesProps {
  aspect_ratio: number;   
  height: number;        
  iso_639_1: string | null; 
  file_path: string;     
  vote_average: number;
  vote_count: number;    
  width: number;       
}

export interface MediaHubProps {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget?: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage?: string;
  id: number;
  imdb_id?: string;
  origin_country: string[];
  original_language: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path?: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date?: string;
  revenue?: number;
  runtime?: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline?: string;
  title?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  created_by?: {
    id: number;
    credit_id: string;
    name: string;
    original_name: string;
    gender: number;
    profile_path?: string;
  }[];
  episode_run_time?: number[];
  first_air_date?: string;
  in_production?: boolean;
  last_air_date?: string;
  last_episode_to_air?: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path?: string;
  };
  next_episode_to_air?: any;
  networks?: {
    id: number;
    logo_path?: string;
    name: string;
    origin_country: string;
  }[];
  number_of_episodes?: number;
  number_of_seasons?: number;
  seasons?: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path?: string;
    season_number: number;
    vote_average: number;
  }[];
  type?: string;
}
