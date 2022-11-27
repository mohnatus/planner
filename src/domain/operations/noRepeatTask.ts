import { Day, Task, TaskCheck, TaskMomentsList } from '../../types';
import { getTodayMoment } from '../../utils/date/today';

export function isNoRepeatTaskVisibleOnDay(
	task: Task,
	day: Day,
	moments: TaskMomentsList
): boolean {
	// 1) Без переноса
	if (!task.resheduleToNextDay) {
		// видна только в день начала отсчета
		return task.startMoment === day.moment;
	}

	// 2) С переносом
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

	// 2.3) Если с момента старта не было отметок

	const today = getTodayMoment();

	if (task.startMoment <= today) {
		// 2.3.1) если старт в прошлом, видна сегодня
		return day.moment === today;
	}

	// 2.3.2.) если старт в будущем, видна в день старта
	return day.moment === task.startMoment;
}
