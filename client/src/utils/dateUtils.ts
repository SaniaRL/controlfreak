import { DateDisplayProps } from '../types/props/DateDisplayProps'

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

export const getDisplayedDates = ({start, end, allDay}: DateDisplayProps): string  => {
 const startDate = typeof start === 'string' ? new Date(start) : start;
  const endDate = end && typeof end === 'string' ? new Date(end) : end;
  
  if (allDay) {
    return displayDateOnly(startDate);
  }

  if (endDate) {
    const sameDate = startDate.getDate() === endDate.getDate();

    if (sameDate) {
      return `${displayTimesTogether(startDate, endDate)} ${displayDateOnly(startDate)}`;
    } else {
      const showMin = showMinutes(startDate) && showMinutes(endDate);
      return showMin
        ? `${displayHoursAndMinutes(startDate)} ${displayDateOnly(startDate)}
           - ${displayHoursAndMinutes(endDate)} ${displayDateOnly(endDate)}`
        : `${displayHoursOnly(startDate)} ${displayDateOnly(startDate)}
           - ${displayHoursOnly(endDate)} ${displayDateOnly(endDate)}`;
    }
  }  return displayDateOnly(startDate)
}


export const isSameDayOrAfter = (date1: Date, date2: Date): boolean => {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate() &&
         date1 >= date2
}

export const isSameDayOrBefore = (date1: Date, date2: Date): boolean => {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate() &&
         date1 <= date2
}

export const toLocalISOString = (dateString: string): string => {
  const date = new Date(dateString)
  date.setTime(date.getTime() - date.getTimezoneOffset() * 60 * 1000)
  return date.toISOString().slice(0, 16)
}
