import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Edit2,
  Eye,
  MoreHorizontal,
  Building,
  Calendar,
  Briefcase,
  Users,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  // Get company initials for avatar
  const getCompanyInitials = (companyName) => {
    if (!companyName) return "C";
    return companyName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="w-full">
      {/* Mobile View */}
      <div className="block md:hidden">
        {filterJobs.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No Jobs Found
            </h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              {searchJobByText
                ? `No jobs found for "${searchJobByText}"`
                : "No jobs posted yet"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filterJobs?.map((job) => (
              <div
                key={job._id}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-300"
              >
                {/* Company & Role */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-gray-200">
                      <AvatarImage
                        src={job?.company?.logo}
                        alt={job?.company?.name}
                      />
                      <AvatarFallback className="bg-gradient-to-r from-[#6A38C2] to-[#F83002] text-white text-xs">
                        {getCompanyInitials(job?.company?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate text-sm">
                        {job?.company?.name}
                      </h3>
                      <p className="text-gray-600 text-xs truncate">
                        {job?.title}
                      </p>
                    </div>
                  </div>

                  {/* Actions Dropdown */}
                  <Popover>
                    <PopoverTrigger>
                      <div className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <MoreHorizontal className="h-4 w-4 text-gray-500" />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-2" align="end">
                      <button
                        onClick={() => navigate(`/admin/companies/${job._id}`)}
                        className="flex items-center gap-2 w-full p-2 text-sm hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Edit2 className="h-4 w-4 text-gray-600" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center gap-2 w-full p-2 text-sm hover:bg-gray-100 rounded-lg transition-colors mt-1"
                      >
                        <Eye className="h-4 w-4 text-gray-600" />
                        <span>Applicants</span>
                      </button>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Details */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{job?.createdAt?.split("T")[0]}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{job?.applicants?.length || 0} applicants</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <Table>
            <TableCaption className="py-4 text-sm text-gray-500">
              A list of your recent posted jobs
            </TableCaption>
            <TableHeader className="bg-gray-50">
              <TableRow className="hover:bg-transparent border-b border-gray-200">
                <TableHead className="font-semibold text-gray-700 py-4 px-6">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Company Name
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-700 py-4 px-6">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Role
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-700 py-4 px-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Date Posted
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-700 py-4 px-6 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filterJobs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12">
                    <div className="flex flex-col items-center justify-center">
                      <Briefcase className="h-12 w-12 text-gray-300 mb-4" />
                      <p className="text-gray-500 text-lg font-medium">
                        No jobs found
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        {searchJobByText
                          ? `No results for "${searchJobByText}"`
                          : "Start by creating your first job posting"}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filterJobs?.map((job) => (
                  <TableRow
                    key={job._id}
                    className="hover:bg-gray-50/50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 border border-gray-200">
                          <AvatarImage
                            src={job?.company?.logo}
                            alt={job?.company?.name}
                          />
                          <AvatarFallback className="bg-gradient-to-r from-[#6A38C2] to-[#F83002] text-white text-xs">
                            {getCompanyInitials(job?.company?.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900">
                          {job?.company?.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <div className="font-medium text-gray-900">
                        {job?.title}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {job?.jobType}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-600">
                      {job?.createdAt?.split("T")[0]}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-right">
                      <Popover>
                        <PopoverTrigger>
                          <div className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                            <MoreHorizontal className="h-4 w-4 text-gray-600" />
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-40 p-2" align="end">
                          <button
                            onClick={() =>
                              navigate(`/admin/companies/${job._id}`)
                            }
                            className="flex items-center gap-2 w-full p-2 text-sm hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <Edit2 className="h-4 w-4 text-gray-600" />
                            <span>Edit Job</span>
                          </button>
                          <button
                            onClick={() =>
                              navigate(`/admin/jobs/${job._id}/applicants`)
                            }
                            className="flex items-center gap-2 w-full p-2 text-sm hover:bg-gray-100 rounded-lg transition-colors mt-1"
                          >
                            <Eye className="h-4 w-4 text-gray-600" />
                            <span>View Applicants</span>
                          </button>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Results Count */}
        {filterJobs.length > 0 && (
          <div className="mt-4 px-2">
            <p className="text-sm text-gray-500">
              Showing {filterJobs.length} job
              {filterJobs.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminJobsTable;
