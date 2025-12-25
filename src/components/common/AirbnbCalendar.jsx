import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function AirbnbCalendar({ dateRange, setDateRange }) {
  return (
    <DateRange
      ranges={dateRange}
      onChange={(item) => setDateRange([item.selection])}
      months={2}
      direction="horizontal"
      showDateDisplay={false}
      rangeColors={["#FF385C"]}
      minDate={new Date()}
    />
  );
}
