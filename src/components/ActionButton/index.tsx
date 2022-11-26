import styled from 'styled-components';

import { COLORS } from '../../ui/colors';
import { CONTROL_HEIGHT } from '../../ui/sizes';
import { SPACING_SM } from '../../ui/spacing';
import { ADD_ACTION, REMOVE_ACTION } from '../../ui/actions';

type ActionType = typeof ADD_ACTION | typeof REMOVE_ACTION;

interface UIAction {
	action?: ActionType;
	label?: string;
}

interface ActionButtonProps extends UIAction {
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

function ActionButton({ action = ADD_ACTION, label = '', onClick }: ActionButtonProps) {
	return (
		<WrapperView type='button' onClick={onClick}>
			<IconView>{action === ADD_ACTION ? '+' : '-'}</IconView>
			<LabelView>{label}</LabelView>
		</WrapperView>
	);
}

export type { UIAction, ActionType, ActionButtonProps };
export { ActionButton };
