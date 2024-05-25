export interface ListOptionsProps {
  data: any; 
  estimatedItemSize: number;
  scrollEnabled?: boolean;
  extraData?: any
  handleRenderItem: (item: any) => void;
  selectedOption: any;
  renderSkeleton?: boolean;
  listRef?: any;
}