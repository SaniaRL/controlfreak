import { Button, ButtonGroup, Form, Stack } from 'react-bootstrap'
import './RRPicker.css'
import { useState } from 'react'
import { Frequency, RRule } from 'rrule'

function RRPicker({ start, onCreateRRule, onAbort } : { 
		start: Date, 
		onCreateRRule: ( freq: Frequency, until: Date | undefined) => void 
	  onAbort: () => void }) {
	const frequency: Frequency[] = [Frequency.DAILY, Frequency.WEEKLY, Frequency.MONTHLY, Frequency.YEARLY]
	const [freq, setFreq] = useState(Frequency.WEEKLY)
	const [until, setUntil] = useState<Date | undefined>(undefined)

	return(
		<Stack gap={2} className='rr-picker'>
			<ButtonGroup className="bubbub" aria-label='First group'>
				{frequency.map((btn) => (
					<Button 
						key={btn}
						className={`btn-group-btn ${freq === btn ? 'active' : ''}`} 
						variant='secondary'
						onClick={() => setFreq(btn)}
					>
					{RRule.FREQUENCIES[btn]}
					</Button>
				))}
			</ButtonGroup>

			<Form.Control 
					type='date'
					onChange={(e) => {
						const value = new Date(e.target.value)
						if(value > start){
							setUntil(value)
						}
					}}
				/>

			<Stack gap={2} className="w-100 mx-auto">
				<Button
					variant='secondary'
					disabled={until === null} 
					onClick={() => onCreateRRule(freq, until)}>
						Save changes
				</Button>
				<Button
					variant='outline-secondary'
					// disabled={until === undefined} 
					// Sätt att det nollställs nånstans
					onClick={() => onAbort()}
					//Radera med skapa en tom eller ännu en funktion?
				>
					Cancel
				</Button>
			</Stack>
		</Stack>
	)
}

export default RRPicker