import { ReactNode, useCallback, useState } from 'react';
import styled from 'styled-components';
import { SPACING_SM, SPACING_XXS } from '../../style/spacing';

export interface ToggleBlockProps {
	title: string;
	children: ReactNode;
}

const Header = styled.div`
	min-height: 48px;
	display: flex;
	align-items: center;
	padding-top: ${SPACING_XXS}px;
	padding-bottom: ${SPACING_XXS}px;
  cursor: pointer;
`;

const Title = styled.div`
	flex-grow: 1;
  font-weight: 700;
`;

interface TogglerProps {
	open: boolean;
}

const Toggler = styled.button<TogglerProps>`
	flex-grow: 0;
	margin-left: ${SPACING_SM}px;
  transform: rotate(${props => props.open ? 90 : -90}deg);

`;

const Content = styled.div`
  padding-top: ${SPACING_SM}px;
  padding-bottom: ${SPACING_SM}px;
`

export function ToggleBlock({ title, children }: ToggleBlockProps) {
	const [open, setOpen] = useState(false);

	const toggle = useCallback(() => {
		setOpen((prev) => !prev);
	}, [setOpen]);

	return (
		<div>
			<Header onClick={toggle}>
				<Title>{title}</Title>
				<Toggler open={open}>&lt;</Toggler>
			</Header>

			{open && <Content>{children}</Content>}
		</div>
	);
}
