import styled from 'styled-components';

import { COLORS } from '../../style/colors';

import { DateInput, DateInputProps } from '../../components/DateInput';

interface DateGroupProps extends DateInputProps {
	label: string;
}

const WrapperView = styled.div`
	display: flex;
	align-items: center;
`;

const LabelView = styled.label`
	flex-grow: 1;
	color: ${COLORS.serviceText};
`;

function DateGroup({ label, ...props }: DateGroupProps) {
	return (
		<WrapperView>
			<LabelView>{label}</LabelView>

			<DateInput {...props} />
		</WrapperView>
	);
}

export type { DateGroupProps };
export { DateGroup };
