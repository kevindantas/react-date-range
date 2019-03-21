import styled, { css } from 'styled-components';

// Static Ranges
export const StaticRanges = styled('div')`
  display: flex;
  flex-direction: column;
`;

export const StaticRangeLabel = styled('span')`
  display: block;
  outline: 0;
  line-height: 18px;
  padding: 10px 20px;
  text-align: left;
`;

export const staticRangeSelected = css`
  ${StaticRangeLabel} {
    font-weight: bold;
  }
`;

export const StaticRange = styled('button')`
  border: 0;
  cursor: pointer;
  display: block;
  outline: 0;
  border-bottom: 1px solid #eff2f7;
  font-size: inherit;
  padding: 0;
  background: #fff;
  transition: background-color 0.2s ease-in;
  &:hover,
  &:focus {
    background: #eff2f7;
  }
  ${({ selected }) => (selected ? staticRangeSelected : '')};
`;

export const DefinedRangesWrapper = styled('div')`
  font-size: 12px;
  width: 226px;
  border-right: solid 1px #eff2f7;
  background: #fff;
`;

// Input ranges
export const InputRanges = styled('div')`
  padding: 10px 0;
`;

export const InputRange = styled('label')`
  display: flex;
  align-items: center;
  padding: 5px 20px;
`;

export const InputRangeInput = styled('input')`
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 4px;
  text-align: center;
  border: solid 1px rgb(222, 231, 235);
  margin-right: 10px;
  color: rgb(108, 118, 122);
  &:focus,
  &:hover {
    border-color: rgb(180, 191, 196);
    outline: 0;
    color: #333;
  }
`;
