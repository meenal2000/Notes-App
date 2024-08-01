import React, { useState } from 'react';
import GroupList from './components/GroupList';
import NoteList from './components/NoteList';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const App = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  return (
    <AppContainer>
      <GroupList setSelectedGroup={setSelectedGroup} />
      <NoteList selectedGroup={selectedGroup} />
    </AppContainer>
  );
};

export default App;
