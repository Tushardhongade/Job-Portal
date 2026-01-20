import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto mt-6 sm:mt-8 lg:mt-10">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Filter Card - Responsive */}
            <div className="w-full lg:w-1/4">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="sticky top-24"
              >
                <FilterCard />
              </motion.div>
            </div>

            {/* Jobs List - Responsive */}
            <div className="w-full lg:w-3/4">
              {/* Search Results Info */}
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {searchedQuery ? (
                    <>
                      Search Results for "
                      <span className="text-[#6A38C2]">{searchedQuery}</span>"
                    </>
                  ) : (
                    <>
                      All <span className="text-[#6A38C2]">Job</span>{" "}
                      Opportunities
                    </>
                  )}
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  {filterJobs.length} job{filterJobs.length !== 1 ? "s" : ""}{" "}
                  found
                </p>
              </div>

              {/* Jobs Grid */}
              {filterJobs.length <= 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
                    No jobs found
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto">
                    {searchedQuery
                      ? `No jobs found for "${searchedQuery}"`
                      : "No jobs available at the moment"}
                  </p>
                </motion.div>
              ) : (
                <div className="h-[calc(100vh-200px)] lg:h-[88vh] overflow-y-auto pr-2 pb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {filterJobs.map((job) => (
                      <motion.div
                        key={job?._id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        className="transform transition-all duration-200"
                      >
                        <Job job={job} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
