import { useState } from 'react'
import { Button, ButtonGroup, Form, Stack } from 'react-bootstrap'
import { Frequency, RRule } from 'rrule'
import './RRPicker.css'

function RRPicker({ start, onSave: onSave, onAbort: onCancel } : { 
		start: Date, 
		onSave: ( freq: Frequency, until: Date | undefined) => void 
	  onAbort: () => void 
	}) {

	const frequency: Frequency[] = [Frequency.DAILY, Frequency.WEEKLY, Frequency.MONTHLY, Frequency.YEARLY]
	const [freq, setFreq] = useState(Frequency.WEEKLY)
	const [until, setUntil] = useState<Date | undefined>(undefined)

	return(
		<Stack gap={2} className='rr-picker'>

			<ButtonGroup aria-label='First group'>
				{ frequency.map((btn) => (

					<Button 
						key={btn}
						className={ `btn-group-btn ${ freq === btn ? 'active' : '' }` } 
						variant='secondary'
						onClick={ () => setFreq(btn) }
					>
					{ RRule.FREQUENCIES[btn] }
					</Button>

				))}
			</ButtonGroup>

			<Form.Control 
					type='date'
					onChange={ (e) => {
						const value = new Date(e.target.value)
						if(value > start) {
							setUntil(value)
						}
					}}
				/>

			<Stack gap={2} className="w-100 mx-auto">

				<Button
					variant='secondary'
					disabled={ until === null } 
					onClick={ () => onSave(freq, until) }>
						Save
				</Button>

				<Button
					variant='outline-secondary'
					onClick={() => onCancel()}>
						Cancel
				</Button>

			</Stack>

		</Stack>
	)
}

export default RRPicker