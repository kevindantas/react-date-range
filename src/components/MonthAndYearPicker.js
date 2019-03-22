import React from 'react';
import PropTypes from 'prop-types';
import {
  MonthAndYearWrapper,
  NavigationButton,
  MonthAndYearPickers,
  MonthPicker,
  YearPicker,
} from './styles/Calendar.styled';

function MonthAndYearPicker(props) {
  const {
    locale,
    minDate,
    maxDate,
    buttonsText,
    focusedDate,
    showMonthArrow,
    changeShownDate,
    showMonthAndYearPickers,
  } = props;
  const upperYearLimit = maxDate.getFullYear();
  const lowerYearLimit = minDate.getFullYear();
  const styles = {};
  return (
    <MonthAndYearWrapper onMouseUp={e => e.stopPropagation()}>
      {showMonthArrow ? (
        <NavigationButton
          type="button"
          title={buttonsText.prev}
          actionType="prev"
          onClick={() => changeShownDate(-1, 'monthOffset')}>
          <i />
        </NavigationButton>
      ) : null}
      {showMonthAndYearPickers ? (
        <MonthAndYearPickers>
          <MonthPicker>
            <select
              value={focusedDate.getMonth()}
              onChange={e => changeShownDate(e.target.value, 'setMonth')}>
              {locale.localize.months().map((month, i) => (
                <option key={i} value={i}>
                  {month}
                </option>
              ))}
            </select>
          </MonthPicker>
          <span className={styles.monthAndYearDivider} />
          <YearPicker>
            <select
              value={focusedDate.getFullYear()}
              onChange={e => changeShownDate(e.target.value, 'setYear')}>
              {new Array(upperYearLimit - lowerYearLimit + 1).fill(upperYearLimit).map((val, i) => {
                const year = val - i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </YearPicker>
        </MonthAndYearPickers>
      ) : (
        <MonthAndYearPickers>
          {locale.localize.months()[focusedDate.getMonth()]} {focusedDate.getFullYear()}
        </MonthAndYearPickers>
      )}
      {showMonthArrow ? (
        <NavigationButton
          type="button"
          actionType="next"
          title={buttonsText.next}
          onClick={() => changeShownDate(+1, 'monthOffset')}>
          <i />
        </NavigationButton>
      ) : null}
    </MonthAndYearWrapper>
  );
}

MonthAndYearPicker.defaultProps = {
  showMonthArrow: true,
  showMonthAndYearPickers: true,
  buttonsText: {
    next: 'Next',
    prev: 'Previous',
  },
};

MonthAndYearPicker.propTypes = {
  locale: PropTypes.object,
  minDate: PropTypes.objectOf(Date),
  maxDate: PropTypes.objectOf(Date),
  buttonsText: PropTypes.shape({
    prev: PropTypes.string,
    next: PropTypes.string,
  }),
  focusedDate: PropTypes.objectOf(Date),
  showMonthArrow: PropTypes.bool,
  changeShownDate: PropTypes.func,
  showMonthAndYearPickers: PropTypes.bool,
};

export default MonthAndYearPicker;
