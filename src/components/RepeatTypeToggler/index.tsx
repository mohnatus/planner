import styled from 'styled-components';
import { DateGroup } from '../../containers/DateGroup';
import { FormGroup } from '../../containers/FormGroup';

import {
	Moment,
	MonthDay,
	WeekDays,
	PeriodUnits,
	RepeatTypes,
} from '../../types';
import { COLORS } from '../../ui/colors';
import { RADIUS_LG } from '../../ui/decor';
import { CONTROL_HEIGHT } from '../../ui/sizes';
import { SPACING_SM, SPACING_XS, SPACING_XXS } from '../../ui/spacing';

import { DateInput } from '../DateInput';
import { MonthDaysInput } from '../MonthDaysInput';
import { NumberInput } from '../NumberInput';
import { Toggler, TogglerOption } from '../Toggler';
import { WeekDaysInput } from '../WeekDaysInput';

interface RepeatParams {
	repeatType: RepeatTypes;
	weekDays: Array<WeekDays>;
	monthDays: Array<MonthDay>;
	startMoment: Moment;
	periodValue: number;
	periodUnit: PeriodUnits;
}

interface RepeatTypeTogglerProps {
	repeatType: RepeatTypes;
	weekDays: Array<WeekDays>;
	monthDays: Array<MonthDay>;
	startMoment: Moment;
	periodValue: number;
	periodUnit: PeriodUnits;
	onChange: (params: Partial<RepeatParams>) => void;
}

interface BlockHeaderViewProps {
	active: boolean;
}

const WrapperView = styled.div`
	border-radius: ${RADIUS_LG}px;
	overflow: hidden;
	border: 1px solid ${COLORS.border};
`;

const BlockView = styled.div`
	&:not(:last-child) {
		border-bottom: 1px solid ${COLORS.border};
	}
`;

const BlockHeaderView = styled.button<BlockHeaderViewProps>`
	min-height: ${CONTROL_HEIGHT}px;
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: center;
	border: none;
	outline: none;
	padding: ${SPACING_XXS}px ${SPACING_XS}px;

	background-color: ${(props) =>
		props.active ? COLORS.accent.color : COLORS.controls.color};
	color: ${(props) =>
		props.active ? COLORS.accent.contrast : COLORS.controls.contrast};

	cursor: pointer;
`;

const BlockContentView = styled.div`
	padding: ${SPACING_SM}px;
`;

function RepeatTypeToggler({
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
		<WrapperView>
			<BlockView>
				<BlockHeaderView
					active={repeatType === RepeatTypes.WeekDays}
					type='button'
					onClick={() =>
						handleChange({ repeatType: RepeatTypes.WeekDays })
					}
				>
					Дни недели{' '}
					{repeatType === RepeatTypes.WeekDays && '(active)'}
				</BlockHeaderView>
				{repeatType === RepeatTypes.WeekDays && (
					<BlockContentView>
						<WeekDaysInput
							value={weekDays}
							onChange={(newValue) => {
								handleChange({ weekDays: newValue });
							}}
						/>
					</BlockContentView>
				)}
			</BlockView>

			<BlockView>
				<BlockHeaderView
					active={repeatType === RepeatTypes.MonthDays}
					type='button'
					onClick={() =>
						handleChange({ repeatType: RepeatTypes.MonthDays })
					}
				>
					Дни месяца{' '}
					{repeatType === RepeatTypes.MonthDays && '(active)'}
				</BlockHeaderView>
				{repeatType === RepeatTypes.MonthDays && (
					<BlockContentView>
						<MonthDaysInput
							value={monthDays}
							onChange={(newValue) => {
								handleChange({ monthDays: newValue });
							}}
						/>
					</BlockContentView>
				)}
			</BlockView>

			<BlockView>
				<BlockHeaderView
					active={repeatType === RepeatTypes.Period}
					type='button'
					onClick={() =>
						handleChange({ repeatType: RepeatTypes.Period })
					}
				>
					Период {repeatType === RepeatTypes.Period && '(active)'}
				</BlockHeaderView>
				{repeatType === RepeatTypes.Period && (
					<BlockContentView>
						<FormGroup>
							<div>Один раз в</div>

							<div>
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
							</div>
							
						</FormGroup>
						<FormGroup>
							<DateGroup
								label='Начиная с'
								value={startMoment}
								onChange={(newValue) => {
									handleChange({ startMoment: newValue });
								}}
							/>
						</FormGroup>
					</BlockContentView>
				)}
			</BlockView>
		</WrapperView>
	);
}

export type { RepeatParams, RepeatTypeTogglerProps };
export { RepeatTypeToggler };
