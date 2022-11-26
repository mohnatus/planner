import { FormEvent, RefObject, useCallback } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../ui/colors';
import { RADIUS_SM } from '../../ui/decor';
import { CONTROL_HEIGHT } from '../../ui/sizes';
import { SPACING_SM, SPACING_XXS } from '../../ui/spacing';

interface InputProps {
	ref?: RefObject<HTMLInputElement>;
	id?: string;
	type?: string;
	value: string;
	onChange: (newValue: string) => void;
}

const WrapperView = styled.div``;

const InputView = styled.input`
	display: block;
	width: 100%;
	height: ${CONTROL_HEIGHT}px;
	background-color: ${COLORS.controls.color};
	color: ${COLORS.controls.contrast};
	border: 1px solid ${COLORS.border};
	border-radius: ${RADIUS_SM}px;
	padding: ${SPACING_XXS}px ${SPACING_SM}px;

	&::placeholder {
		color: ${COLORS.placeholder};
	}

	&:focus {
		outline: none;
		border-color: ${COLORS.focus};
	}
`;

function Input({ ref, value, onChange, id, type = 'text' }: InputProps) {
	const handleChange = useCallback(
		(e: FormEvent<HTMLInputElement>) => {
			if (typeof onChange === 'function') onChange(e.currentTarget.value);
		},
		[onChange]
	);

	return (
		<WrapperView>
			<InputView
				ref={ref}
				type={type}
				id={id}
				value={value}
				onChange={handleChange}
			/>
		</WrapperView>
	);
}

export type { InputProps };
export { Input };
