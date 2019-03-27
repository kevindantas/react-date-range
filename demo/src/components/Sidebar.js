import React from 'react';
import styled from 'styled-components';
import Alfredo from './Alfredo';

const Aside = styled.aside`
  background: #fff;
  grid-area: sidebar;
  width: 20vw;
  height: 100vh;
  position: sticky;
  flex-basis: 20% 1 1;
  left: 0;
  top: 0;
  box-shadow: 5px 0 10px rgba(0, 0, 0, 0.1);
`;

const List = styled.ul`
  padding: 0;
`;

const ListItem = styled.li`
  width: 100%;
  list-style: none;
  padding: 8px 24px;
  font-size: 18px;
`;

const ListLink = styled.a`
  text-decoration: none;
  color: #333;
  font-weight: 400;
`;

function Sidebar() {
  return (
    <Aside>
      <Alfredo width="50%" height="140" />
      <List>
        <ListItem>
          <ListLink href="#date-range">Date Range</ListLink>
        </ListItem>

        <ListItem>
          <ListLink href="#date-range-picker">Date Range Picker</ListLink>
        </ListItem>

        <ListItem>
          <ListLink href="#defined-ranges">Defined Range</ListLink>
        </ListItem>
      </List>
    </Aside>
  );
}

export default Sidebar;
