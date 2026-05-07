import type { TimeRangePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;

const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
  if (dates) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
  } else {
    console.log('Clear');
  }
};

const rangePresets: TimeRangePickerProps['presets'] = [
  { label: 'Bugun', value: [dayjs(), dayjs()] },
];



function TwoChoosedDate () {
    return (
        <div>
        <Space vertical size={12}>
    <RangePicker presets={rangePresets} onChange={onRangeChange} />
  </Space>
  </div>
    )

} export default TwoChoosedDate