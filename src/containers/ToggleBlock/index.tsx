import { ReactNode, useCallback, useState } from 'react';
import styled from 'styled-components';
import { SPACING_SM, SPACING_XXS } from '../../ui/spacing';

interface ToggleBlockProps {
	title: string;
	children: ReactNode;
}

interface IconViewProps {
	open: boolean;
}

const HeaderView = styled.div`
	min-height: 48px;
	display: flex;
	align-items: center;
	padding-top: ${SPACING_XXS}px;
	padding-bottom: ${SPACING_XXS}px;
	cursor: pointer;
`;

const TitleView = styled.div`
	flex-grow: 1;
	font-weight: 700;
`;

const IconView = styled.button<IconViewProps>`
	flex-grow: 0;
	margin-left: ${SPACING_SM}px;
	transform: rotate(${(props) => (props.open ? 90 : -90)}deg);
`;

const ContentView = styled.div`
	padding-top: ${SPACING_SM}px;
	padding-bottom: ${SPACING_SM}px;
`;

function ToggleBlock({ title, children }: ToggleBlockProps) {
	const [open, setOpen] = useState(false);

	const toggle = useCallback(() => {
		setOpen((prev) => !prev);
	}, [setOpen]);

	return (
		<div>
			<HeaderView onClick={toggle}>
				<TitleView>{title}</TitleView>
				<IconView open={open}>&lt;</IconView>
			</HeaderView>

			{open && <ContentView>{children}</ContentView>}
		</div>
	);
}

export type { ToggleBlockProps };
export { ToggleBlock };
