import React from 'react';
import { render, getByTestId, fireEvent } from 'react-testing-library';
import DateRange from '../DateRange';

const getByTestIdAndText = (container, testId, text) =>
  getByTestId(container, (content, element) => {
    return content === testId && element.textContent === text;
  });

const getDayByText = (container, day) => getByTestIdAndText(container, 'day', day);

describe('The DateRange Component', () => {
  let range = {
    startDate: new Date('2019-03-20'),
    key: 'selection',
  };
  const handleChange = ({ selection }) => {
    range = selection;
  };

  describe('when select range', () => {
    const fireMouseEvents = (firstDay, secondDay) => {
      fireEvent.mouseEnter(firstDay);
      fireEvent.mouseDown(firstDay);
      fireEvent.mouseMove(secondDay);
      fireEvent.mouseUp(secondDay);
    };

    it('should be able to select a endDate after the startDate', () => {
      const { container, rerender } = render(
        <DateRange ranges={[range]} onChange={handleChange} />
      );

      const firstDay = getDayByText(container, '15');
      const secondDay = getDayByText(container, '16');

      fireMouseEvents(firstDay, secondDay);

      rerender(<DateRange ranges={[range]} onChange={handleChange} />);

      expect(firstDay).toContainElement(getByTestId(firstDay, 'in-range'));
      expect(secondDay).toContainElement(getByTestId(secondDay, 'in-range'));
    });

    it('should be able to select a endDate before the startDate', () => {
      const { container, rerender } = render(
        <DateRange ranges={[range]} onChange={handleChange} />
      );

      const firstDay = getDayByText(container, '15');
      const secondDay = getDayByText(container, '14');
      fireMouseEvents(firstDay, secondDay);

      rerender(<DateRange ranges={[range]} onChange={handleChange} />);

      expect(firstDay).toContainElement(getByTestId(firstDay, 'in-range'));
      expect(secondDay).toContainElement(getByTestId(secondDay, 'in-range'));
    });
  });
});
