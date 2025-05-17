import styled from 'styled-components';
// type
import { PlaceDataProps, PlaceType } from '@/type/placeType';
// component
import H2 from '../Common/Title/H2';

interface HomeProps {
  placeInfo: PlaceType;
  getOTK: () => void;
}

const HomeComponent = ({ placeInfo, getOTK }: HomeProps) => {
  return (
    <HomeBase>
      {/* 주차장 정보 */}
      <PlaceSection>
        <InfoContainer>
          {/* 주차장 사진 */}
          <PlaceImg src={placeInfo.base_image} alt="주차장 이미지" />
          {/* 주차장명 및 주소 */}
          <AddressBox>
            <H2>{placeInfo.base_name}</H2>
            <PlaceAddress>{placeInfo.base_address}</PlaceAddress>
          </AddressBox>
        </InfoContainer>
      </PlaceSection>
    </HomeBase>
  );
};

export default HomeComponent;

const HomeBase = styled.div``;

// 주차장 설명
const PlaceSection = styled.section`
  background-color: #fff;
  padding: 24px 16px;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PlaceImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const AddressBox = styled.div`
  width: calc(100% - 125px);

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  // border: 1px solid black;
`;

const PlaceAddress = styled.p`
  margin-top: 6px;
  letter-spacing: -0.3px;
  color: ${(props) => props.theme.gray_02};
`;
