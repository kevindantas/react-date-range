import React from 'react';
import { render } from 'react-testing-library';
import Month from '../Month';
import { getMonthDisplayRange } from '../../utils';

describe('The Month component', () => {
  const monthDate = new Date('2019-03-10');
  const props = {
    month: monthDate,
    drag: {
      status: false,
      range: {},
    },
    ranges: [],
    styles: {},
  };

  it('should display the days from the other months', () => {
    const displayMonthRange = getMonthDisplayRange(monthDate);
    const { container, getByText } = render(<Month {...props} />);
    expect(container).toContainElement(getByText(`${displayMonthRange.start.getDate()}`));
    expect(container).toContainElement(getByText(`${displayMonthRange.end.getDate()}`));
  });

  it('should display the month name according the given format', () => {
    const { container, getByText } = render(
      <Month showMonthName monthDisplayFormat="MMM" {...props} />
    );
    expect(container).toContainElement(getByText('Mar'));
  });

  it('should be able to disable a specific date', () => {
    const disabledDates = [new Date('2019-03-20'), new Date('2019-03-30')];
    const { getByText } = render(<Month {...props} disabledDates={disabledDates} />);
    expect(getByText('10').parentNode.parentNode).not.toBeDisabled();
    // TODO: Find closest??
    expect(getByText(`${disabledDates[0].getDate()}`).parentNode.parentNode).toBeDisabled();
    expect(getByText(`${disabledDates[1].getDate()}`).parentNode.parentNode).toBeDisabled();
  });
});
