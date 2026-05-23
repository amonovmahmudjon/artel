import type { TimeRangePickerProps } from "antd";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import { useSearchParams } from "react-router";

function StartEndate() {
  const { RangePicker } = DatePicker;
  const dateFormat = "YYYY-MM-DD";
  const [searchParams, setSearchParams] = useSearchParams();
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const onRangeChange = (dates: any) => {
    console.log(dates);

    if (dates) {
      searchParams.set("startDate", dayjs(dates[0]).format(dateFormat));
      searchParams.set("endDate", dayjs(dates[1]).format(dateFormat));
    } else {
      searchParams.delete("startDate");
      searchParams.delete("endDate");
    }
    setSearchParams(searchParams);
  };

  const rangePresets: TimeRangePickerProps["presets"] = [
    { label: "Bugun", value: [dayjs().startOf("day"), dayjs().endOf("day")] },
    {
      label: "Shu oy",
      value: [dayjs().startOf("month"), dayjs().endOf("month")],
    },
    { label: "O'tkan oy", value: [dayjs().add(-30, "d"), dayjs()] },
    { label: "O'tkan uch oy", value: [dayjs().add(-90, "d"), dayjs()] },
  ];
  return (
    <div>
      <Space size={12}>
        <RangePicker
          presets={rangePresets}
          value={
            startDate && endDate
              ? [dayjs(startDate), dayjs(endDate)]
              : undefined
          }
          onChange={onRangeChange}
          allowClear
        />
      </Space>
    </div>
  );
}
export default StartEndate;
