import styled, { css } from 'styled-components';
import { WeekDays } from './Month.styled';

const marginHorizontal = css`
  margin: 0 5px;
`;

export const CalendarWrapper = styled.div`
  box-sizing: border-box;
  background: #ffffff;
  display: inline-flex;
  flex-direction: column;
  user-select: none;
  color: #000000;
  font-size: 12px;
`;

export const MonthAndYearWrapper = styled.div`
  box-sizing: inherit;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding-top: 10px;
`;

export const MonthAndYearPickers = styled.span`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 600;
  select {
    appearance: none;
    -webkit-appearance: none;
    border: 0;
    background: transparent;
    padding: 10px 30px 10px 10px;
    border-radius: 4px;
    outline: 0;
    color: #3e484f;
    background: url('data:image/svg+xml;utf8,<svg width="9" height="6" xmlns="http://www.w3.org/2000/svg"><path d="M1.28.24a.712.712 0 0 0-1.06 0 .855.855 0 0 0 0 1.144L4.499 6 8.78 1.382a.855.855 0 0 0 0-1.145.712.712 0 0 0-1.06 0L4.499 3.71 1.28.24z" fill="%230E242F" fill-rule="nonzero" fill-opacity=".369"/></svg>')
      no-repeat;
    background-position: right 8px center;
    cursor: pointer;
    text-align: center;
    &:hover {
      background-color: rgba(0, 0, 0, 0.07);
    }
  }
`;

export const YearPicker = styled.span`
  ${marginHorizontal};
`;

export const MonthPicker = styled.span`
  ${marginHorizontal};
`;

export const DateDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgb(239, 242, 247);
  padding: 0.833em;
`;

const monthsVertical = css`
  flex-direction: column;
`;

const monthsHorizontal = css`
  > div > div > div {
    display: flex;
    flex-direction: row;
  }
`;

export const Months = styled.div`
  display: flex;
  ${props => (props.direction === 'vertical' ? monthsVertical : monthsHorizontal)};
`;

export const InfiniteMonthsWrapper = styled.div`
  position: relative;

  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 10px;
    left: 0;
    z-index: 10;
  }

  &:before {
    background: linear-gradient(rgba(0, 0, 0, 0.08), transparent);
    top: 2.667em; /* WeekDays height */
  }

  &:after {
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.08));
    bottom: 0;
  }
`;

export const InfiniteMonthsList = styled.div`
  position: relative;
  overflow: auto;
  ${props => (props.direction === 'vertical' ? monthsVertical : monthsHorizontal)};

  > div {
    &:before,
    &:after {
      content: '';
      height: 10px;
      width: 100%;
      left: 0;
      position: absolute;
      background: #fff;
      z-index: 11;
    }

    &:before {
      top: 0;
    }

    &:after {
      bottom: 0;
    }
  }
`;

//
// Date Display Item

const dateDisplayItemActive = css`
  border-color: currentColor;
  input {
    color: #7d888d;
  }
`;

export const DateDisplayItem = styled.span`
  flex: 1 1;
  width: 0;
  text-align: center;
  color: inherit;
  border-radius: 4px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 1px 2px 0 rgba(35, 57, 66, 0.21);
  border: 1px solid transparent;

  & + & {
    margin-left: 0.833em;
  }

  input {
    width: 100%;
    height: 2.5em;
    color: #849095;
    background: transparent;
    border: 0px;
    line-height: 2.5em;
    text-align: inherit;
    cursor: pointer;
    &:disabled {
      cursor: default;
    }
  }

  ${props => (props.active ? dateDisplayItemActive : '')};
`;

// Buttons
// TODO: Split into separated file
const prevButton = css`
  i {
    border-width: 4px 6px 4px 4px;
    border-color: transparent rgb(52, 73, 94) transparent transparent;
    transform: translate(-3px, 0px);
  }
`;

const nextButton = css`
  i {
    margin: 0 0 0 7px;
    border-width: 4px 4px 4px 6px;
    border-color: transparent transparent transparent rgb(52, 73, 94);
    transform: translate(3px, 0px);
  }
`;

export const NavigationButton = styled.button`
  box-sizing: inherit;
  cursor: pointer;
  outline: none;
  display: block;
  width: 24px;
  height: 24px;
  margin: 0 0.833em;
  padding: 0;
  border: 0;
  border-radius: 5px;
  background: #eff2f7;
  &:hover {
    background: #e1e7f0;
  }
  i {
    display: block;
    width: 0;
    height: 0;
    padding: 0;
    text-align: center;
    border-style: solid;
    margin: auto;
    transform: translate(-3px, 0px);
  }

  ${({ actionType }) => (actionType === 'next' ? nextButton : prevButton)};
`;
