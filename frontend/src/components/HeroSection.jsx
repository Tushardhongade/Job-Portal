import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search, Sparkles, Trophy, Users } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(setSearchedQuery(query));
      navigate("/browse");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchJobHandler(e);
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#6A38C2]/5 via-white to-[#F83002]/5"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-[#6A38C2]/10 to-[#F83002]/10 text-[#6A38C2] font-semibold mb-6 sm:mb-8 animate-pulse">
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">No. 1 Job Hunt Website</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
            Search, Apply & Get Your{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#6A38C2] to-[#F83002] bg-clip-text text-transparent">
                Dream Job
              </span>
              <Sparkles className="absolute -top-2 -right-4 sm:-right-6 w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 animate-bounce" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-10 px-4">
            Discover thousands of job opportunities with all the information you
            need. Your career journey starts here.
          </p>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto px-4">
            <div className="relative">
              <form
                onSubmit={searchJobHandler}
                className="flex flex-col sm:flex-row gap-4"
              >
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Job title, keyword, or company"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-4 py-3 sm:py-4 text-sm sm:text-base bg-white border border-gray-300 rounded-xl sm:rounded-l-xl sm:rounded-r-none shadow-lg focus:outline-none focus:ring-2 focus:ring-[#6A38C2] focus:border-transparent transition-all"
                  />
                </div>
                <Button
                  type="submit"
                  onClick={searchJobHandler}
                  className="bg-gradient-to-r from-[#6A38C2] to-[#8A4EDE] hover:from-[#5b30a6] hover:to-[#7a45c9] text-white shadow-lg hover:shadow-xl rounded-xl sm:rounded-r-xl sm:rounded-l-none py-3 sm:py-4 px-6 sm:px-8 text-sm sm:text-base font-semibold transition-all duration-300"
                >
                  <Search className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Search Jobs
                </Button>
              </form>
            </div>

            {/* Popular Searches */}
            <div className="mt-6 sm:mt-8">
              <p className="text-sm text-gray-500 mb-3">Popular searches:</p>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {[
                  "React Developer",
                  "Data Analyst",
                  "UI/UX Designer",
                  "DevOps Engineer",
                  "Marketing Manager",
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setQuery(tag);
                      dispatch(setSearchedQuery(tag));
                      navigate("/browse");
                    }}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-xs sm:text-sm transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-10 sm:mt-16 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-100">
              <div className="text-2xl sm:text-3xl font-bold text-[#6A38C2]">
                10K+
              </div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1">
                Job Listings
              </div>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-100">
              <div className="text-2xl sm:text-3xl font-bold text-[#F83002]">
                500+
              </div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1">
                Companies
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1 bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-100">
              <div className="text-2xl sm:text-3xl font-bold text-[#6A38C2]">
                2K+
              </div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1">
                Hired This Month
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-[#6A38C2]/10 rounded-full blur-xl hidden md:block"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#F83002]/10 rounded-full blur-xl hidden md:block"></div>
    </div>
  );
};

export default HeroSection;
