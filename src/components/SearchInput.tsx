import React from 'react';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #F5F5F5;
  border: 1px solid #D9D9D9;
  border-radius: 8px;
  padding: 10px;
  width: 300px;
`;

const SearchIconWrapper = styled.div`
  color: #A3A3A3;
  margin-right: 10px;
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 16px;
  flex-grow: 1;
`;

interface SearchInputProps {
  onSearch: (term: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  return (
    <InputContainer>
      
      <StyledInput
        type="text"
        placeholder="Pesquisar"
        onChange={(e) => onSearch(e.target.value)}
      />
      <SearchIconWrapper>
        <FiSearch size={20} /> 
      </SearchIconWrapper>
    </InputContainer>
  );
};

export default SearchInput;


