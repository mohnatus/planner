import { Moment } from "../../types"

export type CalendarDay = {
  moment: Moment,
  isToday: boolean,
  isWeekend: boolean,
}

export type CalendarMonth = Array<CalendarDay>