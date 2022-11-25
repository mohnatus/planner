import { ReactNode } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../style/colors';
import { RADIUS_SM } from '../../style/decor';
import { CONTROL_HEIGHT } from '../../style/sizes';
import { SPACING_XS } from '../../style/spacing';
import { FONT_SIZE } from '../../style/typography';

interface ButtonControlProps {
	accent?: boolean;
	secondary?: boolean;
	block?: boolean;
}

const ButtonControl = styled.button<ButtonControlProps>`
	height: ${CONTROL_HEIGHT}px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: ${RADIUS_SM}px;
	padding-left: ${SPACING_XS}px;
	padding-right: ${SPACING_XS}px;

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

  ${(props) =>
		props.block &&
		`
  width: 100%;
  `}
`;

interface ButtonProps {
	type?: 'button' | 'submit' | 'reset';
	accent?: boolean;
	secondary?: boolean;
	block?: boolean;
	onClick?: () => void;
	children: ReactNode;
}

function Button({ type = 'button', onClick, children, ...props }: ButtonProps) {
	return (
		<ButtonControl type={type} onClick={onClick} {...props}>
			{children}
		</ButtonControl>
	);
}

export type { ButtonControlProps, ButtonProps };
export { ButtonControl, Button };
