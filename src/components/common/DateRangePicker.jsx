import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function DateRangePicker({
  range,
  setRange,
  onClose,
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl animate-slideUp">
      {/* Tabs (Dates / Months / Flexible) */}
      <div className="flex justify-center gap-2 mb-6">
        <button className="px-4 py-2 rounded-full bg-black text-white text-sm">
          Dates
        </button>
        <button className="px-4 py-2 rounded-full text-sm border">
          Months
        </button>
        <button className="px-4 py-2 rounded-full text-sm border">
          Flexible
        </button>
      </div>

      {/* Calendar */}
      <DayPicker
        mode="range"
        numberOfMonths={2}
        selected={range}
        onSelect={setRange}
        showOutsideDays
      />

      {/* Bottom quick options */}
      <div className="flex flex-wrap gap-2 mt-6 justify-center">
        {[
          "Exact dates",
          "± 1 day",
          "± 2 days",
          "± 3 days",
          "± 7 days",
          "± 14 days",
        ].map((t) => (
          <button
            key={t}
            className="px-4 py-2 rounded-full border text-sm hover:bg-gray-100"
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={onClose}
          className="px-6 py-2 bg-black text-white rounded-full"
        >
          Done
        </button>
      </div>
    </div>
  );
}
