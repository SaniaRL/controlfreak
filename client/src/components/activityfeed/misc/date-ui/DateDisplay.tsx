import { DateDisplayProps } from '../../../../types/props/DateDisplayProps'


export default function DateDisplay({start, end, allDay}: DateDisplayProps) {

	console.log("Typ av start:", typeof start)
  console.log("Typ av end:", typeof end)

	const displayDateOnly = (date: Date) => {
		return date.toLocaleDateString('sv-SE')
	}

	const showMinutes = (date: Date) => {
		return date && date.getMinutes() !== 0
	}

	const displayHoursOnly = (date: Date) => {
		return date.toLocaleTimeString("sv-SE", { hour: '2-digit'})
	}

	const displayHoursAndMinutes = (date: Date) => {
		return date.toLocaleTimeString("sv-SE", { hour: '2-digit', minute: '2-digit'})
	}



	const displayTimesTogether = (start: Date, end: Date) => {
		const min = showMinutes(start) && showMinutes(end)
		return min 
			? `${displayHoursAndMinutes(start)} - ${displayHoursAndMinutes(end)}`
			: `${displayHoursOnly(start)} - ${displayHoursOnly(end)}`
	}


	//TODO: städa här

	const formattedDates = (() => {
			
		if(allDay) {
			return displayDateOnly(start)
		} 
		
		if(end) {
			const sameDate = start.getDate === end?.getDate

			if(sameDate) {
				return `${displayTimesTogether(start, end)} ${displayDateOnly(start)}`
			} else {
				const showMin = showMinutes(start) && showMinutes(end)
				return showMin
					? `${displayHoursAndMinutes(start)} ${displayDateOnly(start)} 
						- ${displayHoursAndMinutes(end)} ${displayDateOnly(end)}`
					: `${displayHoursOnly(start)} ${displayDateOnly(start)} 
						- ${displayHoursOnly(end)} ${displayDateOnly(end)}`
			}
		}
	})()


	
	return(
		<div>
			{formattedDates}
		</div>
	)
}