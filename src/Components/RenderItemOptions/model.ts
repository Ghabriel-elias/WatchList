export interface RenderItemHorizontalProps {
  id: number
}

export interface RenderItemHorizontalList {
  item: any; 
  renderSkeleton?: boolean;
  handleRenderItem: (item: any) => void;
  selectedOption: {id: number} | null;
}

export interface ContainerOptionsProps {
  selectedOption: boolean;
}