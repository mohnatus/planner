import { useCallback, useState } from 'react';
import styled from 'styled-components';

import { Time } from '../../types';
import { formatTime } from '../../utils/date/time';
import { SPACING_SM, SPACING_XS, SPACING_XXS } from '../../ui/spacing';
import { COLORS } from '../../ui/colors';

import { TimeModal } from './TimeModal';
import { CONTROL_HEIGHT } from '../../ui/sizes';
import { RADIUS_SM } from '../../ui/decor';

interface TimeItemProps {
	time: Time | null;
	onRemove: () => void;
	onClick: () => void;
}

interface TimeInputProps {
	value: Time | null;
	onChange: (newValue: Time | null) => void;
}

const TimeView = styled.div`
	display: flex;
	align-items: center;
	margin: 0 ${SPACING_XXS}px ${SPACING_XS}px;
	background-color: ${COLORS.controls.color};
	color: ${COLORS.controls.contrast};
	height: ${CONTROL_HEIGHT}px;
	padding: ${SPACING_XXS}px ${SPACING_SM}px;
	border-radius: ${RADIUS_SM}px;
	border: 1px solid ${COLORS.border};
`;

const RemoveButtonView = styled.button`
	margin-left: ${SPACING_XS}px;
	margin-right: ${-1 * SPACING_XXS}px;
`;

function TimeItem({ time, onRemove, onClick }: TimeItemProps) {
	return (
		<TimeView>
			<div onClick={onClick}>
				{!time ? 'Время не настроено' : formatTime(time)}
			</div>
			<RemoveButtonView type='button' onClick={onRemove}>
				&times;
			</RemoveButtonView>
		</TimeView>
	);
}

function TimeInput({ value, onChange }: TimeInputProps) {
	const [showModal, setShowModal] = useState(false);

	const openModal = useCallback(() => {
		setShowModal(true);
	}, [setShowModal]);

	const closeModal = useCallback(() => {
		setShowModal(false);
	}, [setShowModal]);

	const removeTime = useCallback(
		() => {
			onChange(null);
		},
		[onChange]
	);

	return (
		<div>
			<TimeItem time={value} onRemove={removeTime} onClick={openModal} />

			<TimeModal
				show={showModal}
				value={value}
				onClose={closeModal}
				onChange={onChange}
			></TimeModal>
		</div>
	);
}

export type { TimeInputProps };
export { TimeInput };
