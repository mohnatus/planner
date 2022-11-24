import { ReactNode } from "react";

export interface CalendarHeaderProps {
	onPrev: () => void;
	onNext: () => void;
	children: ReactNode
}

export function CalendarHeader({
	onPrev,
	onNext,
	children,
}: CalendarHeaderProps) {

	return (
		<div>
			<button type='button' onClick={onPrev}>
				&lt;
			</button>
			<div>{children}</div>
			<button type='button' onClick={onNext}>
				&gt;
			</button>
		</div>
	);
}
