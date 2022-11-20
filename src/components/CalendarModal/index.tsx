import { useState } from 'react';
import { Moment } from '../../types';
import { Calendar } from '../Calendar';
import { Modal } from '../Modal';

export interface CalendarModalProps {
	show: boolean;
	onClose: () => void;
	onChange: (newValue: Moment) => void;
	value: Moment;
}

export function CalendarModal({
	show,
	onClose,
	value,
	onChange,
}: CalendarModalProps) {
	const [selected, setSelected] = useState(value);

	const onDayChange = (moment: Moment) => {
		setSelected(moment);
	};

	const onSubmit = () => {
		onChange(selected);
		onClose();
	};

	return (
		<Modal show={show} onClose={onClose}>
			<Calendar value={selected} onChange={onDayChange} />
			<button onClick={onSubmit}>Сохранить</button>
		</Modal>
	);
}
