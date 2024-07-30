import { GenreProps } from "../../types";

export interface RenderItemHorizontalProps {
  id: number
}

export interface RenderItemHorizontalList {
  item: GenreProps; 
  renderSkeleton?: boolean;
  handleRenderItem: (genre: GenreProps) => void;
  selectedOption: GenreProps | null;
}

export interface ContainerOptionsProps {
  selectedOption: boolean;
}