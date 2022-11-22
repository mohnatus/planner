import { MonthDay, WeekDays } from '../../types';
import { MonthDaysInput } from '../MonthDaysInput';
import { WeekDaysInput } from '../WeekDaysInput';

export type TaskExceptionParams = {
	weekDays: Array<WeekDays>;
	monthDays: Array<MonthDay>;
};

export interface TaskExceptionsProps {
	weekDays: Array<WeekDays>;
	monthDays: Array<MonthDay>;
	onChange: (newValue: Partial<TaskExceptionParams>) => void;
}

export function TaskExceptions({
	weekDays,
	monthDays,
	onChange,
}: TaskExceptionsProps) {
	const handleChange = (params: Partial<TaskExceptionParams>) => {
		onChange(params);
	};

	return (
		<div>
			<WeekDaysInput
				value={weekDays}
				onChange={(newValue) => {
					handleChange({ weekDays: newValue });
				}}
			/>

			<MonthDaysInput
				value={monthDays}
				onChange={(newValue) => {
					handleChange({ monthDays: newValue });
				}}
			/>
		</div>
	);
}
