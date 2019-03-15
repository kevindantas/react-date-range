import styled, { css } from 'styled-components';

const marginHorizontal = css`
  margin: 0 5px;
`;

export const CalendarWrapper = styled('div')`
  box-sizing: border-box;
  background: #ffffff;
  display: inline-flex;
  flex-direction: column;
  user-select: none;
  color: #000000;
  font-size: 12px;
`;

export const MonthAndYearWrapper = styled('div')`
  box-sizing: inherit;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding-top: 10px;
`;

export const MonthAndYearPickers = styled('span')`
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
    background: url("data:image/svg+xml;utf8,<svg width='9px' height='6px' viewBox='0 0 9 6' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><g id='Artboard' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' transform='translate(-636.000000, -171.000000)' fill-opacity='0.368716033'><g id='input' transform='translate(172.000000, 37.000000)' fill='%230E242F' fill-rule='nonzero'><g id='Group-9' transform='translate(323.000000, 127.000000)'><path d='M142.280245,7.23952813 C141.987305,6.92353472 141.512432,6.92361662 141.219585,7.23971106 C140.926739,7.5558055 140.926815,8.06821394 141.219755,8.38420735 L145.498801,13 L149.780245,8.38162071 C150.073185,8.0656273 150.073261,7.55321886 149.780415,7.23712442 C149.487568,6.92102998 149.012695,6.92094808 148.719755,7.23694149 L145.498801,10.7113732 L142.280245,7.23952813 Z' id='arrow'></path></g></g></g></svg>")
      no-repeat;
    background-position: right 8px center;
    cursor: pointer;
    text-align: center;
    &:hover {
      background-color: rgba(0, 0, 0, 0.07);
    }
  }
`;

export const YearPicker = styled('span')`
  ${marginHorizontal};
`;

export const MonthPicker = styled('span')`
  ${marginHorizontal};
`;

export const DateDisplay = styled('div')`
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

export const Months = styled('div')`
  display: flex;
  ${props => (props.direction === 'vertical' ? monthsVertical : monthsHorizontal)};
`;

export const InfiniteMonths = styled('div')`
  overflow: auto;
  ${props => (props.direction === 'vertical' ? monthsVertical : monthsHorizontal)};
`;

//
// Date Display Item

const dateDisplayItemActive = css`
  border-color: currentColor;
  input {
    color: #7d888d;
  }
`;

export const DateDisplayItem = styled('span')`
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

export const NavigationButton = styled('button')`
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
