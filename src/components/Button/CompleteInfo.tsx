import styled from 'styled-components';
import dayjs from 'dayjs';
// type
import { BtnType } from '@/type/buttonType';
import H1 from '../Common/Title/H1';
import H4 from '../Common/Title/H4';

interface ButtonInfoProps {
  btnInfo: BtnType;
  doExit: () => void;
}

const CompleteInfo = ({ btnInfo, doExit }: ButtonInfoProps) => {
  return (
    <BtnInfoSection>
      <H1>주차장 이용이 완료되었습니다.</H1>
      <CompleteCautionP>
        <CautionStrong>
          {dayjs(btnInfo.pay_to).add(30, 'minute').format('HH시 mm분')}
        </CautionStrong>
        까지 출차해주세요.
      </CompleteCautionP>
      <InfoMenu>
        <H4>{btnInfo.base_name}</H4>
        <InfoItem>
          <InfoSubject>차량번호</InfoSubject>
          <InfoContent>{btnInfo.car_number}</InfoContent>
        </InfoItem>
        <InfoItem>
          <InfoSubject>이용일시</InfoSubject>
          <InfoContent>
            {dayjs(btnInfo.parkingitem_from).format('YYYY-MM-DD HH:mm')}
            <br></br>~{' '}
            {dayjs(btnInfo.parkingitem_to).format('YYYY-MM-DD HH:mm')}
          </InfoContent>
        </InfoItem>
        <InfoItem>
          <InfoSubject>결제일시</InfoSubject>
          <InfoContent>
            {dayjs(btnInfo.pay_to).format('YYYY-MM-DD HH:mm')}
          </InfoContent>
        </InfoItem>
      </InfoMenu>

      <BtnBox>
        <CautionMenu>
          <CautionH4>유의사항</CautionH4>
          <Caution>
            결제시간으로부터
            <CautionStrong> 30분 이내</CautionStrong> 출차해야 초과요금이
            발생하지 않습니다.
          </Caution>
          <Caution>
            30분 경과 후 출차 시 최초 결제했던 수단으로{' '}
            <CautionStrong>초과요금 결제가 진행</CautionStrong> 됩니다.
          </Caution>
        </CautionMenu>
        <ApplyBtn onClick={doExit}>출차하기</ApplyBtn>
      </BtnBox>
    </BtnInfoSection>
  );
};

export default CompleteInfo;

const BtnInfoSection = styled.section`
  display: flex;
  align-items: center;
  padding-top: 24px;
  flex-direction: column;
`;

const CompleteCautionP = styled.p`
  margin-top: 12px;
  font-size: 16px;
`;

const CautionStrong = styled.strong`
  color: #136bb9;
  font-weight: 600;
  text-decoration: underline;
`;

const InfoMenu = styled.ul`
  width: 100%;
  margin-top: 24px;
  padding: 16px 16px 20px;
  line-height: 1.6;
  letter-spacing: -0.3px;
  border: 1px solid ${(props) => props.theme.gray_05};
  border-radius: 8px;
`;

const InfoItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin: 6px 0;
  font-size: 14px;
  &:nth-of-type(1) {
    margin-top: 12px;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoSubject = styled.span`
  color: ${(props) => props.theme.gray_01};
`;

const InfoContent = styled.span`
  text-align: right;
`;

//caution

const BtnBox = styled.div``;

const CautionMenu = styled.ul`
  background-color: #fafafa;
  padding: 16px;
  margin: 16px 0;
  line-height: 1.6;
  border-radius: 8px;
`;

const CautionH4 = styled.h4`
  margin-bottom: 4px;
  font-weight: 600;
`;

const Caution = styled.li`
  position: relative;
  padding-left: 8px;
  font-size: 14px;
  &:nth-of-type(1) {
    margin: 5px 0;
  }

  &:before {
    content: '▪︎';
    top: -2px;
    left: -3px;
    position: absolute;
  }
`;

const ApplyBtn = styled.button`
  background-color: ${(props) => props.theme.primary_01};
  width: 100%;
  height: 56px;
  border-radius: 8px;
  color: #fff;
  font-size: 16px;
`;
