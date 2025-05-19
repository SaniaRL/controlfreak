import { Frequency, RRule, RRuleSet } from 'rrule'

export function buildRRule(dtstart: Date, freq: Frequency, until?: Date | null): string {
  return new RRule({
    dtstart,
    freq,
    until: until ?? undefined
  }).toString()
}

export function addExDate(rruleStr: string, exDate: Date): string {
  const rule = RRule.fromString(rruleStr)
  const rruleSet = new RRuleSet()

  rruleSet.rrule(rule)
  rruleSet.exdate(exDate)

  return rruleSet.toString()
}

export function changeDtStart(rruleString: string, newDtStart: Date): string {
  const rrule = RRule.fromString(rruleString)
  const untilIsValid = rrule.options.until && rrule.options.until > newDtStart 
  return buildRRule(newDtStart, rrule.options.freq, untilIsValid ? rrule.options.until : null)
}