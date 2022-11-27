import { Day, Task, TaskMomentsList } from "../../types";

export function isWeekDaysTaskVisibleOnDay(task: Task, day: Day, moments: TaskMomentsList): boolean {
  // если Переносить на след. день

    // найти последний целевой день и следующий целевой день
    // если между ними нет отметок, то показать сегодня, и не показывать в последний целевой день

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