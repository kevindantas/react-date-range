import React from 'react';
import styled from 'styled-components';
import PickerDocs from './pages/pickers';
import Sidebar from './components/Sidebar';
import GlobalStyle from './styles/global';

const Wrapper = styled.div`
  display: grid;
  grid-template: 'sidebar content';
  grid-gap: 2rem;
  padding-right: 2rem;
`;

const Content = styled.div`
  grid-area: content;

  > div {
    display: grid;
    width: 98%;
  }
`;

function Docs() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Wrapper>
        <Sidebar />
        <Content>
          <PickerDocs />
        </Content>
      </Wrapper>
    </React.Fragment>
  );
}

export default Docs;
