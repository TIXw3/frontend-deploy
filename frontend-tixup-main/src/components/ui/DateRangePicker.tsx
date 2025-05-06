import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onRangeChange: (start: Date, end: Date) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onRangeChange,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedStart, setSelectedStart] = useState<Date | null>(startDate);
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(endDate);
  const [selecting, setSelecting] = useState<"start" | "end">("start");

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: days }, (_, i) => new Date(year, month, i + 1));
  };

  const getMonthStart = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1);
  };

  const monthDays = getDaysInMonth(currentMonth);
  const monthStart = getMonthStart(currentMonth);
  const monthStartDay = monthStart.getDay();

  const previousMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const handleDateClick = (date: Date) => {
    if (selecting === "start" || (selectedStart && date < selectedStart)) {
    setSelectedStart(date);
    setSelecting("end");
    if (selectedEnd && date > selectedEnd) {
    setSelectedEnd(null);
    }
   } else {
    setSelectedEnd(date);
    setSelecting("start");
    onRangeChange(selectedStart || date, date);
   }
  };

  const isDateSelected = (date: Date) => {
    if (!selectedStart && !selectedEnd) return false;

    if (selectedStart && !selectedEnd) {
    return date.toDateString() === selectedStart.toDateString();
    }

    if (selectedStart && selectedEnd) {
    return date >= selectedStart && date <= selectedEnd;
    }

    return false;
};

    const isDateStart = (date: Date) => {
    return (
    selectedStart && date.toDateString() === selectedStart.toDateString()
    );
};

    const isDateEnd = (date: Date) => {
    return selectedEnd && date.toDateString() === selectedEnd.toDateString();
};

const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
];

const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

return (
    <div className="bg-white rounded-md">
    <div className="flex items-center justify-between p-2">
        <button
        className="p-1 rounded-md hover:bg-gray-100"
        onClick={previousMonth}
        >
        <ChevronLeft size={18} className="text-gray-500" />
        </button>
        <h3 className="font-medium">
        {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
        className="p-1 rounded-md hover:bg-gray-100"
        onClick={nextMonth}
        >
        <ChevronRight size={18} className="text-gray-500" />
        </button>
    </div>

    <div className="grid grid-cols-7 gap-1 p-2">
        {dayNames.map((day, index) => (
        <div
            key={index}
            className="text-center text-xs font-medium text-gray-500 py-1"
        >
            {day}
        </div>
        ))}

        {Array.from({ length: monthStartDay }, (_, i) => (
        <div key={`empty-${i}`} className="h-8"></div>
        ))}

        {monthDays.map((date, index) => (
        <button
            key={index}
            className={`h-8 w-8 rounded-md flex items-center justify-center text-sm transition-colors ${
            isDateSelected(date)
                ? isDateStart(date)
                ? "bg-[#FF7A00] text-white"
                : isDateEnd(date)
                ? "bg-[#FF7A00] text-white"
                : "bg-orange-100 text-orange-800"
                : "hover:bg-gray-100"
            }`}
            onClick={() => handleDateClick(date)}
        >
            {date.getDate()}
        </button>
        ))}
    </div>

    <div className="flex justify-between items-center px-2 pb-2 pt-1 text-sm">
        <div>
        <strong>Início:</strong>{" "}
        {selectedStart
            ? selectedStart.toLocaleDateString("pt-BR")
            : "--/--/----"}
        </div>
        <div>
        <strong>Fim:</strong>{" "}
        {selectedEnd ? selectedEnd.toLocaleDateString("pt-BR") : "--/--/----"}
        </div>
    </div>
    </div>
);
};

export default DateRangePicker;
