import React from 'react';
import DefinedRange from '../../../../src/components/DefinedRange';

class DemoDefinedRanges extends React.Component {
  constructor() {
    super();
    this.state = {
      range: {
        selection: {
          startDate: new Date(),
          endDate: new Date(),
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
    return (
      <DefinedRange
        ranges={[this.state.range.selection]}
        onChange={this.handleRangeChange.bind(this)}
        {...this.props}
      />
    );
  }
}

const staticRanges = [
  {
    label: 'My custom range',
    hasCustomRendering: true,
    range: () => ({
      startDate: new Date(),
      endDate: new Date(),
    }),
    isSelected() {
      return true;
    },
  },
];

function renderStaticRangeLabel(range) {
  return <span>{range.label}</span>;
}

export const CustomDefinedRange = () => (
  <DemoDefinedRanges renderStaticRangeLabel={renderStaticRangeLabel} staticRanges={staticRanges} />
);

export default DemoDefinedRanges;
