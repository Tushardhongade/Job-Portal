import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Building,
  MapPin,
  Briefcase,
  DollarSign,
  Users,
  ArrowRight,
} from "lucide-react";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  // Format salary to show LPA
  const formatSalary = (salary) => {
    return salary ? `${salary} LPA` : "Not specified";
  };

  // Truncate description for better display
  const truncateDescription = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="group p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white border border-gray-200 hover:border-[#6A38C2]/30 cursor-pointer transition-all duration-300 hover:shadow-xl shadow-sm"
    >
      {/* Company Info */}
      <div className="flex items-start justify-between mb-4 sm:mb-5">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Building className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
            <h1 className="font-semibold text-base sm:text-lg text-gray-900 truncate">
              {job?.company?.name}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
            <p className="text-xs sm:text-sm text-gray-500 truncate">
              {job?.location || "India"}
            </p>
          </div>
        </div>

        {/* Arrow indicator */}
        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-300 group-hover:text-[#6A38C2] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
      </div>

      {/* Job Title & Description */}
      <div className="mb-4 sm:mb-5">
        <div className="flex items-center gap-2 mb-2">
          <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-[#6A38C2] flex-shrink-0" />
          <h1 className="font-bold text-lg sm:text-xl text-gray-900">
            {job?.title}
          </h1>
        </div>
        <p className="text-sm sm:text-base text-gray-600 line-clamp-3">
          {truncateDescription(job?.description, 120)}
        </p>
      </div>

      {/* Badges Section */}
      <div className="flex flex-wrap items-center gap-2 mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-gray-100">
        <Badge
          className="text-blue-700 font-semibold bg-blue-50 hover:bg-blue-50 px-3 py-1.5 text-xs sm:text-sm transition-colors"
          variant="secondary"
        >
          <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
          {job?.position || 1} Position{job?.position > 1 ? "s" : ""}
        </Badge>

        <Badge
          className="text-[#F83002] font-semibold bg-red-50 hover:bg-red-50 px-3 py-1.5 text-xs sm:text-sm transition-colors"
          variant="secondary"
        >
          <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
          {job?.jobType}
        </Badge>

        <Badge
          className="text-[#7209b7] font-semibold bg-purple-50 hover:bg-purple-50 px-3 py-1.5 text-xs sm:text-sm transition-colors"
          variant="secondary"
        >
          <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
          {formatSalary(job?.salary)}
        </Badge>
      </div>

      {/* Experience if available */}
      {job?.experience && (
        <div className="mt-3 sm:mt-4 pt-3 border-t border-gray-100">
          <span className="text-xs sm:text-sm text-gray-500">
            Experience:{" "}
            <span className="font-medium text-gray-700">{job.experience}</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default LatestJobCards;
