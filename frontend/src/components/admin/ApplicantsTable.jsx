import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  MoreHorizontal,
  User,
  Mail,
  Phone,
  FileText,
  Calendar,
  CheckCircle,
  XCircle,
  Download,
} from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    console.log("called");
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
      );
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getStatusIcon = (status) => {
    return status === "Accepted" ? (
      <CheckCircle className="h-3 w-3" />
    ) : (
      <XCircle className="h-3 w-3" />
    );
  };

  const getStatusColor = (status) => {
    return status === "Accepted" ? "text-green-600" : "text-red-600";
  };

  return (
    <div className="w-full">
      {/* Mobile View */}
      <div className="block md:hidden">
        {!applicants || applicants?.applications?.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No Applicants Yet
            </h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              No one has applied for this job yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {applicants?.applications?.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-300"
              >
                {/* Applicant Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base">
                      {item?.applicant?.fullname}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <Calendar className="h-3 w-3" />
                      <span>{item?.applicant?.createdAt?.split("T")[0]}</span>
                    </div>
                  </div>

                  {/* Actions Dropdown */}
                  <Popover>
                    <PopoverTrigger>
                      <div className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <MoreHorizontal className="h-4 w-4 text-gray-500" />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-2" align="end">
                      {shortlistingStatus.map((status, index) => (
                        <button
                          key={index}
                          onClick={() => statusHandler(status, item?._id)}
                          className={`flex items-center gap-2 w-full p-2 text-sm hover:bg-gray-100 rounded-lg transition-colors ${getStatusColor(status)}`}
                        >
                          {getStatusIcon(status)}
                          <span>Mark as {status}</span>
                        </button>
                      ))}
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-3.5 w-3.5 text-gray-400" />
                    <span className="truncate">{item?.applicant?.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-3.5 w-3.5 text-gray-400" />
                    <span>{item?.applicant?.phoneNumber}</span>
                  </div>
                </div>

                {/* Resume Section */}
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">Resume:</span>
                    </div>
                    {item.applicant?.profile?.resume ? (
                      <a
                        className="flex items-center gap-1 text-sm text-[#6A38C2] hover:text-[#5b30a6] hover:underline"
                        href={item?.applicant?.profile?.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download className="h-3 w-3" />
                        <span className="truncate max-w-[120px]">
                          {item?.applicant?.profile?.resumeOriginalName ||
                            "Download"}
                        </span>
                      </a>
                    ) : (
                      <span className="text-sm text-gray-400">NA</span>
                    )}
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
              A list of your recent applied users
            </TableCaption>
            <TableHeader className="bg-gray-50">
              <TableRow className="hover:bg-transparent border-b border-gray-200">
                <TableHead className="font-semibold text-gray-700 py-4 px-6">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Full Name
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-700 py-4 px-6">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-700 py-4 px-6">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Contact
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-700 py-4 px-6">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Resume
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-700 py-4 px-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Applied Date
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-700 py-4 px-6 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!applicants || applicants?.applications?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    <div className="flex flex-col items-center justify-center">
                      <User className="h-12 w-12 text-gray-300 mb-4" />
                      <p className="text-gray-500 text-lg font-medium">
                        No Applicants Found
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        No applications have been submitted for this job yet
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                applicants?.applications?.map((item) => (
                  <TableRow
                    key={item._id}
                    className="hover:bg-gray-50/50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <TableCell className="py-4 px-6 font-medium text-gray-900">
                      {item?.applicant?.fullname}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-600">
                      {item?.applicant?.email}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-600">
                      {item?.applicant?.phoneNumber}
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      {item.applicant?.profile?.resume ? (
                        <a
                          className="flex items-center gap-2 text-[#6A38C2] hover:text-[#5b30a6] hover:underline cursor-pointer"
                          href={item?.applicant?.profile?.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="h-4 w-4" />
                          <span className="truncate max-w-[200px]">
                            {item?.applicant?.profile?.resumeOriginalName ||
                              "View Resume"}
                          </span>
                        </a>
                      ) : (
                        <span className="text-gray-400">NA</span>
                      )}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-600">
                      {item?.applicant?.createdAt?.split("T")[0]}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-right">
                      <Popover>
                        <PopoverTrigger>
                          <div className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                            <MoreHorizontal className="h-4 w-4 text-gray-600" />
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 p-2" align="end">
                          {shortlistingStatus.map((status, index) => (
                            <button
                              key={index}
                              onClick={() => statusHandler(status, item?._id)}
                              className={`flex items-center gap-2 w-full p-2 text-sm hover:bg-gray-100 rounded-lg transition-colors ${getStatusColor(status)}`}
                            >
                              {getStatusIcon(status)}
                              <span>Mark as {status}</span>
                            </button>
                          ))}
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
        {applicants?.applications?.length > 0 && (
          <div className="mt-4 px-2">
            <p className="text-sm text-gray-500">
              Showing {applicants.applications.length} applicant
              {applicants.applications.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantsTable;
