import { useCallback, useState } from 'react';
import styled from 'styled-components';

import { Moment } from '../../types';
import { COLORS } from '../../ui/colors';
import { RADIUS_SM } from '../../ui/decor';
import { CONTROL_HEIGHT } from '../../ui/sizes';
import { SPACING_XS } from '../../ui/spacing';
import { formatDate } from '../../utils/date/format';

import { DateModal } from './DateModal';

interface DateInputProps {
	value: Moment;
	onChange: (newValue: Moment) => void;
}

interface DateInputControlProps {
	value: Moment;
	onClick: () => void;
}

const ControlView = styled.div`
	width: 186px;
	flex-shrink: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	height: ${CONTROL_HEIGHT}px;
	padding-left: ${SPACING_XS}px;
	padding-right: ${SPACING_XS}px;
	background-color: ${COLORS.controls.color};
	color: ${COLORS.controls.contrast};
	border: 1px solid ${COLORS.border};
	border-radius: ${RADIUS_SM}px;
	cursor: pointer;
`;

function DateInputControl({ value, onClick }: DateInputControlProps) {
	return (
		<ControlView onClick={onClick}>
			{formatDate(value)}
		</ControlView>
	);
}

function DateInput({ value, onChange }: DateInputProps) {
	const [showModal, setShowModal] = useState(false);

	const openModal = useCallback(() => {
		setShowModal(true);
	}, [setShowModal]);

	const closeModal = useCallback(() => {
		setShowModal(false);
	}, [setShowModal]);

	const onDayChange = useCallback(
		(moment: Moment) => {
			onChange(moment);
		},
		[onChange]
	);

	return (
		<div>
			<DateInputControl value={value} onClick={openModal} />

			<DateModal
				show={showModal}
				onClose={closeModal}
				value={value}
				onChange={onDayChange}
			></DateModal>
		</div>
	);
}

export type { DateInputProps };
export { DateInput };
