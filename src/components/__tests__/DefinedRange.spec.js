import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { defaultStaticRanges, defaultInputRanges } from '../../defaultRanges';
import { DefinedRange } from '../..';
import { startOfDay, isSameDay } from 'date-fns';
import { staticRangeSelected } from '../styles/DefinedRange.styled';

describe('The DefinedRange Component', () => {
  const customStaticRanges = [
    {
      label: 'Custom Today',
      range: () => ({
        startDate: startOfDay(new Date()),
        endDate: startOfDay(new Date()),
      }),
      isSelected: () => true,
    },
  ];
  const ranges = [
    {
      startDate: startOfDay(new Date()),
      endDate: startOfDay(new Date()),
      key: 'selection',
    },
  ];

  describe('static ranges', () => {
    it('should list the default static ranges', () => {
      const { getByText } = render(<DefinedRange />);
      defaultStaticRanges.forEach(staticRange => {
        expect(getByText(staticRange.label)).toBeDefined();
      });
    });

    it('should list custom static ranges', () => {
      const { getByText } = render(<DefinedRange staticRanges={customStaticRanges} />);
      customStaticRanges.forEach(staticRange => {
        expect(getByText(staticRange.label)).toBeDefined();
      });
    });

    it('should select a static range', () => {
      let newRange;
      const mockChange = jest.fn().mockImplementation(({ selection }) => {
        newRange = [selection];
      });
      const { getByText, rerender } = render(
        <DefinedRange onChange={mockChange} ranges={ranges} />
      );

      const selectedRange = defaultStaticRanges[1];
      const firstStaticRange = getByText(selectedRange.label);
      fireEvent.click(firstStaticRange);
      expect(mockChange).toHaveBeenCalledWith({
        selection: {
          key: ranges[0].key,
          ...selectedRange.range(),
        },
      });

      rerender(<DefinedRange onChange={mockChange} ranges={newRange} />);
      expect(getByText(selectedRange.label)).toHaveStyleRule(staticRangeSelected);
    });

    it('should call "renderStaticRangeLabel" callback correct amount of times according to the "hasCustomRendering" option', () => {
      const renderStaticRangeLabel = jest.fn();

      render(
        <DefinedRange
          staticRanges={[
            {
              label: 'Dynamic Label',
              range: {},
              isSelected(range) {
                const definedRange = this.range();
                return (
                  isSameDay(range.startDate, definedRange.startDate) &&
                  isSameDay(range.endDate, definedRange.endDate)
                );
              },
              hasCustomRendering: true,
            },
            {
              label: 'Static Label',
              range: {},
              isSelected(range) {
                const definedRange = this.range();
                return (
                  isSameDay(range.startDate, definedRange.startDate) &&
                  isSameDay(range.endDate, definedRange.endDate)
                );
              },
            },
            {
              label: 'Hede',
              range: {},
              isSelected(range) {
                const definedRange = this.range();
                return (
                  isSameDay(range.startDate, definedRange.startDate) &&
                  isSameDay(range.endDate, definedRange.endDate)
                );
              },
              hasCustomRendering: true,
            },
          ]}
          renderStaticRangeLabel={renderStaticRangeLabel}
        />
      );

      expect(renderStaticRangeLabel).toHaveBeenCalledTimes(2);
    });
  });

  describe('input ranges', () => {
    it('should update the selection on input change', () => {
      const mockChange = jest.fn();
      const { getByDisplayValue } = render(<DefinedRange onChange={mockChange} ranges={ranges} />);

      const input = getByDisplayValue((content, elem) => {
        return elem.parentNode.textContent === defaultInputRanges[0].label;
      });

      const days = 2;
      fireEvent.change(input, {
        target: {
          value: days,
        },
      });

      const expectedRange = {
        selection: {
          key: ranges[0].key,
          ...defaultInputRanges[0].range(days),
        },
      };
      expect(mockChange).toHaveBeenCalledWith(expectedRange);
    });
  });

  describe('snapshots', () => {
    it('should render dynamic static label contents correctly', () => {
      const renderItalicLabelContent = () => (
        <i className={'italic-label-content'}>{'Italic Content'}</i>
      );
      const renderBoldLabelContent = () => <b className={'bold-label-content'}>{'Bold Content'}</b>;
      const renderSomethingElse = () => <img className={'random-image'} />;

      const renderStaticRangeLabel = function(staticRange) {
        let result;

        if (staticRange.id === 'italic') {
          result = renderItalicLabelContent();
        } else if (staticRange.id === 'bold') {
          result = renderBoldLabelContent();
        } else {
          result = renderSomethingElse();
        }

        return result;
      };

      const { container } = render(
        <DefinedRange
          staticRanges={[
            {
              id: 'italic',
              range: {},
              isSelected(range) {
                const definedRange = this.range();
                return (
                  isSameDay(range.startDate, definedRange.startDate) &&
                  isSameDay(range.endDate, definedRange.endDate)
                );
              },
              hasCustomRendering: true,
            },
            {
              label: 'Static Label',
              range: {},
              isSelected(range) {
                const definedRange = this.range();
                return (
                  isSameDay(range.startDate, definedRange.startDate) &&
                  isSameDay(range.endDate, definedRange.endDate)
                );
              },
            },
            {
              id: 'whatever',
              range: {},
              isSelected(range) {
                const definedRange = this.range();
                return (
                  isSameDay(range.startDate, definedRange.startDate) &&
                  isSameDay(range.endDate, definedRange.endDate)
                );
              },
              hasCustomRendering: true,
            },
            {
              id: 'bold',
              range: {},
              isSelected(range) {
                const definedRange = this.range();
                return (
                  isSameDay(range.startDate, definedRange.startDate) &&
                  isSameDay(range.endDate, definedRange.endDate)
                );
              },
              hasCustomRendering: true,
            },
          ]}
          renderStaticRangeLabel={renderStaticRangeLabel}
        />
      );

      expect(container).toMatchSnapshot();
    });
  });
});
