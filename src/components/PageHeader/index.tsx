import styled from 'styled-components';

import { COLORS } from '../../ui/colors';
import { HEADER_HEIGHT } from '../../ui/sizes';
import { FONT_SIZE } from '../../ui/typography';

import { Container } from '../../containers/Container';

interface PageHeaderProps {
	title: string;
}

const WrapperView = styled.div`
	margin-bottom: ${HEADER_HEIGHT}px;
`;

const HeaderView = styled.header`
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

const TitleView = styled.h1`
	font-size: ${FONT_SIZE.header};
	font-weight: 700;
	position: relative;
	height: 100%;
	display: flex;
	align-items: center;
`;

function PageHeader({ title }: PageHeaderProps) {
	return (
		<WrapperView>
			<HeaderView>
				<Container className='container'>
					<TitleView>{title}</TitleView>
				</Container>
			</HeaderView>
		</WrapperView>
	);
}

export type { PageHeaderProps };
export { PageHeader };
