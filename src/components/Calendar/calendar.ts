import { Moment } from "../../types";
import { addDays, getPeriodDays, getDiffInDays, getMonthEnd, getMonthStart, getWeekEnd, getWeekStart, isToday, isWeekend, getMoment } from "../../utils/date";
import { CalendarDay, CalendarMonth } from "./calendar.types";

function CalendarDayModel(date: Date): CalendarDay {
  return {
    moment: getMoment(date),
    isToday: isToday(date),
    isWeekend: isWeekend(date)
  }
}

export function getCalendarMonth(date: Moment): CalendarMonth {
  const monthStart =getMonthStart(date);
  const monthWeekStart = getWeekStart(monthStart);

  const monthEnd = getMonthEnd(date);
  let monthWeekEnd = getWeekEnd(monthEnd);

  if (getDiffInDays(monthWeekStart, monthWeekEnd) < 30) {
    monthWeekEnd = addDays(monthWeekEnd, 7);
  }

  const calendarMonthDays = getPeriodDays(monthWeekStart, monthWeekEnd);

  return calendarMonthDays.map(date => CalendarDayModel(date));
}