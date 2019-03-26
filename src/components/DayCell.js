/* eslint-disable no-fallthrough */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { startOfDay, format, isSameDay, isAfter, isBefore, endOfDay } from 'date-fns';
import { DayNumber, Day, InRange, PreviewRange } from './styles/DayCell.styled';

class DayCell extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      hover: false,
      active: false,
    };
    this.getClassNames = this.getClassNames.bind(this);
    this.handleMouseEvent = this.handleMouseEvent.bind(this);
    this.handleKeyEvent = this.handleKeyEvent.bind(this);
    this.renderSelectionPlaceholders = this.renderSelectionPlaceholders.bind(this);
    this.renderPreviewPlaceholder = this.renderPreviewPlaceholder.bind(this);
  }

  handleKeyEvent(event) {
    const { day } = this.props;
    switch (event.keyCode) {
      case 13: //space
      case 32: //enter
        if (event.type === 'keydown') {
          this.props.onMouseDown(day);
        } else {
          this.props.onMouseUp(day);
        }
        break;
    }
  }
  handleMouseEvent(event) {
    const { day, disabled, onPreviewChange } = this.props;
    const stateChanges = {};
    if (disabled) {
      onPreviewChange();
      return;
    }

    switch (event.type) {
      case 'mouseenter':
        this.props.onMouseEnter(day);
        onPreviewChange(day);
        stateChanges.hover = true;
        break;
      case 'blur':
      case 'mouseleave':
        stateChanges.hover = false;
        break;
      case 'mousedown':
        stateChanges.active = true;
        this.props.onMouseDown(day);
        break;
      case 'mouseup':
        event.stopPropagation();
        stateChanges.active = false;
        this.props.onMouseUp(day);
        break;
      case 'focus':
        onPreviewChange(day);
        break;
    }
    if (Object.keys(stateChanges).length) {
      this.setState(stateChanges);
    }
  }
  getClassNames() {
    const {
      isPassive,
      isToday,
      isWeekend,
      isStartOfWeek,
      isEndOfWeek,
      isStartOfMonth,
      isEndOfMonth,
      styles,
    } = this.props;

    return classnames(styles.day, {
      [styles.dayPassive]: isPassive,
      [styles.dayToday]: isToday,
      [styles.dayWeekend]: isWeekend,
      [styles.dayStartOfWeek]: isStartOfWeek,
      [styles.dayEndOfWeek]: isEndOfWeek,
      [styles.dayStartOfMonth]: isStartOfMonth,
      [styles.dayEndOfMonth]: isEndOfMonth,
      [styles.dayHovered]: this.state.hover,
      [styles.dayActive]: this.state.active,
    });
  }
  renderPreviewPlaceholder() {
    const { preview, day } = this.props;
    if (!preview) return null;
    const startDate = preview.startDate ? endOfDay(preview.startDate) : null;
    const endDate = preview.endDate ? startOfDay(preview.endDate) : null;
    const isStartEdge = isSameDay(day, startDate);
    const isEndEdge = isSameDay(day, endDate);
    const isInRange =
      (isStartEdge || isAfter(day, startDate)) && (isEndEdge || isBefore(day, endDate));
    return (
      <PreviewRange
        data-testid="preview-range"
        isStartEdge={isStartEdge}
        isEndEdge={isEndEdge}
        isInRange={isInRange}
        style={{ color: preview.color }}
      />
    );
  }
  renderSelectionPlaceholders() {
    const { styles, ranges, day } = this.props;
    if (this.props.displayMode === 'date') {
      let isSelected = isSameDay(this.props.day, this.props.date);
      return isSelected ? (
        <InRange className={styles.selected} data="teste" style={{ color: this.props.color }} />
      ) : null;
    }

    const inRanges = ranges.reduce((result, range) => {
      let startDate = range.startDate;
      let endDate = range.endDate;
      if (startDate && endDate && isBefore(endDate, startDate)) {
        [startDate, endDate] = [endDate, startDate];
      }
      startDate = startDate ? endOfDay(startDate) : null;
      endDate = endDate ? startOfDay(endDate) : null;
      const isInRange =
        (!startDate || isAfter(day, startDate)) && (!endDate || isBefore(day, endDate));
      const isStartEdge = !isInRange && isSameDay(day, startDate);
      const isEndEdge = !isInRange && isSameDay(day, endDate);
      if (isInRange || isStartEdge || isEndEdge) {
        return [
          ...result,
          {
            isStartEdge,
            isEndEdge: isEndEdge,
            isInRange,
            ...range,
          },
        ];
      }
      return result;
    }, []);

    return inRanges.map((range, i) => (
      <InRange
        key={i}
        data-testid="in-range"
        isStartEdge={range.isStartEdge}
        isEndEdge={range.isEndEdge}
        isInRange={range.isInRange}
        style={{ color: range.color || this.props.color }}
      />
    ));
  }
  render() {
    const {
      isPassive,
      isToday,
      isWeekend,
      isStartOfWeek,
      isEndOfWeek,
      isStartOfMonth,
      isEndOfMonth,
      disabled,
      styles,
    } = this.props;
    const { active, hover } = this.state;
    return (
      <Day
        isHover={hover}
        isToday={isToday}
        isActive={active}
        isWeekend={isWeekend}
        isPassive={isPassive}
        isEndOfWeek={isEndOfWeek}
        isEndOfMonth={isEndOfMonth}
        isStartOfWeek={isStartOfWeek}
        isStartOfMonth={isStartOfMonth}
        data-testid="day"
        type="button"
        disabled={disabled}
        onMouseEnter={this.handleMouseEvent}
        onMouseLeave={this.handleMouseEvent}
        onFocus={this.handleMouseEvent}
        onMouseDown={this.handleMouseEvent}
        onMouseUp={this.handleMouseEvent}
        onBlur={this.handleMouseEvent}
        onPauseCapture={this.handleMouseEvent}
        onKeyDown={this.handleKeyEvent}
        onKeyUp={this.handleKeyEvent}
        className={this.getClassNames(styles)}
        {...(this.props.disabled || this.props.isPassive ? { tabIndex: -1 } : {})}
        style={{ color: this.props.color }}>
        {this.renderSelectionPlaceholders()}
        {this.renderPreviewPlaceholder()}
        <DayNumber className={styles.dayNumber}>
          <span>{format(this.props.day, 'D')}</span>
        </DayNumber>
      </Day>
    );
  }
}

DayCell.defaultProps = {};

export const rangeShape = PropTypes.shape({
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  color: PropTypes.string,
  key: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  showDateDisplay: PropTypes.bool,
});

DayCell.propTypes = {
  day: PropTypes.object.isRequired,
  date: PropTypes.object,
  ranges: PropTypes.arrayOf(rangeShape),
  preview: PropTypes.shape({
    startDate: PropTypes.object,
    endDate: PropTypes.object,
  }),
  onPreviewChange: PropTypes.func,
  previewColor: PropTypes.string,
  disabled: PropTypes.bool,
  isPassive: PropTypes.bool,
  isToday: PropTypes.bool,
  isWeekend: PropTypes.bool,
  isStartOfWeek: PropTypes.bool,
  isEndOfWeek: PropTypes.bool,
  isStartOfMonth: PropTypes.bool,
  isEndOfMonth: PropTypes.bool,
  color: PropTypes.string,
  displayMode: PropTypes.oneOf(['dateRange', 'date']),
  styles: PropTypes.object,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseEnter: PropTypes.func,
};

export default DayCell;
