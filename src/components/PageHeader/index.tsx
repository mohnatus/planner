import styled from 'styled-components';

import { COLORS } from '../../style/colors';
import { HEADER_HEIGHT } from '../../style/sizes';
import { FONT_SIZE } from '../../style/typography';

import { Container } from '../../containers/Container';

interface PageHeaderProps {
	title: string;
}

const HeaderWrapper = styled.div`
	margin-bottom: ${HEADER_HEIGHT}px;
`;

const Header = styled.header`
	position: fixed;

	top: 0;
	left: 0;
	right: 0;
	height: ${HEADER_HEIGHT}px;
	color: ${COLORS.accent.contrast};

	&:before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: ${COLORS.accent.color};
		opacity: 0.8;
	}

	.container {
		height: 100%;
	}
`;

const Title = styled.h1`
	font-size: ${FONT_SIZE.header};
	font-weight: 700;
	position: relative;
	height: 100%;
	display: flex;
	align-items: center;
`;

function PageHeader({ title }: PageHeaderProps) {
	return (
		<HeaderWrapper>
			<Header>
				<Container className='container'>
					<Title>{title}</Title>
				</Container>
			</Header>
		</HeaderWrapper>
	);
}

export type { PageHeaderProps };
export { PageHeader };
