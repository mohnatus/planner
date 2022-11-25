import styled from 'styled-components';

import { COLORS } from '../../style/colors';
import { SPACING_SM } from '../../style/spacing';

const ServiceText = styled.div`
	color: ${COLORS.serviceText};
	padding-top: ${SPACING_SM}px;
	padding-bottom: ${SPACING_SM}px;
	display: flex;
	justify-content: center;
`;

export { ServiceText };
