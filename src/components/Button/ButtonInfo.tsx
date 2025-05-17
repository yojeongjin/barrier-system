import styled from 'styled-components';
import dayjs from 'dayjs';
// icons
// icon
import { FaExclamationCircle } from 'react-icons/fa';
// type
import { BtnType } from '@/type/buttonType';

interface ButtonInfoProps {
  btnInfo: BtnType;
}

const ButtonInfo = ({ btnInfo }: ButtonInfoProps) => {
  return (
    <BtnInfoSection>
      <InfoNoti>
        <ExclamationIcon />
        {btnInfo.parking_status === 'CREATED' ||
        btnInfo.parking_status === 'UNUSED'
          ? '주차권 발급 후 입차 가능 시간은 10분입니다.'
          : '결제 이후 출차하기 버튼이 활성화됩니다.'}
      </InfoNoti>

      <InfoTable>
        <TableHeader>
          <TableRow>
            <TableColumn></TableColumn>
            <TableColumn></TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <SubjectCell>주차장명</SubjectCell>
            <ContentCell>{btnInfo.base_name}</ContentCell>
          </TableRow>
          <TableRow>
            <SubjectCell>차량번호</SubjectCell>
            <ContentCell>{btnInfo.car_number}</ContentCell>
          </TableRow>
          <TableRow>
            <SubjectCell>시작일시</SubjectCell>
            <ContentCell>
              {dayjs(btnInfo.use_from).format('YYYY-MM-DD HH:mm')}
            </ContentCell>
          </TableRow>
        </TableBody>
      </InfoTable>
    </BtnInfoSection>
  );
};

export default ButtonInfo;

const BtnInfoSection = styled.section``;

const ExclamationIcon = styled(FaExclamationCircle)`
  margin-right: 4px;
`;

const InfoNoti = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #136bb9;
`;

const InfoTable = styled.table`
  width: 100%;
  margin: 16px 0;
`;

const TableHeader = styled.thead``;

const TableColumn = styled.th``;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid ${(props) => props.theme.table_line03};
`;

const ContentCell = styled.td`
  widht: 70%;
  padding: 16px 12px;
  color: ${(props) => props.theme.primary_dgray};
  line-height: 1.4;
  // border-bottom: 1px solid ${(props) => props.theme.table_line02};
`;

const SubjectCell = styled(ContentCell)`
  background-color: #fafafa;
  widht: 30%;
  text-align: center;
  color: ${(props) => props.theme.gray_01};
`;
