import { ReactNode } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../style/colors';
import { SPACING_MD, SPACING_XL, SPACING_XXS } from '../../style/spacing';

export interface FormGroupProps {
	id?: string;
	label?: string;
	children: ReactNode;
}

const FormGroupWrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: ${SPACING_MD}px;
  }
`

const Label = styled.label`
  display: inline-block;
	color: ${COLORS.serviceText};
	margin-bottom: ${SPACING_XXS}px;
`;

export function FormGroup({ id, label, children }: FormGroupProps) {
	return (
		<FormGroupWrapper>
			{label && (
				<div>
					<Label htmlFor={id}>{label}</Label>
				</div>
			)}

			{children}
		</FormGroupWrapper>
	);
}
