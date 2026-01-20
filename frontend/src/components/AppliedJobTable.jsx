import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import {
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  Building,
  Briefcase,
} from "lucide-react";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="h-3 w-3 sm:h-4 sm:w-4" />;
      case "accepted":
        return <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />;
      case "rejected":
        return <XCircle className="h-3 w-3 sm:h-4 sm:w-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Mobile View */}
      <div className="block md:hidden">
        {allAppliedJobs.length <= 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No Applications Yet
            </h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              You haven't applied to any jobs yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {allAppliedJobs.map((appliedJob) => (
              <div
                key={appliedJob._id}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-base truncate">
                      {appliedJob.job?.title}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">
                      {appliedJob.job?.company?.name}
                    </p>
                  </div>
                  <Badge
                    className={`${getStatusColor(appliedJob.status)} px-3 py-1 text-xs font-medium border`}
                  >
                    <span className="flex items-center gap-1">
                      {getStatusIcon(appliedJob.status)}
                      {appliedJob.status.toUpperCase()}
                    </span>
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{appliedJob?.createdAt?.split("T")[0]}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Building className="h-3.5 w-3.5" />
                    <span>{appliedJob.job?.company?.location || "N/A"}</span>
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
              A list of your applied jobs
            </TableCaption>
            <TableHeader className="bg-gray-50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold text-gray-700 py-3 px-4 sm:px-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Date Applied
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-700 py-3 px-4 sm:px-6">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Job Role
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-700 py-3 px-4 sm:px-6">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Company
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-700 py-3 px-4 sm:px-6 text-right">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allAppliedJobs.length <= 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12">
                    <div className="flex flex-col items-center justify-center">
                      <Briefcase className="h-12 w-12 text-gray-300 mb-4" />
                      <p className="text-gray-500 text-lg font-medium">
                        You haven't applied to any jobs yet.
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        Start applying to see your applications here
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                allAppliedJobs.map((appliedJob) => (
                  <TableRow
                    key={appliedJob._id}
                    className="hover:bg-gray-50/50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <TableCell className="py-4 px-4 sm:px-6 text-gray-600">
                      {appliedJob?.createdAt?.split("T")[0]}
                    </TableCell>
                    <TableCell className="py-4 px-4 sm:px-6">
                      <div className="font-medium text-gray-900">
                        {appliedJob.job?.title}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-4 sm:px-6 text-gray-600">
                      {appliedJob.job?.company?.name}
                    </TableCell>
                    <TableCell className="py-4 px-4 sm:px-6 text-right">
                      <Badge
                        className={`${getStatusColor(appliedJob.status)} px-3 py-1.5 font-medium border hover:shadow-sm transition-shadow`}
                      >
                        <span className="flex items-center gap-1.5 justify-end">
                          {getStatusIcon(appliedJob.status)}
                          {appliedJob.status.toUpperCase()}
                        </span>
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AppliedJobTable;
