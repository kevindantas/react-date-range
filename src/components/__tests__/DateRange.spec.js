import React from 'react';
import { render, getAllByTestId, getByTestId, fireEvent } from 'react-testing-library';
import DateRange from '../DateRange';

const getByTestIdAndText = (container, testId, text) =>
  getByTestId(container, (content, element) => {
    return content === testId && element.textContent === text;
  });

const getDayByText = (container, day) => getByTestIdAndText(container, 'day', day);

describe('The DateRange Component', () => {
  it('should select a range of days', () => {
    let range = {
      startDate: new Date(),
      key: 'selection',
    };
    const handleChange = ({ selection }) => {
      range = selection;
    };
    const { container, rerender } = render(<DateRange ranges={[range]} onChange={handleChange} />);

    const firstDay = getDayByText(container, '15');
    const secondDay = getDayByText(container, '16');
    fireEvent.mouseEnter(firstDay);
    fireEvent.mouseDown(firstDay);
    fireEvent.mouseMove(secondDay);
    fireEvent.mouseUp(secondDay);

    rerender(<DateRange ranges={[range]} onChange={handleChange} />);

    expect(firstDay).toContainElement(getByTestId(firstDay, 'in-range'));
    expect(secondDay).toContainElement(getByTestId(secondDay, 'in-range'));
  });
});
