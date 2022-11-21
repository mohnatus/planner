import { PeriodUnits, RepeatTypes } from '../../domain/types';
import { Moment, MonthDay, WeekDays } from '../../types';
import { DateInput } from '../DateInput';
import { Input } from '../Input';
import { MonthDaysInput } from '../MonthDaysInput';
import { NumberInput } from '../NumberInput';
import { Toggler, TogglerOption } from '../Toggler';
import { WeekDaysInput } from '../WeekDaysInput';

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

	const periodUnits: Array<TogglerOption<PeriodUnits>> = [
		{
			id: PeriodUnits.Days,
			name: periodValue > 2 ? 'дней' : 'дня',
		},
		{
			id: PeriodUnits.Months,
			name: periodValue > 2 ? 'месяцев' : 'месяца',
		},
	];

	return (
		<div>
			<div>
				<div>
					<button
						type='button'
						onClick={() =>
							handleChange({ repeatType: RepeatTypes.WeekDays })
						}
					>
						Дни недели{' '}
						{repeatType === RepeatTypes.WeekDays && '(active)'}
					</button>
				</div>

				{repeatType === RepeatTypes.WeekDays && (
					<WeekDaysInput
						value={weekDays}
						onChange={(newValue) => {
							handleChange({ weekDays: newValue });
						}}
					/>
				)}

				<div>
					<button
						type='button'
						onClick={() =>
							handleChange({ repeatType: RepeatTypes.MonthDays })
						}
					>
						Дни месяца{' '}
						{repeatType === RepeatTypes.MonthDays && '(active)'}
					</button>
				</div>

				{repeatType === RepeatTypes.MonthDays && (
					<MonthDaysInput
						value={monthDays}
						onChange={(newValue) => {
							handleChange({ monthDays: newValue });
						}}
					/>
				)}

				<div>
					<button
						type='button'
						onClick={() =>
							handleChange({ repeatType: RepeatTypes.Period })
						}
					>
						Период {repeatType === RepeatTypes.Period && '(active)'}
					</button>
				</div>

				{repeatType === RepeatTypes.Period && (
					<div>
						<div>Один раз в</div>
						<NumberInput
							value={periodValue}
							onChange={(newValue) => {
								handleChange({ periodValue: newValue });
							}}
						></NumberInput>
						<Toggler
							value={periodUnit}
							options={periodUnits}
							onChange={(newValue) => {
								handleChange({ periodUnit: newValue });
							}}
						></Toggler>
						<div>
							Начиная с{' '}
							<DateInput
								value={startMoment}
								onChange={(newValue) => {
									handleChange({ startMoment: newValue });
								}}
							></DateInput>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
