import { Frequency, RRule, RRuleSet } from 'rrule'

export function buildRRule(dtstart: Date, freq: Frequency, until?: Date | null): string {
  const dtstartString = formatDateToRRuleExdateAllDay(dtstart)
  const rrule = new RRule({
    dtstart: dtstart,
    freq,
    until: until,
  }).toString().replace(/DTSTART:[^;\n]+/, `DTSTART:${dtstartString}`)

  return rrule
}

export function changeDtStart(rruleString: string, newDtStart: Date): string {
  const rrule = RRule.fromString(rruleString)
  const untilIsValid = rrule.options.until && rrule.options.until > newDtStart 
  return buildRRule(newDtStart, rrule.options.freq, untilIsValid ? rrule.options.until : null)
}

export const separateExdate = (rruleString: string): [rrule: string, exdate: string] => {
  const lines = rruleString.split('\n')
  let rruleLines: string[] = []
  let exdateLines: string[] = []

  lines.forEach(line => {
    if (line.startsWith('EXDATE:')) {
      exdateLines.push(line)
    } else {
      rruleLines.push(line)
    }
  })

  const rrulePart = rruleLines.join('\n')
  const exdatePart = exdateLines.join('\n')

  return [rrulePart, exdatePart]
}

export const addExdate = (rruleString: string, exdate: Date): string => {
  const [rrulePart, exdatePart] = separateExdate(rruleString)
  const newExdateString = formatDateToRRuleExdate(exdate)

  const updatedExdatePart = `${exdatePart ? exdatePart + '\n' : ''}EXDATE:${newExdateString}`

  return `${rrulePart}\n${updatedExdatePart}`
}

const formatDateToRRuleExdate = (date: Date): string => {
  const year = date.getUTCFullYear()
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
  const day = date.getUTCDate().toString().padStart(2, '0')
  const hour = date.getUTCHours().toString().padStart(2, '0')
  const minute = date.getUTCMinutes().toString().padStart(2, '0')
  const second = date.getUTCSeconds().toString().padStart(2, '0')
  return `${year}${month}${day}T${hour}${minute}${second}Z`
}

const formatDateToRRuleExdateAllDay = (date: Date): string => {
  const year = date.getUTCFullYear()
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
  const day = date.getUTCDate().toString().padStart(2, '0')
  return `${year}${month}${day}`
}

export const addExdateAllDay = (rruleString: string, exdate: Date): string => {
  const [rrulePart, exdatePart] = separateExdate(rruleString)
  const newExdateString = formatDateToRRuleExdateAllDay(exdate)

  const updatedExdatePart = `${exdatePart ? exdatePart + '\n' : ''}EXDATE:${newExdateString}`

  return `${rrulePart}\n${updatedExdatePart}`
}

