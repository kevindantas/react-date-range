import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import { addMonths, format, subMonths } from 'date-fns';
import Calendar from '../Calendar';

describe('The Calendar Component', () => {
  const now = new Date();

  describe('months', () => {
    const months = 2;
    it('should render the months according to the prop', () => {
      const { queryByTestId } = render(<Calendar months={months} />);
      expect(queryByTestId('month').children).toHaveLength(months);
    });

    it('should show the previous month by default', () => {
      const { container, getByText } = render(<Calendar months={months} direction="horizontal" />);

      const previousMonth = `${format(
        subMonths(new Date(), 1),
        'MMM'
      )} ${new Date().getFullYear()}`;
      expect(container).toContainElement(getByText(previousMonth));
    });

    it('should show the next month with startOnPreviousMonth=false', () => {
      const nextMonth = `${format(addMonths(new Date(), 1), 'MMM')} ${new Date().getFullYear()}`;

      const { container, getByText } = render(
        <Calendar months={months} startOnPreviousMonth={false} direction="horizontal" />
      );

      expect(container).toContainElement(getByText(nextMonth));
    });
  });

  describe('select dates', () => {
    const currentMonthName = format(now, 'MMMM');
    it('should advance to the next month when click the button', () => {
      const { getByTitle, getByText } = render(<Calendar months={1} />);
      expect(getByText(currentMonthName).selected).toBe(true);

      const nextMonth = addMonths(now, 1);
      const nextMonthName = format(nextMonth, 'MMMM');
      fireEvent.click(getByTitle('Next'));
      expect(getByText(nextMonthName).selected).toBe(true);
    });

    it('should return to the previous month when click the button', () => {
      const { getByTitle, getByText } = render(<Calendar months={1} />);
      expect(getByText(currentMonthName).selected).toBe(true);

      const prevMonth = subMonths(now, 1);
      const prevMonthName = format(prevMonth, 'MMMM');
      fireEvent.click(getByTitle('Previous'));
      expect(getByText(prevMonthName).selected).toBe(true);
    });
  });

  describe('infinite months', () => {
    const props = {
      direction: 'vertical',
      minDate: addMonths(new Date(), -3),
      maxDate: addMonths(new Date(), 3),
      scroll: {
        enabled: true,
      },
    };
    it('should render InfiniteMonths styled element', () => {
      const { getByTestId } = render(<Calendar {...props} />);
      expect(getByTestId('infinite-months')).toBeDefined();
    });
  });
});
