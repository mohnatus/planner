import styled from 'styled-components';

import { COLORS } from '../../ui/colors';
import { HEADER_HEIGHT } from '../../ui/sizes';
import { FONT_SIZE } from '../../ui/typography';

import { Container } from '../../containers/Container';
import { ReactNode } from 'react';

interface PageHeaderProps {
	title?: string;
	children?: ReactNode;
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

const PageHeaderTitle = styled.div`
	font-size: ${FONT_SIZE.header};
	font-weight: 700;
	position: relative;
	height: 100%;
	display: flex;
	align-items: center;
`;

function PageHeader({ title, children }: PageHeaderProps) {
	return (
		<WrapperView>
			<HeaderView>
				<Container className='container'>

						<PageHeaderTitle>{title ? title : children}</PageHeaderTitle>

				</Container>
			</HeaderView>
		</WrapperView>
	);
}

export type { PageHeaderProps };
export { PageHeader, PageHeaderTitle };
