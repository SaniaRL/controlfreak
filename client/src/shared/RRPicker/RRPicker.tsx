import { useEffect, useState } from 'react'
import { Button, ButtonGroup, Form, Stack } from 'react-bootstrap'
import { Frequency, RRule } from 'rrule'
import './RRPicker.css'

function RRPicker({ savedState, onSave, onDelete, onCancel } : { 
		savedState: string | undefined 
		onSave: ( freq: Frequency, until: Date | null) => void
		onDelete: () => void
	  onCancel: () => void 
	}) {

	const [stateChanged, setStateChanged] = useState(false)
	const frequency: Frequency[] = [Frequency.DAILY, Frequency.WEEKLY, Frequency.MONTHLY, Frequency.YEARLY]
	const [freq, setFreq] = useState(Frequency.WEEKLY)
	const [until, setUntil] = useState<Date | null>(null)
	const [initFreq, setInitFreq] = useState<Frequency | undefined>(undefined)
	const [initUntil, setInitUntil] = useState<Date | null>(null)

	//Ändra så den lyssnar på usestate uppifrån?

	useEffect(() => {
		if(savedState) {
			try {
				const rrule: RRule = RRule.fromString(savedState)
				setInitFreq(rrule.options.freq)
				setFreq(rrule.options.freq)
				setInitUntil(rrule.options.until)
				setUntil(rrule.options.until)
			} catch (e: any) {
				console.log('rrpicker prevstate error')
			}
		} else {
			setStateChanged(true)
		}
	}, [savedState])

	function setFrequency(input: Frequency) {
		setFreq(input)
		const hasChanged = input !== initFreq
		changeState(hasChanged)
	}

	function setUntilValue(input: Date | null) {
		setUntil(input)
		const condition = input !== initUntil
		changeState(condition)	
	}

	function changeState(condition: boolean) {
		const changed = savedState
		? condition
		: true		

		setStateChanged(changed) 
	}

	function save() {
		setInitFreq(freq)
		setInitUntil(until)
		onSave(freq, until)
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
				value={until ? until.toISOString().split('T')[0] : ''}
				onChange={ (e) => {
					const value = new Date(e.target.value)
					setUntilValue(value)
					//varning om det inte är efter ?? ok med efter ?? använder vi start
				}}
			/>

			<Stack gap={2} className="w-100 mx-auto">

				{stateChanged &&
				<Button
					variant='primary'
					onClick={ () => save() }>
						Save
				</Button> 
				} 

				{savedState &&
				<Button
				variant='danger'
				onClick={ () => onDelete() }>
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