export interface ListOptionsProps {
  data: any; 
  estimatedItemSize: number;
  scrollEnabled?: boolean;
  extraData?: any
  handleRenderItem: (genre: string) => void;
  selectedOption: any;
  renderSkeleton?: boolean;
  listRef?: any;
}