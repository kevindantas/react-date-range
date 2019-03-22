import styled, { css } from 'styled-components';

export const DayNumber = styled('span')`
  && {
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
  }

  span {
    color: #1d2429;
  }
`;

const rangeStart = css`
  border-top-left-radius: 1.333em;
  border-bottom-left-radius: 1.333em;
  border-left-width: 1px;
  left: 2px;
`;

const rangeEnd = css`
  border-top-right-radius: 1.333em;
  border-bottom-right-radius: 1.333em;
  border-right-width: 1px;
  right: 2px;
`;

export const InRange = styled('span')`
  background: currentColor;
  position: absolute;
  top: 5px;
  left: 0;
  right: 0;
  bottom: 5px;

  ${({ isEndEdge }) => (isEndEdge ? rangeEnd : '')};
  ${({ isStartEdge }) => (isStartEdge ? rangeStart : '')};

  & ~ ${DayNumber} {
    span {
      color: #fff;
    }

    &:after {
      background: #fff;
    }
  }
`;

export const inPreview = css`
  border: 0px solid currentColor;
  border-top-width: 1px;
  border-bottom-width: 1px;
`;

export const PreviewRange = styled('span')`
  & {
    position: absolute;
    top: 3px;
    left: 0px;
    right: 0px;
    bottom: 3px;
    z-index: 1;
    pointer-events: none;
    border-color: currentColor;
  }

  ${({ isInRange }) => (isInRange ? inPreview : '')};
  ${({ isEndEdge }) => (isEndEdge ? rangeEnd : '')};
  ${({ isStartEdge }) => (isStartEdge ? rangeStart : '')};
`;

/**
 * Week "edges"
 */
const dayRangeStart = css`
  ${InRange}, ${PreviewRange} {
    ${rangeStart};
  }

  ${PreviewRange} {
    left: 0;
  }
`;

const dayRangeEnd = css`
  ${InRange}, ${PreviewRange} {
    ${rangeEnd};
  }

  ${PreviewRange} {
    right: 0;
  }
`;

// Day States
const dayDisabled = css`
  cursor: not-allowed;
  background: rgb(248, 248, 248);

  ${DayNumber} span {
    color: #aeb9bf;
  }

  ${InRange} {
    background-color: rgb(248, 248, 248);
  }

  ${InRange}, ${PreviewRange}, .rdrSelected {
    filter: grayscale(100%) opacity(60%);
  }
`;

const dayPassive = css`
  pointer-events: none;
  && ${DayNumber} span {
    color: #d5dce0;
  }

  ${InRange}, ${PreviewRange}, .rdrSelected {
    display: none;
  }
`;

const dayToday = css`
  ${DayNumber} {
    font-weight: 500;
    &:after {
      content: '';
      position: absolute;
      bottom: 4px;
      left: 50%;
      transform: translate(-50%, 0);
      width: 18px;
      height: 2px;
      border-radius: 2px;
      background: #3d91ff;
    }
  }
`;

// Get day variations
const isToday = ({ isToday }) => (isToday ? dayToday : '');
// const isActive = ({ isActive }) => (isActive ? dayActive : '');
const isDisabled = ({ disabled }) => (disabled ? dayDisabled : '');
const isPassive = ({ isPassive }) => (isPassive ? dayPassive : '');
const isRangeEnd = ({ isEndOfWeek, isEndOfMonth }) =>
  isEndOfWeek || isEndOfMonth ? dayRangeEnd : '';
const isRangeStart = ({ isStartOfMonth, isStartOfWeek }) =>
  isStartOfWeek || isStartOfMonth ? dayRangeStart : '';

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

  ${isRangeEnd};
  ${isRangeStart};
  ${isDisabled};
  ${isToday};
  ${isPassive};
`;
