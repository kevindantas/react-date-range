import React from 'react';
import { Calendar } from '../../../../src';

class DemoCalendar extends React.Component {
  constructor() {
    super();
    this.state = {
      date: null,
    };
  }

  handleRangeChange(date) {
    this.setState({
      date,
    });
  }

  render() {
    return (
      <Calendar
        onChange={this.handleRangeChange.bind(this)}
        date={this.state.date}
        {...this.props}
      />
    );
  }
}

export const MonthsDateDate = () => <DemoCalendar months={2} />;

export default DemoCalendar;
