import { useRouter } from 'next/router';
import styled from 'styled-components';
// component
import H4 from '../Common/Title/H4';

const ReIssue = () => {
  const router = useRouter();
  return (
    <InfoSection>
      {/* 재발급 */}
      <H4>재발급</H4>
      <NoticeBox>
        <NoticeIcon>📌</NoticeIcon>
        <ReIssueNotice>
          이용 중인 주차권이 보이지 않는다면, 아래 재발급 버튼을 눌러 주차권을
          다시 발급받아주세요.
        </ReIssueNotice>
      </NoticeBox>
      <ReIssueBtn
        onClick={() => {
          return router.push('/history');
        }}
      >
        주차권 재발급
      </ReIssueBtn>
    </InfoSection>
  );
};

export default ReIssue;

const InfoSection = styled.section`
  background-color: #fff;
  margin-top: 12px;
  padding: 16px;
  line-height: 1.3;
`;

// 재발급
const ReIssueBtn = styled.button`
  background-color: #f7fcf2;
  width: 100%;
  height: 50px;
  border: 1px solid #5cc500;
  border-radius: 5px;
  color: ${(props) => props.theme.primary_02};
`;

const NoticeBox = styled.div`
  display: flex;
  margin: 16px 0 12px;
  // font-size: 14px;
  color: ${(props) => props.theme.gray_02};
`;

const NoticeIcon = styled.i`
  font-family: TossFace;
  font-size: 14px;
  margin-right: 4px;
`;

const ReIssueNotice = styled.p``;
