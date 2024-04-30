import { useNavigate } from 'react-router-dom';
import { HiOutlineUser } from 'react-icons/hi2';
import styled from 'styled-components';
import Logout from '../features/authentication/Logout';
import ButtonIcon from './ButtonIcon';
import DarkModeToggle from './DarkModeToggle';

const StyleHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

const HeaderMenu = () => {
  const navigate = useNavigate();

  return (
    <StyleHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate('/account')}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyleHeaderMenu>
  );
};

export default HeaderMenu;
