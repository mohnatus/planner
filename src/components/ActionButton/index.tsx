import styled from 'styled-components';

import { COLORS } from '../../style/colors';
import { CONTROL_HEIGHT } from '../../style/sizes';
import { SPACING_SM } from '../../style/spacing';

interface ActionButtonProps {
	action: 'add' | 'remove';
	label: string;
	onClick?: () => void;
}

const WrapperView = styled.button`
	display: flex;
	align-items: center;
	font: inherit;
	background: transparent;
	border: none;
	cursor: pointer;
`;

const IconView = styled.div`
	width: ${CONTROL_HEIGHT}px;
	height: ${CONTROL_HEIGHT}px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	background-color: ${COLORS.accent.color};
	color: ${COLORS.accent.contrast};
	font-size: 2rem;
	font-weight: bold;
	margin-right: ${SPACING_SM}px;
`;

const LabelView = styled.span``;

function ActionButton({ action, label, onClick }: ActionButtonProps) {
	return (
		<WrapperView type='button' onClick={onClick}>
			<IconView>{action === 'add' ? '+' : '-'}</IconView>
			<LabelView>{label}</LabelView>
		</WrapperView>
	);
}

export type { ActionButtonProps };
export { ActionButton };
