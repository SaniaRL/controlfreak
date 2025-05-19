import { useEffect, useState } from 'react'
import { Button, ButtonGroup, Form, Stack } from 'react-bootstrap'
import { Frequency, RRule } from 'rrule'

import './RRPicker.css'

export default function RRPicker({ savedState, onSave, onDelete, onCancel } : { 
  savedState: string | undefined 
  onSave: (freq: Frequency, until: Date | null) => void
  onDelete: () => void
  onCancel: () => void 
}) {

  const [freq, setFreq] = useState(Frequency.WEEKLY)
  const [until, setUntil] = useState<Date | null>(null)

  useEffect(() => {
    if(savedState) {
      try {
        const rrule: RRule = RRule.fromString(savedState)
        setFreq(rrule.options.freq)
        setUntil(rrule.options.until)
      } catch {
        console.log('rrule problems yo')
      }
    }
  }, [savedState])

  function setFrequency(input: Frequency) {
    setFreq(input)
  }

  function setUntilValue(input: Date | null) {
    setUntil(input)
		console.log(input)
  }

  function save() {
    onSave(freq, until)
		console.log(freq)
 		console.log(freq)
  }

  return(
    <Stack gap={2} className='rr-picker'>

      <ButtonGroup aria-label='First group'>
        { [Frequency.DAILY, Frequency.WEEKLY, Frequency.MONTHLY, Frequency.YEARLY].map((btn) => (
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
          const value = e.target.value ? new Date(e.target.value) : null
          setUntilValue(value)
        }}
      />

      <Stack gap={2} className="w-100 mx-auto">
        <Button
          variant='primary'
          onClick={ () => save() }>
            Save
        </Button> 

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