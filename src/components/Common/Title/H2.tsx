import styled from 'styled-components';

interface H2Props {
  children: React.ReactNode;
}

const H2: React.FC<H2Props> = ({ children }) => {
  return <H2Base>{children}</H2Base>;
};

export default H2;

const H2Base = styled.h2`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
`;
