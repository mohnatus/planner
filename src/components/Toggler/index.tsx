import { useCallback } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../style/colors';
import { RADIUS_SM } from '../../style/decor';
import { CONTROL_HEIGHT } from '../../style/sizes';
import { ButtonControl } from '../Button';

export type TogglerOption<T> = {
	id: T;
	name: string;
};
interface TogglerOptionProps<T> {
	option: TogglerOption<T>;
	active: boolean;
	onClick: (id: T) => void;
}

export interface TogglerProps<T> {
	options: Array<TogglerOption<T>>;
	value: T;
	onChange: (newValue: T) => void;
}

const TogglerWrapper = styled.div`
	display: flex;

`;

interface TogglerButtonProps {
	active?: boolean;
}

const TogglerButton = styled(ButtonControl)<TogglerButtonProps>`
	flex-grow: 1;
	border-color: ${COLORS.border};
	&:not(:first-child) {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		margin-left: -1px;
	}
	&:not(:last-child) {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}
`;

function TogglerItem<T>({ option, active, onClick }: TogglerOptionProps<T>) {
	const handleClick = useCallback(() => {
		onClick(option.id);
	}, [option, onClick]);

	return (
		<TogglerButton accent={active} onClick={handleClick}>
			{option.name}
		</TogglerButton>
	);
}

export function Toggler<T>({ options, value, onChange }: TogglerProps<T>) {
	const onOptionClick = (id: T) => {
		onChange(id);
	};

	return (
		<TogglerWrapper>
			{options.map((option: TogglerOption<T>) => (
				<TogglerItem
					key={`${option.id}`}
					option={option}
					active={option.id === value}
					onClick={onOptionClick}
				/>
			))}
		</TogglerWrapper>
	);
}
