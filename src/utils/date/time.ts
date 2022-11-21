import { Time, TimeComponents } from "../../types";
import { MS_IN_HOUR, MS_IN_MIN } from "./constants";
import { getDate} from ".";
import { DateVariants } from "./date.types";
import { getToday } from "./today";

export function getTime(date: DateVariants): Time {
	const _date = getDate(date);
	return _date.getHours() * MS_IN_HOUR + _date.getMinutes() * MS_IN_MIN;
}

export function getCurrentTime(): Time {
  return getTime(getToday());
}

export function getTimeComponents(time: Time): TimeComponents {
	const _hours = Math.floor(time / MS_IN_HOUR);
	const _minutes = Math.floor((time - _hours * MS_IN_HOUR) / MS_IN_MIN);

	return {
		_hours,
		_minutes,
		hours: `${_hours}`.padStart(2, '0'),
		minutes: `${_minutes}`.padStart(2, '0'),
	};
}

export function formatTime(time: Time): string {
  const { hours, minutes } = getTimeComponents(time);
  return `${hours}:${minutes}`;
}