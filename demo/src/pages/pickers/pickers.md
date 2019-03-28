# Pickers

The date pickers are built on top of the `react-date-range` library.

## Calendar

### Demo

<div class="demo">
  <DemoCalendar />
</div>

| Property                | type    | Default Value      | Desctiption                                                                                                                                                                                                                                |
| ----------------------- | ------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| locale                  | Object  | enUS from locale   | you can view full list from [here](https://github.com/kevindantas/react-date-range/tree/next/src/locale/index.js). Locales directly exported from [`date-fns/locales`](https://date-fns.org/v2.0.0-alpha.7/docs/I18n#supported-languages). |
| className               | String  |                    | wrapper classname                                                                                                                                                                                                                          |
| months                  | Number  | 1                  | rendered month count                                                                                                                                                                                                                       |
| showSelectionPreview    | Boolean | true               | show preview on focused/hovered dates                                                                                                                                                                                                      |
| showMonthAndYearPickers | Boolean | true               | show select tags for month and year on calendar top, if false it will just display the month and year                                                                                                                                      |
| shownDate               | Date    |                    | initial focus date                                                                                                                                                                                                                         |
| minDate                 | Date    |                    | defines minimum date. Disabled earlier dates                                                                                                                                                                                               |
| maxDate                 | Date    |                    | defines maximum date. Disabled later dates                                                                                                                                                                                                 |
| direction               | String  | 'horizontal'       | direction of calendar months. can be `vertical` or `horizontal`                                                                                                                                                                            |
| disabledDates           | Date[]  | []                 | dates that are disabled                                                                                                                                                                                                                    |
| scroll                  | Object  | { enabled: false } | infinite scroll behaviour configuration. Check out [Infinite Scroll](#infinite-scrolled-mode) section                                                                                                                                      |
| showMonthArrow          | Boolean | true               | show/hide month arrow button                                                                                                                                                                                                               |
| navigatorRenderer       | Func    |                    | renderer for focused date navigation area. fn(currentFocusedDate: Date, changeShownDate: func, props: object)                                                                                                                              |
| onChange                | Func    |                    | callback function for date changes. fn(date: Date)                                                                                                                                                                                         |
| color(Calenday only)    | String  | `#3d91ff`          | defines color for selected date in Calendar                                                                                                                                                                                                |
| date(Calendar only)     | Date    |                    | date value for Calendar                                                                                                                                                                                                                    |

## Date Range

This component allows the `Calendar` to select a range of dates, so the props supported by the `Calendar` are supported by the `DateRange` as well.

### Simple Date Range

<div class="demo">
  <DemoDateRange />
</div>

### Date Range with 2 months

<div class="demo">
  <MonthsDateDate />
</div>

### API

| Property                  | type                                | Default Value | Desctiption                                                                                                                                                                  |
| ------------------------- | ----------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ranges                    | \*Object[]                          | []            | Defines ranges. array of range object                                                                                                                                        |
| onChange                  | \*Func                              |               | callback function for range changes. fn(changes). changes contains changed ranges with new `startDate`/`endDate` properties.                                                 |
| narrow                    | Boolean                             | false         | Adjust layout for mobile                                                                                                                                                     |
| showDateDisplay           | Boolean                             | false         | show/hide selection display row. Uses `dateDisplayFormat` for formatter                                                                                                      |
| onShownDateChange         | Function                            |               | Callback function that is called when the shown date changes                                                                                                                 |
| initialFocusedRange       | Object                              |               | Initial value for focused range. See `focusedRange` for usage.                                                                                                               |
| rangeColors               | `['#3d91ff', '#3ecf8e', '#fed14c']` |               | defines color for selection preview.                                                                                                                                         |
| focusedRange              | Object                              |               | It defines which range and step are focused. Common initial value is `[0, 0]`; first value is index of ranges, second one is which step on date range(startDate or endDate). |
| onRangeFocusChange        | Object                              |               | Callback function for focus changes                                                                                                                                          |
| preview                   | Object                              |               | displays a preview range and overwrite DateRange's default preview. Expected shape: `{ startDate: Date, endDate: Date, color: String }`                                      |
| showPreview               | bool                                | true          | visibility of preview                                                                                                                                                        |
| dragSelectionEnabled      | bool                                | true          | whether dates can be selected via drag n drop                                                                                                                                |
| onPreviewChange           | Object                              |               | Callback function for preview changes                                                                                                                                        |
| dateDisplayFormat         | String                              | `MMM D, YYYY` | selected range preview formatter. Check out [date-fns's format option]                                                                                                       |
| moveRangeOnFirstSelection | Boolean                             | false         | move range on startDate selection. Otherwise endDate will replace with startDate.                                                                                            |

## Defined Ranges

### Default DefinedRange

<div class="demo">
  <DemoDefinedRange />
</div>

### Custom DefinedRange

<div class="demo">
  <CustomDefinedRange />
</div>

| Property               | type                    | Default Value                                                                                                 | Desctiption                                                                                                                                                                                                   |
| ---------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| renderStaticRangeLabel | `Function(staticRange)` | null                                                                                                          | Callback function to be triggered for the static range configurations that have `hasCustomRendering: true` on them. Instead of rendering `staticRange.label`, return value of this callback will be rendered. |
| ranges                 | `RangeShape`            | null                                                                                                          | Ranges selected                                                                                                                                                                                               |
| staticRanges           | `Array<StaticRange>`    | [default preDefined ranges](https://github.com/kevindantas/react-date-range/blob/master/src/defaultRanges.js) | Pre defined ranges                                                                                                                                                                                            |
| rangeColors            | `Array<string>`         | `['#3d91ff', '#3ecf8e', '#fed14c']`                                                                           | Range colors                                                                                                                                                                                                  |
| inputRanges            | `Array<InputRange>`     | [default input ranges](https://github.com/kevindantas/react-date-range/blob/master/src/defaultRanges.js)      | Inputs used to select a range                                                                                                                                                                                 |
| headerContent          | `any`                   | -                                                                                                             | Header                                                                                                                                                                                                        |
| footerContent          | `any`                   | -                                                                                                             | Footer                                                                                                                                                                                                        |
| onPreviewChange        | `Function()`            | -                                                                                                             | Callback when change the preview                                                                                                                                                                              |
| onChange               | `Function(changeRange)` | -                                                                                                             | Callback function when change a selection                                                                                                                                                                     |

## Date Range Picker

The DateRangePicker component is the combination of both `DateRange` and `DefinedRanges` components.

### Demo

<div class="demo">
  <DemoDateRangePicker />
</div>

All props from `DateRange` and `DefinedRange` are supported for this component.

#### Shapes

```js
RangeShape {
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  color: PropTypes.string,
  key: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  showDateDisplay: PropTypes.bool,
}

InputShape {  
  label: String,
  range: Function(value) => ({ startDate: Date, endDate: Date })
  getCurrentValue: Function(range) => int,
}

StaticRange {
  label: string,
  range: Function() => ({ startDate: defineds.startOfToday, endDate: defineds.endOfToday, }),
},
```

### Infinite Scrolled Mode

To enable infinite scroll set `scroll={{enabled: true}}` basically. Infinite scroll feature is affected by `direction`(rendering direction for months) and `months`(for rendered months count) props directly.
If you prefer, you can overwrite calendar sizes with `calendarWidth`/`calendarHeight` or each month's height/withs with `monthWidth`/`monthHeight`/`longMonthHeight` at `scroll` prop.

```js
// shape of scroll prop
scroll: {
  enabled: PropTypes.bool,
  monthHeight: PropTypes.number,
  longMonthHeight: PropTypes.number, // some months has 1 more row than others
  monthWidth: PropTypes.number, // just used when direction="horizontal"
  calendarWidth: PropTypes.number, // defaults monthWidth * months
  calendarHeight: PropTypes.number, // defaults monthHeight * months
},
```
