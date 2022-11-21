import { useState } from 'react';
import { Moment } from '../../../types';
import { Calendar } from '../../Calendar';
import { Modal } from '../../Modal';

export interface DateModalProps {
	show: boolean;
	onClose: () => void;
	onChange: (newValue: Moment) => void;
	value: Moment;
}

export function DateModal({
	show,
	onClose,
	value,
	onChange,
}: DateModalProps) {
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
