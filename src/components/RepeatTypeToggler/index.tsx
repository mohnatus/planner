import { PeriodUnits, RepeatTypes } from '../../domain/types';
import { Moment, MonthDay, WeekDays } from '../../types';

export interface RepeatParams {
	repeatType: RepeatTypes;
	weekDays: Array<WeekDays>;
	monthDays: Array<MonthDay>;
	startMoment: Moment;
	periodValue: number;
	periodUnit: PeriodUnits;
}

export interface RepeatTypeTogglerProps {
	repeatType: RepeatTypes;
	weekDays: Array<WeekDays>;
	monthDays: Array<MonthDay>;
	startMoment: Moment;
	periodValue: number;
	periodUnit: PeriodUnits;
	onChange: (params: Partial<RepeatParams>) => void;
}

export function RepeatTypeToggler({
	repeatType,
	weekDays,
	monthDays,
	startMoment,
	periodValue,
	periodUnit,
	onChange,
}: RepeatTypeTogglerProps) {
	const handleChange = (params: Partial<RepeatParams>) => {
		onChange(params);
	};

	return (
		<div>
			<div>
				<button
					onClick={() =>
						handleChange({ repeatType: RepeatTypes.WeekDays })
					}
				>
					Дни недели{' '}
					{repeatType === RepeatTypes.WeekDays && '(active)'}
				</button>


        <button
					onClick={() =>
						handleChange({ repeatType: RepeatTypes.MonthDays })
					}
				>
					Дни месяца{' '}
					{repeatType === RepeatTypes.MonthDays && '(active)'}
				</button>

        <button
					onClick={() =>
						handleChange({ repeatType: RepeatTypes.Period })
					}
				>
					Период{' '}
					{repeatType === RepeatTypes.Period && '(active)'}
				</button>
			</div>
		</div>
	);
}
