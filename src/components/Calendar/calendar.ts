import { Moment } from "../../types";
import { isWeekend, getMoment, getDayOfMonth, getMonth } from "../../utils/date";
import { getDiffInDays } from "../../utils/date/diff";
import { addDays } from "../../utils/date/manipulations";
import { getMonthEnd, getMonthStart } from "../../utils/date/month";
import { getPeriodDays } from "../../utils/date/period";
import { isToday } from "../../utils/date/today";
import { getWeekEnd, getWeekStart } from "../../utils/date/week";
import { CalendarDay, CalendarMonth } from "./calendar.types";

function CalendarDayModel(date: Date, month: Moment): CalendarDay {
  return {
    moment: getMoment(date),
    date: getDayOfMonth(date),
    isToday: isToday(date),
    isWeekend: isWeekend(date),
    active: getMonth(date) === getMonth(month),
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

  return calendarMonthDays.map(day => CalendarDayModel(day, date));
}