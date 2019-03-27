import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateRange from './DateRange';
import DefinedRange from './DefinedRange';
import { findNextRangeIndex } from '../utils.js';
import { DateRangePickerWrapper } from './styles/DateRangePicker.styles';

class DateRangePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedRange: [findNextRangeIndex(props.ranges), 0],
    };
  }
  render() {
    const { focusedRange } = this.state;
    return (
      <DateRangePickerWrapper className={this.props.className}>
        {!this.props.narrow && (
          <DefinedRange
            focusedRange={focusedRange}
            onPreviewChange={value => this.dateRange.updatePreview(value)}
            {...this.props}
            range={this.props.ranges[focusedRange[0]]}
          />
        )}
        <DateRange
          onRangeFocusChange={focusedRange => this.setState({ focusedRange })}
          focusedRange={focusedRange}
          {...this.props}
          ref={t => (this.dateRange = t)}
        />
      </DateRangePickerWrapper>
    );
  }
}

DateRangePicker.defaultProps = {};

DateRangePicker.propTypes = {
  ...DateRange.propTypes,
  ...DefinedRange.propTypes,
  className: PropTypes.string,
};

export default DateRangePicker;
