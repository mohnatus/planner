import { useCallback, useState } from 'react';
import styled from 'styled-components';

import { DayOfYear, MonthDay, Months, WeekDays } from '../../../types';
import { COLORS } from '../../../ui/colors';
import { RADIUS_SM } from '../../../ui/decor';
import { SPACING_XS, SPACING_XXS } from '../../../ui/spacing';
import { MONTHS } from '../../../texts/Date';

import { Modal } from '../../Modal';

interface YearDaysModalProps {
	show: boolean;
	onClose: () => void;
	onChange: (newValue: Array<DayOfYear>) => void;
	value: Array<DayOfYear>;
}

interface MonthDaysProps {
	month: Months;
	selected: Array<DayOfYear>;
	onClick: (target: DayOfYear) => void;
}

interface MonthNameProps {
	month: Months;
	setMonth: (month: Months) => void;
}

interface DayViewProps {
	selected: boolean;
}

const MonthDaysView = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-left: ${-1 * SPACING_XXS}px;
	margin-right: ${-1 * SPACING_XXS}px;
`;

const DayView = styled.div<DayViewProps>`
	margin-left: ${SPACING_XXS}px;
	margin-right: ${SPACING_XXS}px;
	margin-bottom: ${SPACING_XS}px;
	width: 35px;
	height: 35px;
	border-radius: ${RADIUS_SM}px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;

	background-color: ${(props) =>
		props.selected ? COLORS.accent.color : COLORS.secondary.color};
	color: ${(props) =>
		props.selected ? COLORS.accent.contrast : COLORS.secondary.contrast};
`;

const monthDaysCount = {
	[Months.January]: 31,
	[Months.February]: 29,
	[Months.March]: 31,
	[Months.April]: 30,
	[Months.May]: 31,
	[Months.June]: 30,
	[Months.July]: 31,
	[Months.August]: 31,
	[Months.September]: 30,
	[Months.October]: 31,
	[Months.November]: 30,
	[Months.December]: 31,
};

function MonthDays({ month, selected, onClick }: MonthDaysProps) {
	const daysCount = monthDaysCount[month];
	const MONTH: MonthDay[] = Array(daysCount)
		.fill(null)
		.map((_, i) => i + 1);

	return (
		<MonthDaysView>
			{MONTH.map((day: number) => (
				<DayView
					key={day}
					selected={selected.includes(`${day}-${month}`)}
					onClick={() => {
						onClick(`${day}-${month}`);
					}}
				>
					{day}
				</DayView>
			))}
		</MonthDaysView>
	);
}

function MonthName({ month, setMonth }: MonthNameProps) {
	const toPrev = () => {
		let prevMonth = month - 1;
		if (prevMonth < 0) prevMonth = 11;

		setMonth(prevMonth);
	};
	const toNext = () => {
		let nextMonth = month + 1;
		if (nextMonth > 11) nextMonth = 0;
		setMonth(nextMonth);
	};

	return (
		<div>
			<button type='button' onClick={toPrev}>
				prev
			</button>
			{MONTHS[month]}
			<button type='button' onClick={toNext}>
				next
			</button>
		</div>
	);
}

function YearDaysModal({ show, onClose, value, onChange }: YearDaysModalProps) {
	const [selected, setSelected] = useState(value);
	const [month, setMonth] = useState(Months.January);

	const toggleDay = (day: DayOfYear) => {
		setSelected((prev) => {
			const checked = prev.includes(day);
			if (checked) return prev.filter((d) => d !== day);
			return [...prev, day];
		});
	};

	const onSubmit = () => {
		onChange(selected);
		onClose();
	};

	return (
		<Modal show={show} onClose={onClose}>
			<MonthName month={month} setMonth={setMonth} />
			<MonthDays month={month} selected={selected} onClick={toggleDay} />

			<button onClick={onSubmit}>Сохранить</button>
		</Modal>
	);
}

export type { YearDaysModalProps };
export { YearDaysModal };
