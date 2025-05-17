import styled from 'styled-components';

interface H4Props {
  children: React.ReactNode;
}

const H4: React.FC<H4Props> = ({ children }) => {
  return <H4Base>{children}</H4Base>;
};

export default H4;

const H4Base = styled.h4`
  font-size: 16px;
  font-weight: 500;
`;
