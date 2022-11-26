import { FormGroup } from '../../containers/FormGroup';
import { MonthDay, WeekDays } from '../../types';
import { REMOVE_ACTION } from '../../ui/actions';

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
			<FormGroup>
				<WeekDaysInput
					value={weekDays}
					onChange={(newValue) => {
						handleChange({ weekDays: newValue });
					}}
					action={REMOVE_ACTION}
					label='Исключить дни недели'
				/>
			</FormGroup>

			<FormGroup>
				<MonthDaysInput
					value={monthDays}
					onChange={(newValue) => {
						handleChange({ monthDays: newValue });
					}}
					action={REMOVE_ACTION}
					label='Исключить дни месяца'
				/>
			</FormGroup>
		</div>
	);
}

export type { TaskExceptionParams, TaskExceptionsProps };
export { TaskExceptions };
