"use client";

import * as React from "react";
import {
  format,
  parse,
  isValid,
  setMonth as setDateMonth,
  setYear as setDateYear,
} from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SmartDatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

export function SmartDatePicker({
  date,
  setDate,
  placeholder,
  className,
}: SmartDatePickerProps) {
  const [inputValue, setInputValue] = React.useState("");
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const [viewDate, setViewDate] = React.useState<Date>(date || new Date());

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentYear = new Date().getFullYear();
  // Range: 100 Years back -> Current Year (e.g., 1925 - 2025)
  // const years = Array.from(
  //   { length: 100 },
  //   (_, i) => currentYear - 100 + i + 1
  // );

  // Range: 1945 - 2045 (Covers older birthdates AND future due dates)
  const years = Array.from({ length: 100 }, (_, i) => currentYear - 80 + i);

  // Sync Input
  React.useEffect(() => {
    if (date) {
      setInputValue(format(date, "dd/MM/yyyy"));
      setViewDate(date);
    } else {
      setInputValue("");
    }
  }, [date]);

  // Handle Input Typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    const parsedDate = parse(val, "dd/MM/yyyy", new Date());
    if (isValid(parsedDate) && val.length === 10) {
      setDate(parsedDate);
      setViewDate(parsedDate);
    } else if (val === "") {
      setDate(undefined);
    }
  };

  // Handle Calendar Click
  const handleCalendarSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      setInputValue(format(newDate, "dd/MM/yyyy"));
      setIsPopoverOpen(false);
    }
  };

  // Header Handlers
  const handleMonthChange = (monthStr: string) => {
    setViewDate(setDateMonth(viewDate, months.indexOf(monthStr)));
  };

  const handleYearChange = (yearStr: string) => {
    setViewDate(setDateYear(viewDate, parseInt(yearStr)));
  };

  return (
    <div className={cn("relative flex items-center w-full md:w-45", className)}>
      <div className="relative w-full">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder || "DD/MM/YYYY"}
          className="pl-10 pr-8 h-10 font-bold text-slate-700 bg-white border-slate-200 focus-visible:ring-2 focus-visible:ring-blue-500/20 transition-all text-sm"
          maxLength={10}
        />

        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-0 h-10 w-10 text-slate-400 hover:text-blue-600 hover:bg-transparent cursor-pointer"
            >
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className="w-auto p-3 shadow-xl border-slate-100 rounded-xl bg-white"
            align="start"
          >
            {/* Custom Header */}
            <div className="flex gap-2 mb-2 p-1 bg-slate-50 rounded-lg border border-slate-100">
              <Select
                value={months[viewDate.getMonth()]}
                onValueChange={handleMonthChange}
              >
                <SelectTrigger className="h-8 w-[120px] text-xs font-bold bg-white border-slate-200 shadow-sm focus:ring-0 cursor-pointer">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px] bg-white border-slate-200 shadow-md">
                  {months.map((m) => (
                    <SelectItem
                      key={m}
                      value={m}
                      className="text-xs cursor-pointer"
                    >
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={viewDate.getFullYear().toString()}
                onValueChange={handleYearChange}
              >
                <SelectTrigger className="h-8 w-20 text-xs font-bold bg-white border-slate-200 shadow-sm focus:ring-0 cursor-pointer">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px] bg-white border-slate-200 shadow-md">
                  {years.map((y) => (
                    <SelectItem
                      key={y}
                      value={y.toString()}
                      className="text-xs cursor-pointer"
                    >
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Calendar */}
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleCalendarSelect}
              month={viewDate}
              onMonthChange={setViewDate}
              initialFocus
              // --- PREMIUM STYLING ---
              modifiers={{
                future: { after: new Date() }, // Define "future" as after today
              }}
              modifiersClassNames={{
                future: "text-slate-400 bg-slate-50/30 decoration-slate-300", // Style future dates differently
              }}
              className="rounded-md border-0"
              classNames={{
                month: "space-y-4",
                caption: "hidden", // Hide default header
                nav: "hidden", // Hide default arrows (optional, since we have dropdowns)
                head_cell:
                  "text-slate-400 font-bold text-[0.7rem] uppercase tracking-wider",
                cell: "text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
                day: "h-9 w-9 p-0 font-medium aria-selected:opacity-100 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors cursor-pointer",
                day_selected:
                  "bg-blue-600 text-white hover:bg-blue-700 hover:text-white shadow-md shadow-blue-500/30",
                day_today:
                  "bg-slate-100 text-slate-900 font-bold ring-1 ring-slate-300", // Highlight Today
              }}
            />
          </PopoverContent>
        </Popover>

        {inputValue && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setDate(undefined);
              setInputValue("");
            }}
            className="absolute right-0 top-0 h-10 w-8 text-slate-300 hover:text-red-500 hover:bg-transparent cursor-pointer"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  );
}
