import { ReactNode } from 'react';
import styled from 'styled-components';

export interface CalendarHeaderProps {
	onPrev: () => void;
	onNext: () => void;
	children: ReactNode;
}

const Header = styled.div`
	display: flex;
	align-items: center;
`;

const Control = styled.button`
	flex-shrink: 0;
`;

const Title = styled.div`
	flex-grow: 1;
	text-align: center;
`;

export function CalendarHeader({
	onPrev,
	onNext,
	children,
}: CalendarHeaderProps) {
	return (
		<Header>
			<Control type='button' onClick={onPrev}>
				&lt;
			</Control>
			<Title>{children}</Title>
			<Control type='button' onClick={onNext}>
				&gt;
			</Control>
		</Header>
	);
}
