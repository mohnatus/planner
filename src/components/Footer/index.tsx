import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { COLORS } from '../../ui/colors';
import { FOOTER_HEIGHT } from '../../ui/sizes';

import { Container } from '../../containers/Container';

const WrapperView = styled.footer`
	height: ${FOOTER_HEIGHT}px;
	background: ${COLORS.accent.color};
	color: ${COLORS.accent.contrast};

	.container {
		height: 100%;
	}
`;

const MenuView = styled.ul`
	display: flex;
	justify-content: space-between;
	height: 100%;
`;

const MenuItemView = styled.li`
	flex-grow: 1;
	min-width: 40px;
	display: flex;
	align-items: center;
	justify-content: center;

	&.add {
		min-width: 70px;
	}

	a {
		color: inherit;
	}
`;

function Footer() {
	return (
		<WrapperView>
			<Container className='container'>
				<MenuView>
					<MenuItemView></MenuItemView>
					<MenuItemView>
						<Link to='/calendar'>Calendar</Link>
					</MenuItemView>
					<MenuItemView className='add'>
						<Link to='/routine/new'>Add routine</Link>
					</MenuItemView>
					<MenuItemView>
						<Link to='/routines'>Routines List</Link>
					</MenuItemView>
					<MenuItemView></MenuItemView>
				</MenuView>
			</Container>
		</WrapperView>
	);
}

export { Footer };
