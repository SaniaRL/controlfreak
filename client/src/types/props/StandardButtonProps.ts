import { ButtonProps } from './ButtonProps'

export interface StandardButtonProps {
    key?: React.Key
    id?: string | number
    buttonProps: ButtonProps
    onClick?: () => void    
    onMouseEnter?: () => void    
    onMouseLeave?: () => void    
}