import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useSearchParams } from "react-router";

function ChoosedDate() {
  const [searchParams, setSearchParams] = useSearchParams();
  const onChoosedDate = (value: any) => {
    value
      ? searchParams.set("choosedDate", dayjs(value).format("YYYY-MM-DD"))
      : searchParams.delete("choosedDate");
    setSearchParams(searchParams);
  };
  return (
    <div>
      <DatePicker
        value={
          searchParams.get("choosedDate")
            ? dayjs(searchParams.get("choosedDate"))
            : undefined
        }
        onChange={onChoosedDate}
        needConfirm
        allowClear
      />
    </div>
  );
}
export default ChoosedDate;
