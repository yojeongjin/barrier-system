import React, { useState, useEffect } from 'react';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

import styled from 'styled-components';
import { BtnType } from '@/type/buttonType';

interface ButtonProgressProps {
  btnInfo: BtnType;
  fee: number;
  setFee: React.Dispatch<React.SetStateAction<number>>;
}

const ButtonProgress = ({ btnInfo, fee, setFee }: ButtonProgressProps) => {
  const useFrom = dayjs(btnInfo.use_from);
  const [usedMinutes, setUsedMinutes] = useState(() =>
    dayjs().diff(useFrom, 'minute')
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setUsedMinutes((prev) => prev + 1);
    }, 60 * 1000); // 매 1분마다 증가

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const total = Math.ceil(usedMinutes / 10) * 10;
    const totalHour = Math.floor(total / 60);
    const totalMinute = total % 60;

    let fee = 0;

    if (totalHour === 0 && totalMinute <= 10) {
      fee = 0;
    } else {
      const chargeableTime = total - 10;
      fee = (chargeableTime / 10) * 100 + 100;

      if (totalHour < 24 && fee > 2400) {
        fee = 2400;
      } else if (totalHour >= 24) {
        fee = 2400 * Math.ceil(totalHour / 24);
      }
    }

    if (btnInfo.reduction_type === 'GENERAL') {
      setFee(fee);
    } else {
      setFee(Math.ceil(fee / 2));
    }
  }, [usedMinutes, btnInfo.reduction_type]);

  const renderTime = () => {
    const hours = Math.floor(usedMinutes / 60);
    const minutes = usedMinutes % 60;

    if (hours === 0) {
      return <ProgressSpan isSize>{minutes}분</ProgressSpan>;
    }

    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      const remainHours = hours % 24;
      return (
        <ProgressSpan isSize={false}>
          {days}일<br />
          {remainHours}시간 {minutes}분
        </ProgressSpan>
      );
    }

    return (
      <ProgressSpan isSize={false}>
        {hours}시간 {minutes}분
      </ProgressSpan>
    );
  };

  const progressFeeText = () => {
    const displayFee =
      btnInfo.reduction_type === 'GENERAL'
        ? feeFormat(fee)
        : feeFormat(Math.ceil(fee / 2));

    return (
      <ProgressP>
        예상 결제 금액 <br />
        {displayFee}원
      </ProgressP>
    );
  };

  const feeFormat = (value: number) =>
    value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const isActive =
    btnInfo.parking_status !== 'CREATED' && btnInfo.parking_status !== 'UNUSED';

  return (
    <ProgressSection>
      <ProgressBase>
        <CircularProgressbarWithChildren
          value={isActive ? usedMinutes : 0}
          styles={buildStyles({
            pathColor: '#02ca2d',
            trailColor: '#e5e7eb',
          })}
          strokeWidth={6}
          maxValue={usedMinutes > 360 ? 1440 : 360}
        >
          {isActive ? renderTime() : <ProgressSpan isSize>0분</ProgressSpan>}
          <ProgressPWrapper>
            {isActive ? (
              progressFeeText()
            ) : (
              <ProgressP>
                예상 결제 금액 <br />
                0원
              </ProgressP>
            )}
          </ProgressPWrapper>
        </CircularProgressbarWithChildren>
      </ProgressBase>
    </ProgressSection>
  );
};

export default ButtonProgress;

const ProgressSection = styled.section`
  height: calc(var(--vh, 1vh) * 100 - 350px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProgressBase = styled.div`
  width: 58%;
  margin: 0 auto;
`;

const ProgressSpan = styled.span<{ isSize: boolean }>`
  position: absolute;
  top: ${(props) => (props.isSize ? '45%' : '47%')};
  left: 50%;
  transform: translate(-50%, -60%);
  font-size: ${(props) => (props.isSize ? '28px' : '21px')};
  font-weight: 600;
  text-align: center;
  line-height: 1.3;
`;

const ProgressPWrapper = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
`;

const ProgressP = styled.p`
  color: ${(props) => props.theme.gray_02};
  font-size: 13px;
  font-weight: 300;
  line-height: 1.4;
`;
