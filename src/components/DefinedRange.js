import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles';
import { defaultInputRanges, defaultStaticRanges } from '../defaultRanges';
import { rangeShape } from './DayCell';
import {
  InputRanges,
  InputRange,
  InputRangeInput,
  StaticRanges,
  StaticRange,
  StaticRangeLabel,
  DefinedRangesWrapper,
} from './styles/DefinedRange.styled';

class DefinedRanges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rangeOffset: 0,
      focusedInput: -1,
    };
    this.handleRangeChange = this.handleRangeChange.bind(this);
  }

  handleRangeChange(range) {
    const { onChange, ranges, focusedRange } = this.props;
    const selectedRange = ranges[focusedRange[0]];
    if (!onChange || !selectedRange) return;
    onChange({
      [selectedRange.key || `range${focusedRange[0] + 1}`]: { ...selectedRange, ...range },
    });
  }

  getSelectedRange(ranges, staticRange) {
    const focusedRangeIndex = ranges.findIndex(range => {
      if (!range.startDate || !range.endDate || range.disabled) return false;
      return staticRange.isSelected(range);
    });
    const selectedRange = ranges[focusedRangeIndex];
    return { selectedRange, focusedRangeIndex };
  }

  render() {
    const { onPreviewChange, ranges, renderStaticRangeLabel, rangeColors, className } = this.props;

    return (
      <DefinedRangesWrapper className={className}>
        {this.props.headerContent}
        <StaticRanges>
          {this.props.staticRanges.map((staticRange, i) => {
            const { selectedRange, focusedRangeIndex } = this.getSelectedRange(ranges, staticRange);
            let labelContent;

            if (staticRange.hasCustomRendering) {
              labelContent = renderStaticRangeLabel(staticRange);
            } else {
              labelContent = staticRange.label;
            }

            return (
              <StaticRange
                type="button"
                selected={Boolean(selectedRange)}
                style={{
                  color: selectedRange
                    ? selectedRange.color || rangeColors[focusedRangeIndex]
                    : null,
                }}
                key={i}
                onClick={() => this.handleRangeChange(staticRange.range(this.props))}
                onFocus={() => onPreviewChange && onPreviewChange(staticRange.range(this.props))}
                onMouseOver={() =>
                  onPreviewChange && onPreviewChange(staticRange.range(this.props))
                }
                onMouseLeave={() => {
                  this.props.onPreviewChange && this.props.onPreviewChange();
                }}>
                <StaticRangeLabel tabIndex={-1}>{labelContent}</StaticRangeLabel>
              </StaticRange>
            );
          })}
        </StaticRanges>
        <InputRanges>
          {this.props.inputRanges.map((rangeOption, i) => (
            <InputRange key={i}>
              <InputRangeInput
                onFocus={() => this.setState({ focusedInput: i, rangeOffset: 0 })}
                onBlur={() => this.setState({ rangeOffset: 0 })}
                onChange={e => {
                  let value = parseInt(e.target.value, 10);
                  value = isNaN(value) ? 0 : Math.max(Math.min(99999, value), 0);
                  this.handleRangeChange(rangeOption.range(value, this.props));
                }}
                min={0}
                max={99999}
                value={
                  rangeOption.getCurrentValue
                    ? rangeOption.getCurrentValue(ranges[this.props.focusedRange[0]] || {})
                    : '-'
                }
              />
              <span className={styles.inputRangeLabel}>{rangeOption.label}</span>
            </InputRange>
          ))}
        </InputRanges>
        {this.props.footerContent}
      </DefinedRangesWrapper>
    );
  }
}

DefinedRanges.propTypes = {
  inputRanges: PropTypes.array,
  staticRanges: PropTypes.array,
  ranges: PropTypes.arrayOf(rangeShape),
  focusedRange: PropTypes.arrayOf(PropTypes.number),
  onPreviewChange: PropTypes.func,
  onChange: PropTypes.func,
  footerContent: PropTypes.any,
  headerContent: PropTypes.any,
  rangeColors: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  renderStaticRangeLabel: PropTypes.func,
};

DefinedRanges.defaultProps = {
  inputRanges: defaultInputRanges,
  staticRanges: defaultStaticRanges,
  ranges: [],
  rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c'],
  focusedRange: [0, 0],
};

export default DefinedRanges;
