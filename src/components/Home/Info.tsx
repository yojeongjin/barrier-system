import styled from 'styled-components';
// type
import { PlaceDataProps } from '@/type/placeType';
// component
import H4 from '../Common/Title/H4';

const Info = ({ placeInfo }: PlaceDataProps) => {
  return (
    <InfoSection>
      <H4>운영정보</H4>
      {/* 운영정보 */}
      <InfoMenu>
        <InfoItem>
          <InfoSubject>이용요금</InfoSubject>
          <InfoContent>
            {placeInfo.base_time}분 {placeInfo.base_fee}원
          </InfoContent>
        </InfoItem>
      </InfoMenu>
    </InfoSection>
  );
};

export default Info;

const InfoSection = styled.section`
  background-color: #fff;
  margin-top: 12px;
  padding: 16px;
  line-height: 1.8;
`;

const InfoMenu = styled.ul`
  margin-top: 12px;
`;

const InfoItem = styled.li`
  display: flex;
`;

const InfoSubject = styled.h5`
  // color: ${(props) => props.theme.gray_01};
  width: 22%;
`;

const InfoContent = styled.span`
  color: ${(props) => props.theme.gray_01};
`;

const SupportIcon = styled.i`
  font-family: TossFace;
`;

const SupportBox = styled.div`
  border-top: 1px solid ${(props) => props.theme.gray_05};
  margin-top: 12px;
  padding-top: 12px;
  text-align: center;
  color: ${(props) => props.theme.gray_02};
`;
