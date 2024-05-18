
export interface TypeOfShow {
  id: number;
  name: string;
}

export interface HeaderHomeProps {
  handleRenderItem: (item: TypeOfShow) => Promise<void>;
  selectedShow: TypeOfShow;
  listOfShows: TypeOfShow[];
}