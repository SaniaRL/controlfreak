import { DateDisplayProps } from './DateDisplayProps'

export interface DatePickerProps extends DateDisplayProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}