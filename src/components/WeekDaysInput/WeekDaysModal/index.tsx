import { useState } from 'react';
import styled from 'styled-components';

import { WeekDays } from '../../../types';
import { WEEK_DAYS } from '../../../texts/Date';
import { SPACING_SM } from '../../../ui/spacing';

import { Checkbox } from '../../Checkbox';
import { Modal } from '../../Modal';

interface WeekDaysModalProps {
	show: boolean;
	onClose: () => void;
	onChange: (newValue: Array<WeekDays>) => void;
	value: Array<WeekDays>;
}

const DayView = styled.div`
	&:not(:last-child) {
		margin-bottom: ${SPACING_SM}px;
	}
`

const WEEK: WeekDays[] = [
	WeekDays.Monday,
	WeekDays.Tuesday,
	WeekDays.Wednesday,
	WeekDays.Thursday,
	WeekDays.Friday,
	WeekDays.Saturday,
	WeekDays.Sunday,
];

function WeekDaysModal({
	show,
	onClose,
	value,
	onChange,
}: WeekDaysModalProps) {
	const [selected, setSelected] = useState(value);

	const toggleDay = (day: WeekDays, checked: boolean) => {
		setSelected((prev) => {
			const newValue = prev.filter((d) => d !== day);
			if (checked) {
				newValue.push(day);
			}
			return newValue;
		});
	};

	const onSubmit = () => {
		onChange(selected);
		onClose();
	};

	return (
		<Modal show={show} onClose={onClose}>
			{WEEK.map((day: WeekDays) => (
				<DayView key={day}>
					<Checkbox
						label={WEEK_DAYS[day]}
						checked={selected.includes(day)}
						onChange={(checked) => {
							toggleDay(day, checked);
						}}
					/>
				</DayView>
			))}

			<button onClick={onSubmit}>Сохранить</button>
		</Modal>
	);
}

export type { WeekDaysModalProps };
export { WeekDaysModal };
