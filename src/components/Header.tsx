import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 40px;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo src={`${process.env.PUBLIC_URL}/Logo.png`} alt="BeTalent Logo" />
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;

