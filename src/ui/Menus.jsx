import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';
import { useClickOutside } from '../hooks/useClickOutside';

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenuContext = createContext();

const Menus = ({ children }) => {
  const [openId, setOpenId] = useState(null);
  const [menuPos, setMenuPos] = useState(null);
  const close = () => setOpenId(null);
  const open = setOpenId;

  return (
    <MenuContext.Provider value={{ openId, open, close, menuPos, setMenuPos }}>
      {children}
    </MenuContext.Provider>
  );
};

const Toggle = ({ id }) => {
  const { openId, open, close, setMenuPos } = useContext(MenuContext);

  const handleToggleClick = (e) => {
    e.stopPropagation();
    const rect = e.target.closest('button').getBoundingClientRect();
    setMenuPos({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    if (openId === id) close();
    else open(id);
  };

  return (
    <StyledToggle onClick={handleToggleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
};

const List = ({ children, id }) => {
  const { openId, menuPos, close } = useContext(MenuContext);
  const ref = useClickOutside(close, false);

  if (openId !== id) return null;

  return createPortal(
    <StyledList position={menuPos} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
};

const Button = ({ children, icon, onClick }) => {
  const { close } = useContext(MenuContext);

  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
};

Menus.Menu = StyledMenu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
