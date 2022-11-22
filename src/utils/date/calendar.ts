import { Moment, CalendarDay, CalendarMonth } from "../../types";
import { isWeekend, getMoment, getDayOfMonth, getMonth } from ".";
import { getDiffInDays } from "./diff";
import { addDays } from "./manipulations";
import { getMonthEnd, getMonthStart } from "./month";
import { getPeriodDays } from "./period";
import { isToday } from "./today";
import { getWeekEnd, getWeekStart } from "./week";

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