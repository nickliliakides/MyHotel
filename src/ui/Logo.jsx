import styled from 'styled-components';
import { useDarkMode } from '../context/DarkModeContext';

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 15.6rem;
  width: auto;
  border-radius: 50%;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();
  const src = isDarkMode ? '/logo_transparent.png' : '/logo.png';
  return (
    <StyledLogo>
      <Img src={src} alt='Logo' />
    </StyledLogo>
  );
}

export default Logo;
