import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import DayCell from '../DayCell';
import { inPreview } from '../styles/DayCell.styled';

const range1 = {
  startDate: new Date(),
  endDate: new Date(),
  color: 'red',
  key: '1',
  autoFocus: true,
  disabled: true,
  showDateDisplay: true,
};

const ranges = [range1];

describe('The DayCell Component', () => {
  const day = new Date('2019-03-01');
  const props = {
    day,
    ranges,
    styles: {
      dayActive: 'dayActive',
      dayHovered: 'dayHovered',
    },
    onPreviewChange: jest.fn(),
  };

  it('should display the day received as the prop', () => {
    const { container, getByText } = render(<DayCell {...props} />);
    const matcher = new RegExp(day.getDate());
    expect(container).toContainElement(getByText(matcher));
  });

  describe('mouse events', () => {
    const mockPreviewChange = jest.fn();
    afterEach(() => {
      jest.restoreAllMocks();
      jest.resetAllMocks();
    });

    it('should not call onPreviewChange with the day when disabled', () => {
      const { getByTestId, debug } = render(
        <DayCell {...props} disabled onPreviewChange={mockPreviewChange} />
      );
      fireEvent.mouseEnter(getByTestId('day'));
      expect(mockPreviewChange).toHaveBeenCalledWith();
    });

    it('should add hover styles on mouseEnter', () => {
      let preview;
      const mockMouseEnter = day => {
        preview = {
          startDate: day,
          endDate: day,
        };
      };

      const { queryByTestId, rerender } = render(
        <DayCell {...props} preview={preview} onMouseEnter={mockMouseEnter} />
      );

      expect(queryByTestId('preview-range')).toBe(null);

      fireEvent.mouseEnter(queryByTestId('day'));

      rerender(
        <DayCell
          {...props}
          preview={preview}
          onMouseEnter={mockMouseEnter}
          onPreviewChange={mockPreviewChange}
        />
      );
      expect(queryByTestId('preview-range')).toHaveStyleRule(inPreview);
    });

    it('should select the day on mousedown and mouseup', () => {
      let ranges = [];
      const mockMouseEvent = day => {
        ranges = [
          {
            startDate: day,
            endDate: day,
          },
        ];
      };
      const { queryByTestId, rerender } = render(
        <DayCell
          {...props}
          ranges={ranges}
          onMouseDown={mockMouseEvent}
          onMouseUp={mockMouseEvent}
        />
      );

      expect(queryByTestId('in-range')).toBe(null);

      fireEvent.mouseDown(queryByTestId('day'));
      fireEvent.mouseUp(queryByTestId('day'));

      rerender(
        <DayCell
          {...props}
          ranges={ranges}
          onMouseDown={mockMouseEvent}
          onMouseUp={mockMouseEvent}
        />
      );
      expect(queryByTestId('in-range')).toBeDefined();
    });
  });

  describe('keyboard events', () => {
    const mockMouseDown = jest.fn();
    const mockMouseUp = jest.fn();
    afterEach(() => {
      jest.restoreAllMocks();
      jest.resetAllMocks();
    });

    it('should support space key as if were a mouse event', () => {
      const { getByTestId } = render(
        <DayCell {...props} onMouseDown={mockMouseDown} onMouseUp={mockMouseUp} />
      );

      fireEvent.keyDown(getByTestId('day'), { keyCode: 13 });
      expect(mockMouseDown).toBeCalledWith(day);

      fireEvent.keyUp(getByTestId('day'), { keyCode: 13 });
      expect(mockMouseUp).toBeCalledWith(day);
    });

    it('should support enter key as if were a mouse event', () => {
      const { getByTestId } = render(
        <DayCell {...props} onMouseDown={mockMouseDown} onMouseUp={mockMouseUp} />
      );

      fireEvent.keyDown(getByTestId('day'), { keyCode: 32 });
      expect(mockMouseDown).toBeCalledWith(day);

      fireEvent.keyUp(getByTestId('day'), { keyCode: 32 });
      expect(mockMouseUp).toBeCalledWith(day);
    });

    it('should not trigger mouse events if not space or enter key', () => {
      const { getByTestId } = render(
        <DayCell {...props} onMouseDown={mockMouseDown} onMouseUp={mockMouseUp} />
      );

      fireEvent.keyDown(getByTestId('day'), { keyCode: 62 });
      expect(mockMouseDown).not.toHaveBeenCalled();

      fireEvent.keyUp(getByTestId('day'), { keyCode: 62 });
      expect(mockMouseUp).not.toHaveBeenCalled();
    });
  });
});
