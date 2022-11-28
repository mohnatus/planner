import { Day, Moment, Task, TaskMomentsList } from "../../types";
import { getDate, getDayOfWeek } from "../../utils/date";
import { MS_IN_DAY } from "../../utils/date/constants";

// Можно либо отменить для дня (exclude)
// тогда весь период не отмечается
// Либо переместить на любой день до следующего запланированного (include)
// тогда сдвигается начало периода

export function isWeekDaysTaskVisibleOnDay(task: Task, day: Day, moments: TaskMomentsList): boolean {
  if (task.resheduleToNextDay) {
    // если Переносить на след. день
    // найти последний целевой день и следующий целевой день
    // если между ними нет отметок, то показать сегодня, и не показывать в последний целевой день

    // предыдущий запланированный день
    let prevDayMomentPlanned = day.moment - MS_IN_DAY;
    // следующий запланированный день
    let nextDayMomentPlanned = day.moment + MS_IN_DAY;

    while(true) {
      const dayOfWeek = getDayOfWeek(prevDayMomentPlanned);
      if (task.weekDays.includes(dayOfWeek)) break;
      prevDayMomentPlanned -= MS_IN_DAY;
    }

    while(true) {
      const dayOfWeek = getDayOfWeek(nextDayMomentPlanned);
      if (task.weekDays.includes(dayOfWeek)) break;
      nextDayMomentPlanned += MS_IN_DAY;
    }

    let prevDayMoment = prevDayMomentPlanned;



    const date = getDate(day.moment);
    const dayOfWeek = getDayOfWeek(day.moment);
    if (task.weekDays.includes(day.weekDay)) return true;

    const taskMoments = moments[task.id];

    // если запланированный день отменен
    if (taskMoments.exclude.includes(prevDayMomentPlanned)) {
      const includedDay = taskMoments.include.find((moment: Moment) => moment > prevDayMomentPlanned && moment < nextDayMomentPlanned);
      prevDayMoment = includedDay || nextDayMomentPlanned;
    }

    
  }

  // если не Переносить
    // то просто по всем целевым дням

	return task.weekDays.includes(day.weekDay);

  const taskMoments = moments[task.id];

	if (taskMoments) {
		const { checks } = taskMoments;
		// 2.1) Видна во все дни, когда была отмечена
		if (
			checks.some((check: TaskCheck) => {
				return check.moment === day.moment;
			})
		)
			return true;

		const checkedAfterStart = checks.some((check: TaskCheck) => {
			return check.moment >= task.startMoment;
		});

		// 2.2) Если с момента старта уже отмечена, то больше нет вариантов
		if (checkedAfterStart) return false;
	}
}