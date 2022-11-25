import { ReactNode } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../style/colors';
import { SPACING_MD, SPACING_XXS } from '../../style/spacing';

interface FormGroupProps {
	id?: string;
	label?: string;
	children: ReactNode;
}

const WrapperView = styled.div`
	&:not(:last-child) {
		margin-bottom: ${SPACING_MD}px;
	}
`;

const LabelView = styled.label`
	display: inline-block;
	color: ${COLORS.serviceText};
	margin-bottom: ${SPACING_XXS}px;
`;

function FormGroup({ id, label, children }: FormGroupProps) {
	return (
		<WrapperView>
			{label && (
				<div>
					<LabelView htmlFor={id}>{label}</LabelView>
				</div>
			)}

			{children}
		</WrapperView>
	);
}

export type { FormGroupProps };
export { FormGroup };
