import styled from 'styled-components';

interface ApplyBtnProps {
  children: React.ReactNode;
  onClick: () => void;
  color?: string;
  disabled?: boolean;
}

const ApplyBtn: React.FC<ApplyBtnProps> = ({
  children,
  onClick,
  color,
  disabled,
}) => {
  return (
    <Btn color={color} onClick={onClick} disabled={disabled}>
      {children}
    </Btn>
  );
};

export default ApplyBtn;

const Btn = styled.button<{ color?: string; margin?: string }>`
  background-color: ${(props) => (props.color ? props.color : '#02ca2d')};
  width: 100%;
  height: 56px;
  border-radius: 8px;
  font-size: 16px;
  // font-weight: 500;
  color: #fff;
  &:disabled {
    background-color: ${(props) => props.theme.primary_04};
    cursor: default;
  }
`;
