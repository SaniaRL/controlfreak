import { ButtonProps } from './ButtonProps'

export interface StandardButtonProps {
    key?: React.Key
    id?: string | number
    buttonProps: ButtonProps
    onClick: (id?: number | string) => void    
    onMouseEnter?: () => void    
    onMouseLeave?: () => void    
}