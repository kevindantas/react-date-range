import React from 'react';
import { DateRangePicker } from '../../../../src';

class DemoDateRangePicker extends React.Component {
  constructor() {
    super();
    this.state = {
      range: {
        selection: {
          startDate: new Date(),
          endDate: null,
          key: 'selection',
        },
      },
    };
  }

  handleRangeChange(payload) {
    this.setState({
      range: {
        ...this.state.range,
        ...payload,
      },
    });
  }

  render() {
    console.log(this.props);
    return (
      <DateRangePicker
        onChange={this.handleRangeChange.bind(this)}
        ranges={[this.state.range.selection]}
        {...this.props}
      />
    );
  }
}

export const MonthsDateDate = () => <DemoDateRangePicker months={2} />;

export default DemoDateRangePicker;
