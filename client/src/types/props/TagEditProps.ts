export interface TagEditProps {
  onEdit: (newState: string, prevState?: string) => void
  onDelete: (tag: string) => void 
}