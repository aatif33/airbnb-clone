import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

export default function DateRangePicker({
  range,
  setRange,
}) {
  return (
    <div className="animate-slideUp">
      {/* HEADER */}
      <div className="flex justify-center gap-2 mb-6">
        <button className="px-4 py-1 rounded-full bg-black text-white text-sm">
          Dates
        </button>
        <button className="px-4 py-1 rounded-full text-sm text-gray-500">
          Months
        </button>
        <button className="px-4 py-1 rounded-full text-sm text-gray-500">
          Flexible
        </button>
      </div>

      {/* CALENDAR */}
      <DayPicker
        mode="range"
        numberOfMonths={2}
        selected={range}
        onSelect={setRange}
        className="mx-auto"
      />

      {/* FOOTER */}
      <div className="flex flex-wrap gap-2 justify-center mt-6">
        {["Exact dates", "±1 day", "±2 days", "±3 days", "±7 days"].map(
          (opt) => (
            <button
              key={opt}
              className="border rounded-full px-4 py-2 text-sm hover:bg-gray-100"
            >
              {opt}
            </button>
          )
        )}
      </div>

      {/* SELECTED DATES */}
      {range?.from && (
        <p className="text-center text-sm mt-4 text-gray-600">
          {format(range.from, "dd MMM yyyy")}
          {range.to && ` → ${format(range.to, "dd MMM yyyy")}`}
        </p>
      )}
    </div>
  );
}
