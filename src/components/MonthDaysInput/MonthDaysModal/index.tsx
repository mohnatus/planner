import { useState } from 'react';
import { MonthDay, WeekDays } from '../../../types';
import { Checkbox } from '../../Checkbox';
import { Modal } from '../../Modal';

const MONTH: MonthDay[] = Array(31)
	.fill(null)
	.map((_, i) => i + 1);

export interface MonthDaysModalProps {
	show: boolean;
	onClose: () => void;
	onChange: (newValue: Array<MonthDay>) => void;
	value: Array<MonthDay>;
}

export function MonthDaysModal({
	show,
	onClose,
	value,
	onChange,
}: MonthDaysModalProps) {
	const [selected, setSelected] = useState(value);

	const toggleDay = (day: MonthDay, checked: boolean) => {
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
			{MONTH.map((day: WeekDays) => (
				<div key={day}>
					<Checkbox
						label={`${day}`}
						checked={selected.includes(day)}
						onChange={(checked) => {
							toggleDay(day, checked);
						}}
					/>
				</div>
			))}

			<button onClick={onSubmit}>Сохранить</button>
		</Modal>
	);
}
