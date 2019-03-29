import React from 'react';
import { DateRange } from '../../../../src';

class DemoDateRange extends React.Component {
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
      <DateRange
        onChange={this.handleRangeChange.bind(this)}
        ranges={[this.state.range.selection]}
        {...this.props}
      />
    );
  }
}

export const MonthsDateDate = () => <DemoDateRange months={2} />;

export default DemoDateRange;
