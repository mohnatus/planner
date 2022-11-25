import { FormEvent, RefObject, useCallback } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../style/colors';
import { RADIUS_SM } from '../../style/decor';
import { CONTROL_HEIGHT } from '../../style/sizes';
import { SPACING_SM, SPACING_XXS } from '../../style/spacing';

interface InputProps {
	ref?: RefObject<HTMLInputElement>;
	id?: string;
	type?: string;
	value: string;
	onChange: (newValue: string) => void;
}

const InputWrapper = styled.div``;

const InputControl = styled.input`
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
		<InputWrapper>
			<InputControl
				ref={ref}
				type={type}
				id={id}
				value={value}
				onChange={handleChange}
			/>
		</InputWrapper>
	);
}

export type { InputProps };
export { Input };
