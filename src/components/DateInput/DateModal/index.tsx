import { useEffect, useState } from 'react';
import { Moment } from '../../../types';
import { getTodayMoment } from '../../../utils/date/today';
import { Datepicker } from '../../Datepicker';
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
	const [selected, setSelected] = useState(getTodayMoment());

	useEffect(() => {
		setSelected(value || getTodayMoment())
	}, [value]);

	const onDayChange = (moment: Moment) => {
		setSelected(moment);
	};

	const onSubmit = () => {
		onChange(selected);
		onClose();
	};

	return (
		<Modal show={show} onClose={onClose}>
			<Datepicker value={selected} onChange={onDayChange} />
			<button onClick={onSubmit}>Сохранить</button>
		</Modal>
	);
}
