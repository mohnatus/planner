import styled, {createGlobalStyle } from 'styled-components';
import { FONT_FAMILY, FONT_SIZE } from './ui/typography';
import { COLORS } from './ui/colors';
import { SPACING_MD } from './ui/spacing';

export const GlobalStyle = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	html {
		font-size: 16px;
	}
	body {
		font-size: ${FONT_SIZE.main};
		font-family: ${FONT_FAMILY.main};
		color: ${COLORS.text};
		background-color: ${COLORS.background};
    overflow: hidden;
	}
  a {
    text-decoration: none;
  }
`

export const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

`

export const ContentWrapper = styled.div`
  flex-grow: 1;
  overflow: auto;
  padding-top: ${SPACING_MD}px;
  padding-bottom: ${SPACING_MD}px;
`

export const FooterWrapper = styled.div`
  flex-shrink: 0;
`