import styled from 'styled-components';
import { COLORS } from '../../style/colors';
import { RADIUS_LG } from '../../style/decor';
import { SPACING_MD, SPACING_SM, SPACING_XS } from '../../style/spacing';

const Card = styled.div`
  background-color: ${COLORS.controlsBackground};
  padding: ${SPACING_MD}px ${SPACING_XS}px ${SPACING_XS}px;
  border-radius: ${RADIUS_LG}px;
`;

type CardContentProps = {
	bordered?: boolean;
};

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

export { Card, CardContent, CardTitle };
