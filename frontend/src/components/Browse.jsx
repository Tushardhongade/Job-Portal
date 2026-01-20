import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { Search, Briefcase } from "lucide-react";

const Browse = () => {
  useGetAllJobs();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-6 sm:py-8 lg:py-10">
          {/* Header */}
          <div className="mb-6 sm:mb-8 lg:mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                  {searchedQuery ? (
                    <>
                      Search Results for "
                      <span className="text-[#6A38C2]">{searchedQuery}</span>"
                    </>
                  ) : (
                    <>
                      Browse <span className="text-[#6A38C2]">All Jobs</span>
                    </>
                  )}
                </h1>
                <p className="text-gray-600 text-sm sm:text-base mt-2">
                  Discover opportunities that match your skills
                </p>
              </div>

              {/* Results Count Badge */}
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-[#6A38C2]" />
                <span className="font-medium text-gray-900">
                  {allJobs.length}
                </span>
                <span className="text-gray-600 text-sm sm:text-base">
                  jobs found
                </span>
              </div>
            </div>

            {/* Search Query Info */}
            {searchedQuery && (
              <div className="flex items-center gap-2 mt-4">
                <Search className="w-4 h-4 text-gray-400" />
                <p className="text-sm text-gray-600">
                  Showing results for:{" "}
                  <span className="font-medium text-[#6A38C2]">
                    {searchedQuery}
                  </span>
                </p>
                <button
                  onClick={() => dispatch(setSearchedQuery(""))}
                  className="text-xs text-gray-500 hover:text-gray-700 hover:underline ml-4"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>

          {/* Jobs Grid */}
          {allJobs.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12 lg:p-16 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-700 mb-2 sm:mb-3">
                No Jobs Available
              </h3>
              <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto">
                {searchedQuery
                  ? `No jobs found matching "${searchedQuery}"`
                  : "No job openings available at the moment. Check back soon!"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {allJobs.map((job) => (
                <div
                  key={job._id}
                  className="transform transition-transform duration-200 hover:-translate-y-1"
                >
                  <Job job={job} />
                </div>
              ))}
            </div>
          )}

          {/* Load More (Optional - Can be added later) */}
          {allJobs.length > 0 && (
            <div className="mt-10 sm:mt-12 lg:mt-16 text-center">
              <div className="text-sm text-gray-500">
                Showing all {allJobs.length} job
                {allJobs.length !== 1 ? "s" : ""}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
