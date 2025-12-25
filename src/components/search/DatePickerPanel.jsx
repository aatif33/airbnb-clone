import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function DatePickerPanel({ dateRange, setDateRange }) {
  return (
    <div className="animate-slideUp">
      <DateRange
        ranges={dateRange}
        onChange={(item) => setDateRange([item.selection])}
        months={2}
        direction="horizontal"
        showDateDisplay={false}
        minDate={new Date()}
      />

      <div className="flex flex-wrap gap-2 mt-4">
        {["Exact dates", "±1 day", "±2 days", "±3 days", "±7 days", "±14 days"].map(
          (opt) => (
            <button
              key={opt}
              className="border px-4 py-1 rounded-full text-sm hover:bg-gray-100"
            >
              {opt}
            </button>
          )
        )}
      </div>
    </div>
  );
}
