import { useState } from 'react';
import styled from 'styled-components';

import { MonthDay, WeekDays } from '../../../types';
import { COLORS } from '../../../ui/colors';
import { RADIUS_SM } from '../../../ui/decor';
import { SPACING_XS, SPACING_XXS } from '../../../ui/spacing';

import { Checkbox } from '../../Checkbox';
import { Modal } from '../../Modal';

interface MonthDaysModalProps {
	show: boolean;
	onClose: () => void;
	onChange: (newValue: Array<MonthDay>) => void;
	value: Array<MonthDay>;
}

interface MonthViewProps {
	selected: boolean;
}

const MonthsView = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-left: ${-1 * SPACING_XXS}px;
	margin-right: ${-1 * SPACING_XXS}px;
`;

const MonthView = styled.div<MonthViewProps>`
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

const MONTH: MonthDay[] = Array(31)
	.fill(null)
	.map((_, i) => i + 1);

function MonthDaysModal({
	show,
	onClose,
	value,
	onChange,
}: MonthDaysModalProps) {
	const [selected, setSelected] = useState(value);

	const toggleDay = (day: MonthDay) => {


		setSelected((prev) => {
			const checked = prev.includes(day);
			if (checked)  return prev.filter((d) => d !== day);
			return [
				...prev,
				day
			]
		});
	};

	const onSubmit = () => {
		onChange(selected);
		onClose();
	};

	return (
		<Modal show={show} onClose={onClose}>
			<MonthsView>
				{MONTH.map((day: WeekDays) => (
						<MonthView key={day}
							selected={selected.includes(day)}
							onClick={() => {
								toggleDay(day);
							}}
						>
							{day}
						</MonthView>

				))}
			</MonthsView>

			<button onClick={onSubmit}>Сохранить</button>
		</Modal>
	);
}

export type { MonthDaysModalProps };
export { MonthDaysModal };
