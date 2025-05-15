import { DateDisplayProps } from '../../types/props/DateDisplayProps'
import { getDisplayedDates } from '../../utils/dateUtils'

import './DateDisplay.css'

export default function DateDisplay({start, end, allDay}: DateDisplayProps) {
	const displayedDates = getDisplayedDates({ start, end, allDay })

	return(
		<div className='date-display-wrapper'>
			{displayedDates}
		</div>
	)
}