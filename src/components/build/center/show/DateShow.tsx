import { observer } from "mobx-react";
import React from "react";
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { Build } from "store";
import { IRowConfig } from "../../../../models/build";
import { onFormatDate } from "util/build";

interface IProps {
  build: Build,
  rowConfig: IRowConfig,
}

interface IState {
  value?: Date | null;
}

const DayPickerStrings: IDatePickerStrings = {
  months: ['1月', '2月', '3月', '4月', '5月', '6月', '七月', '八月', '九月', '10月', '11月', '12月'],
  shortMonths: ['1月', '2月', '3月', '4月', '5月', '6月', '七月', '八月', '九月', '10月', '11月', '12月'],
  days: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  shortDays: ['日', '一', '二', '三', '四', '五', '六'],
  goToToday: '当前',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',
  closeButtonAriaLabel: 'Close date picker',
  isRequiredErrorMessage: 'Start date is required.',
  invalidInputErrorMessage: 'Invalid date format.'
};

const controlClass = mergeStyleSets({
  control: {
    margin: '0 0 15px 0',
    maxWidth: '300px'
  }
});

@observer
export default class DateShow extends  React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      value: null
    };
  }

  private _onSelectDate = (date: Date | null | undefined): void => {
    this.setState({ value: date });
  };

  private _onParseDateFromString = (value: string): Date => {
    const date = this.state.value || new Date();
    const values = (value || '').trim().split('/');
    const day = values.length > 0 ? Math.max(1, Math.min(31, parseInt(values[0], 10))) : date.getDate();
    const month = values.length > 1 ? Math.max(1, Math.min(12, parseInt(values[1], 10))) - 1 : date.getMonth();
    let year = values.length > 2 ? parseInt(values[2], 10) : date.getFullYear();
    if (year < 100) {
      year += date.getFullYear() - (date.getFullYear() % 100);
    }
    return new Date(year, month, day);
  };

  render() {
    const { rowConfig } = this.props;
    const { value } = this.state;
    const { defaultValue, color, fontSize, textAlign } = rowConfig;
    return (
      <div style={{ color, fontSize, textAlign }}>
        <DatePicker
          className={controlClass.control}
          isRequired={false}
          allowTextInput={true}
          firstDayOfWeek={DayOfWeek.Sunday}
          strings={DayPickerStrings}
          value={value!}
          onSelectDate={this._onSelectDate}
          formatDate={onFormatDate}
          parseDateFromString={this._onParseDateFromString}
        />
      </div>
    );
  }
}
