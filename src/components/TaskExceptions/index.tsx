import { MonthDay, WeekDays } from '../../types';

import { MonthDaysInput } from '../MonthDaysInput';
import { WeekDaysInput } from '../WeekDaysInput';

type TaskExceptionParams = {
	weekDays: Array<WeekDays>;
	monthDays: Array<MonthDay>;
};

interface TaskExceptionsProps {
	weekDays: Array<WeekDays>;
	monthDays: Array<MonthDay>;
	onChange: (newValue: Partial<TaskExceptionParams>) => void;
}

function TaskExceptions({
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

export type { TaskExceptionParams, TaskExceptionsProps };
export { TaskExceptions };
