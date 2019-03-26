import styled from 'styled-components';

export const MonthName = styled.div`
  text-align: left;
  font-weight: 600;
  color: #849095;
  padding: 0.833em;
`;

export const WeekDays = styled.div`
  display: flex;
  padding: 0 0.833em;
`;

export const WeekDay = styled.span`
  flex-basis: calc(100% / 7);
  box-sizing: inherit;
  text-align: center;
  font-weight: 400;
  line-height: 2.667em;
  color: rgb(132, 144, 149);
`;

export const Days = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const MonthWrapper = styled.div`
  width: 27.667em;
  padding: 0 0.833em 1.666em 0.833em;
  ${WeekDays} {
    padding: 0;
  }
`;
