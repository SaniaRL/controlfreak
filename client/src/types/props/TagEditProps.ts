export interface TagEditProps {
  onEdit: (prevState: string, newState: string) => void
  onDelete: (tag: string) => void 
}