import { Moment, MonthDay } from "../../types"

export type CalendarDay = {
  moment: Moment,
  date: MonthDay,
  isToday: boolean,
  isWeekend: boolean,
  active: boolean,
}

export type CalendarMonth = Array<CalendarDay>