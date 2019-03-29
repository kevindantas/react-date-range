import React from 'react';
import Markdown from 'markdown-to-jsx';
import markdownDoc from './pickers.md';
import DemoDateRange, { MonthsDateDate } from './DemoDateRange';
import DemoDefinedRanges, { CustomDefinedRange } from './DemoDefinedRanges';
import DemoDateRangePicker from './DemoDateRangePicker';
import DemoCalendar from './DemoCalendar';

function Picker() {
  return (
    <Markdown
      options={{
        overrides: {
          DemoCalendar: { component: DemoCalendar },
          DemoDateRange: { component: DemoDateRange },
          MonthsDateDate: { component: MonthsDateDate },
          DemoDefinedRange: { component: DemoDefinedRanges },
          CustomDefinedRange: { component: CustomDefinedRange },
          DemoDateRangePicker: { component: DemoDateRangePicker },
        },
      }}>
      {markdownDoc}
    </Markdown>
  );
}

export default Picker;
