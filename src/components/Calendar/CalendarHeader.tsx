import { ReactNode } from 'react';
import styled from 'styled-components';

interface CalendarHeaderProps {
	onPrev: () => void;
	onNext: () => void;
	children: ReactNode;
}

const HeaderView = styled.div`
	display: flex;
	align-items: center;
`;

const ControlView = styled.button`
	flex-shrink: 0;
`;

const TitleView = styled.div`
	flex-grow: 1;
	text-align: center;
`;

function CalendarHeader({ onPrev, onNext, children }: CalendarHeaderProps) {
	return (
		<HeaderView>
			<ControlView type='button' onClick={onPrev}>
				&lt;
			</ControlView>
			<TitleView>{children}</TitleView>
			<ControlView type='button' onClick={onNext}>
				&gt;
			</ControlView>
		</HeaderView>
	);
}

export type { CalendarHeaderProps };
export { CalendarHeader };
