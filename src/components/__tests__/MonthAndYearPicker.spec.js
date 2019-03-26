import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import MonthAndYearPicker from '../MonthAndYearPicker';
import defaultLocale from 'date-fns/locale/en-US';
import { addMonths, format, addYears } from 'date-fns';

describe('The MonthAndyearPicker component', () => {
  const props = {
    minDate: new Date(),
    maxDate: addYears(new Date(), 5),
    focusedDate: new Date(),
    locale: defaultLocale,
    changeShownDate: jest.fn(),
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should hide the navigation buttons when showMonthArrow=false', () => {
    const { queryByTitle } = render(<MonthAndYearPicker showMonthArrow={false} {...props} />);
    expect(queryByTitle('Next')).toBe(null);
    expect(queryByTitle('Prev')).toBe(null);
  });

  it('should call changeShownDate with monthOffset when click the navigation buttons', () => {
    const { getByTitle } = render(<MonthAndYearPicker {...props} />);
    fireEvent.click(getByTitle('Next'));
    expect(props.changeShownDate).toHaveBeenCalledWith(1, 'monthOffset');
    fireEvent.click(getByTitle('Previous'));
    expect(props.changeShownDate).toHaveBeenCalledWith(-1, 'monthOffset');
  });

  it('should call changeShownDate with setMonth when select a month', () => {
    const { getByDisplayValue } = render(<MonthAndYearPicker {...props} />);
    const focusedMonth = format(props.focusedDate, 'MMMM');
    const nextMonth = addMonths(props.focusedDate, 1).getMonth();
    fireEvent.change(getByDisplayValue(focusedMonth), {
      target: {
        value: nextMonth,
      },
    });
    expect(props.changeShownDate).toHaveBeenCalledWith(`${nextMonth}`, 'setMonth');
  });

  it('should call changeShownDate with setYear when select a year', () => {
    const { getByDisplayValue } = render(<MonthAndYearPicker {...props} />);
    const focusedYear = format(props.focusedDate, 'YYYY');
    const nextYear = format(addYears(focusedYear, 1), 'YYYY');
    fireEvent.change(getByDisplayValue(focusedYear), {
      target: {
        value: nextYear,
      },
    });
    expect(props.changeShownDate).toHaveBeenCalledWith(nextYear, 'setYear');
  });
});
