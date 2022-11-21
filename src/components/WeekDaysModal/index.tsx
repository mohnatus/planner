import { useState } from 'react';
import { WEEK_DAYS } from '../../texts/Date';
import { Moment, WeekDays } from '../../types';
import { week } from '../../utils/date';
import { Calendar } from '../Calendar';
import { Checkbox } from '../Checkbox';
import { Modal } from '../Modal';


const WEEK: WeekDays[] = [WeekDays.Monday, WeekDays.Tuesday, WeekDays.Wednesday, WeekDays.Thursday, WeekDays.Friday, WeekDays.Saturday, WeekDays.Sunday];

export interface WeekDaysModalProps {
	show: boolean;
	onClose: () => void;
	onChange: (newValue: Array<WeekDays>) => void;
	value: Array<WeekDays>;
}

export function WeekDaysModal({
	show,
	onClose,
	value,
	onChange,
}: WeekDaysModalProps) {
	const [selected, setSelected] = useState(value);

	const toggleDay = (day: WeekDays, checked: boolean) => {
		setSelected(prev => {
			const newValue = prev.filter(d => d !== day);
			if (checked) {
				newValue.push(day);
			}
			return newValue;
		});
	}

	const onSubmit = () => {
		onChange(selected);
		onClose();
	};

	return (
		<Modal show={show} onClose={onClose}>

			{WEEK.map((day: WeekDays) => (<div key={day}>
				<Checkbox label={WEEK_DAYS[day]} checked={selected.includes(day)} onChange={(checked) => {
					toggleDay(day, checked)
				}} />
			</div>))}

			<button onClick={onSubmit}>Сохранить</button>
		</Modal>
	);
}
