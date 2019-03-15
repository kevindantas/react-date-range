import styled, { css } from 'styled-components';

export const DayNumber = styled('span')`
  outline: 0;
  font-weight: 300;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  top: 5px;
  bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    color: #1d2429;
  }
`;

// Day States
const dayDisabled = css`
  background-color: rgb(248, 248, 248);
  cursor: not-allowed;

  .rdrDayNumber span {
    color: #aeb9bf;
  }
  .rdrInRange,
  .rdrStartEdge,
  .rdrEndEdge,
  .rdrSelected,
  .rdrDayStartPreview,
  .rdrDayInPreview,
  .rdrDayEndPreview {
    filter: grayscale(100%) opacity(60%);
  }
`;

// Day Cell
export const Day = styled('button')`
  box-sizing: inherit;
  width: calc(100% / 7);
  position: relative;
  font: inherit;
  cursor: pointer;
  background: transparent;
  user-select: none;
  border: 0;
  padding: 0;
  line-height: 3em;
  height: 3em;
  text-align: center;
  color: #1d2429;
  &:focus {
    outline: 0;
  }

  ${props => (props.disabled ? dayDisabled : '')};
`;
