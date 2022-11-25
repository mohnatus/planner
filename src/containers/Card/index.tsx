import styled from 'styled-components';

import { COLORS } from '../../style/colors';
import { RADIUS_LG } from '../../style/decor';
import { SPACING_MD, SPACING_SM, SPACING_XS } from '../../style/spacing';

interface CardContentProps {
	bordered?: boolean;
}

const Card = styled.div`
	background-color: ${COLORS.controls.color};
	color: ${COLORS.controls.contrast};
	padding: ${SPACING_MD}px ${SPACING_XS}px ${SPACING_XS}px;
	border-radius: ${RADIUS_LG}px;
`;

const CardContent = styled.div<CardContentProps>`
	margin-top: ${SPACING_SM}px;
	margin-bottom: ${SPACING_SM}px;
	${(props) =>
		props.bordered &&
		`
  border-top: 1px solid ${COLORS.border};
  padding-top: ${SPACING_SM}px;
  `};
`;

const CardTitle = styled.span`
	font-weight: bold;
`;

export type { CardContentProps };
export { Card, CardContent, CardTitle };
