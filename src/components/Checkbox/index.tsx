import { FormEvent, RefObject, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../style/colors';
import { RADIUS_SM } from '../../style/decor';
import { SPACING_SM } from '../../style/spacing';

export interface CheckboxProps {
	ref?: RefObject<HTMLInputElement>;
	label: string;
	checked: boolean;
	onChange: (newChecked: boolean) => void;
}

const Wrapper = styled.label`
	display: flex;
	align-items: center;
	cursor: pointer;
`;

const Control = styled.input`
	visibility: hidden;
	position: absolute;
	width: 1px;
	height: 1px;
	margin: -1px;
	border: 0;
	padding: 0;
	white-space: nowrap;
	clip-path: inset(100%);
	clip: rect(0 0 0 0);
	overflow: hidden;
`;

const Box = styled.div`
	width: 25px;
	height: 25px;
	border: 1px solid ${COLORS.border};
	border-radius: ${RADIUS_SM}px;
	background: ${COLORS.controls.color};
	margin-right: ${SPACING_SM}px;

	input:checked ~ & {
		border-color: ${COLORS.accent.color};
	}
`;

const Label = styled.span`
	color: ${COLORS.serviceText};

	input:checked ~ & {
		color: ${COLORS.text};
	}
`;

let unique = 1;

export function Checkbox({ ref, label, checked, onChange }: CheckboxProps) {
	const id = useRef<string>(`checkbox-${unique++}`);
	const handleChange = useCallback(
		(e: FormEvent<HTMLInputElement>) => {
			if (typeof onChange === 'function')
				onChange(e.currentTarget.checked);
		},
		[onChange]
	);

	return (
		<Wrapper>
			<Control
				ref={ref}
				type='checkbox'
				checked={checked}
				onChange={handleChange}
			/>
			<Box />
			<Label>{label}</Label>
		</Wrapper>
	);
}
