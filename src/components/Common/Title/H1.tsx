import styled from 'styled-components';

interface H1Props {
  children: React.ReactNode;
}

const H1: React.FC<H1Props> = ({ children }) => {
  return <H1Base>{children}</H1Base>;
};

export default H1;

const H1Base = styled.h1`
  display: flex;
  align-items: center;
  font-size: 22px;
  font-weight: 600;
`;
