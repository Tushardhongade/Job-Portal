import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { MapPin, Briefcase, DollarSign, Filter } from "lucide-react";

const fitlerData = [
  {
    fitlerType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    fitlerType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    fitlerType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  const getFilterIcon = (type) => {
    switch (type) {
      case "Location":
        return <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "Industry":
        return <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "Salary":
        return <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />;
      default:
        return null;
    }
  };

  const clearFilter = () => {
    setSelectedValue("");
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 sm:w-6 sm:h-6 text-[#6A38C2]" />
          <h1 className="font-bold text-lg sm:text-xl text-gray-900">
            Filter Jobs
          </h1>
        </div>

        {/* Clear Filter Button */}
        {selectedValue && (
          <button
            onClick={clearFilter}
            className="text-xs sm:text-sm text-[#6A38C2] hover:text-[#5b30a6] hover:underline transition-colors duration-200"
          >
            Clear
          </button>
        )}
      </div>

      {/* Active Filter Indicator */}
      {selectedValue && (
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-[#6A38C2]/5 to-[#F83002]/5 rounded-lg border border-[#6A38C2]/10">
          <p className="text-xs sm:text-sm text-gray-600">
            Active filter:{" "}
            <span className="font-semibold text-[#6A38C2]">
              {selectedValue}
            </span>
          </p>
        </div>
      )}

      <RadioGroup
        value={selectedValue}
        onValueChange={changeHandler}
        className="space-y-6 sm:space-y-8"
      >
        {fitlerData.map((data, index) => (
          <div key={index} className="space-y-3 sm:space-y-4">
            {/* Filter Type Header */}
            <div className="flex items-center gap-2">
              {getFilterIcon(data.fitlerType)}
              <h1 className="font-semibold text-base sm:text-lg text-gray-900">
                {data.fitlerType}
              </h1>
            </div>

            {/* Filter Options */}
            <div className="space-y-2 sm:space-y-3 pl-2 sm:pl-3">
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                const isSelected = selectedValue === item;

                return (
                  <div
                    key={idx}
                    className={`flex items-center space-x-3 p-2 sm:p-3 rounded-lg transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-r from-[#6A38C2]/10 to-[#F83002]/10 border border-[#6A38C2]/20"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <RadioGroupItem
                      value={item}
                      id={itemId}
                      className={`border-gray-300 ${isSelected ? "border-[#6A38C2]" : ""}`}
                    />
                    <Label
                      htmlFor={itemId}
                      className={`text-sm sm:text-base cursor-pointer flex-1 ${
                        isSelected
                          ? "font-medium text-gray-900"
                          : "text-gray-700"
                      }`}
                    >
                      {item}
                    </Label>

                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-[#6A38C2] animate-pulse"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>

      {/* No Filter Selected */}
      {!selectedValue && (
        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-gray-100 text-center">
          <p className="text-xs sm:text-sm text-gray-500">
            Select a filter to refine job results
          </p>
        </div>
      )}
    </div>
  );
};

export default FilterCard;
