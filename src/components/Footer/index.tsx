import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from '../../style/colors';
import { FOOTER_HEIGHT } from '../../style/sizes';
import { Container } from '../Container';

const FooterWrapper = styled.footer`
	height: ${FOOTER_HEIGHT}px;
	background: ${COLORS.accent.color};
	color: ${COLORS.accent.contrast};

  .container {
    height: 100%;
  }
`;

const FooterMenu = styled.ul`
	display: flex;
	justify-content: space-between;
  height: 100%;
`;

const FooterMenuItem = styled.li`
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

export function Footer() {
	return (
		<FooterWrapper>
			<Container className="container">
				<FooterMenu>
					<FooterMenuItem></FooterMenuItem>
					<FooterMenuItem>
						<Link to='/calendar'>Calendar</Link>
					</FooterMenuItem>
					<FooterMenuItem className='add'>
						<Link to='/task/new'>Add task</Link>
					</FooterMenuItem>
					<FooterMenuItem>
						<Link to='/tasks'>Tasks List</Link>
					</FooterMenuItem>
					<FooterMenuItem></FooterMenuItem>
				</FooterMenu>
			</Container>
		</FooterWrapper>
	);
}
