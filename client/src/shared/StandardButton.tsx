import Button from 'react-bootstrap/Button'
import { StandardButtonProps } from '../types/props/StandardButtonProps'

export default function StandardButton({ props }
	: { props: StandardButtonProps }) {

	return(
		<Button 
		className={`standard-button ${props.buttonProps.className}`}
		variant={props.buttonProps.variant}
		onClick={() => props.onClick()}
		onMouseEnter={props.onMouseEnter}
		onMouseLeave={props.onMouseLeave}>
			{ typeof props.buttonProps.content === 'string'
			? props.buttonProps.content
			: <img src={props.buttonProps.content.src} alt={props.buttonProps.content.alt} /> 
			}
		</Button>
	)
}