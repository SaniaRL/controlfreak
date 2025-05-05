import { useEffect, useState } from 'react'
import { Button, ButtonGroup, Form, Stack } from 'react-bootstrap'
import { Frequency, RRule } from 'rrule'
import './RRPicker.css'

function RRPicker({ /*start,*/ prevState, onSave, onDelete, onCancel } : { 
		// start: Date | undefined, 
		prevState: string | undefined 
		onSave: ( freq: Frequency, until: Date | undefined) => void
		onDelete: () => void
	  onCancel: () => void 
	}) {

	const [stateChanged, setStateChanged] = useState(false)
	const frequency: Frequency[] = [Frequency.DAILY, Frequency.WEEKLY, Frequency.MONTHLY, Frequency.YEARLY]
	const [freq, setFreq] = useState(Frequency.WEEKLY)
	const [until, setUntil] = useState<Date | undefined>(undefined)

	useEffect(() => {
		if(prevState) {
			try {
				const rrule: RRule = RRule.fromString(prevState)
				//freq är obligatorisk och buttongroup så jag iffar inte ens nu
				setFreq(rrule.options.freq)
				if(rrule.options.until) {
					setUntil(rrule.options.until)
				}
			} catch (e: any) {
				console.log('rrpicker prevstate error')
			}
		}
	})

	function setFrequency(frequency: Frequency) {
		setFreq(frequency)

		let changed = false

		if (prevState) {
			const prevRRule = RRule.fromString(prevState)
			if(prevRRule.options.freq !== frequency || prevRRule.options.until !== until) {
				changed = true
			}
		} else {
			changed = true
		}

		setStateChanged(changed) 
	}

	function setUntilValue(newUntil: Date | undefined) {
		setUntil(newUntil)
		
		let changed = false

		if (prevState) {
			const prevRRule = RRule.fromString(prevState)
			if(prevRRule.options.freq !== freq || prevRRule.options.until !== newUntil) {
				changed = true
			}
		} else {
			changed = true
		}

		setStateChanged(changed) 
	}

	return(
		<Stack gap={2} className='rr-picker'>

			<ButtonGroup aria-label='First group'>
				{ frequency.map((btn) => (

					<Button 
						key={btn}
						className={ `btn-group-btn ${ freq === btn ? 'active' : '' }` } 
						variant='secondary'
						onClick={ () => setFrequency(btn) }
					>
					{ RRule.FREQUENCIES[btn] }
					</Button>

				))}
			</ButtonGroup>

			<Form.Control 
					type='date'
					onChange={ (e) => {
						const value = new Date(e.target.value)
						// if(value > start) {
						setUntilValue(value)
						// }
						//varning om det inte är efter ?? ok med efter ?? använder vi start
					}}
				/>

			<Stack gap={2} className="w-100 mx-auto">

				{stateChanged &&
				<Button
					variant='secondary'
					disabled={ until === null } 
					onClick={ () => onSave(freq, until) }>
						Save
				</Button> 
				} 

				{prevState &&
				<Button
				variant='secondary'
				disabled={ until === null } 
				onClick={ () => onSave(freq, until) }>
					Delete
				</Button>
				}

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