import React, { useState } from 'react';
import styled from 'styled-components';
import Table from './components/Table';
import SearchInput from './components/SearchInput';
import Header from './components/Header';

const AppContainer = styled.div`
  max-width: 1024px;
  margin:  auto;
  padding: 10px;
`;

const Title = styled.h1`
font-size: 24px;
  color: #333;
  margin: 0;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  margin-bottom: 20px; 
`;

const SearchContainer = styled.div`
   width: 300px; 
   padding-top: 20px;
`;

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <>
    <Header/>
    <AppContainer>
      <HeaderRow>
      <Title>Funcionários</Title>
      <SearchContainer>
      <SearchInput onSearch={handleSearch} />
      </SearchContainer>
      </HeaderRow>
      <Table searchTerm={searchTerm} />
    </AppContainer>
    </>
  );
};

export default App;

