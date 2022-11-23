import { ReactNode } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../style/colors';
import { RADIUS_SM } from '../../style/decor';
import { CONTROL_HEIGHT } from '../../style/sizes';
import { FONT_SIZE } from '../../style/typography';

export interface ButtonProps {
	accent?: boolean;
  secondary?: boolean;
	onClick: () => void;
	children: ReactNode;
}

interface ButtonControlProps {
	accent?: boolean;
	secondary?: boolean;
}

const ButtonControl = styled.button<ButtonControlProps>`
	height: ${CONTROL_HEIGHT}px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: ${RADIUS_SM}px;

	background-color: ${COLORS.controls.color};
	color: ${COLORS.controls.contrast};

  font: inherit;
  font-size: ${FONT_SIZE.button};

  border: 1px solid ${COLORS.border};

  cursor: pointer;

	${(props) =>
		props.accent &&
		`
    background-color: ${COLORS.accent.color};
    color: ${COLORS.accent.contrast};
    border-color: transparent;
  `}

  ${(props) =>
		props.secondary &&
		`
    background-color: ${COLORS.secondary.color};
    color: ${COLORS.secondary.contrast};
    border-color: transparent;
  `}
`;

export { ButtonControl };

export function Button({ accent, secondary, onClick, children }: ButtonProps) {
	return (
		<ButtonControl type='button' onClick={onClick} accent={accent} secondary={secondary}>
			{children}
		</ButtonControl>
	);
}
