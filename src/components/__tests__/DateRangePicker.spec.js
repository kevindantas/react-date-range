import React from 'react';
import { render } from 'react-testing-library';
import DateRangePicker from '../DateRangePicker';

describe('The DateRangePicker Component', () => {
  const mockChange = jest.fn();
  const ranges = [];
  /**
   * This is supost to be a snapshot, but the jest-styled-component have an issue
   * The snapshot can't be generated due ":" on the background url (data:image/svg...)
   * @see {@link https://github.com/styled-components/jest-styled-components/issues/97}
   * TODO: Create snapshots
   */
  it('should render the component', () => {
    const { container } = render(<DateRangePicker onChange={mockChange} ranges={ranges} />);
    expect(container).toBeDefined();
  });
});
