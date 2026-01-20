import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Contact,
  Mail,
  Pen,
  User,
  Phone,
  FileText,
  Briefcase,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user?.fullname) return "U";
    return user.fullname
      .split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto py-6 sm:py-8 lg:py-10 space-y-6 sm:space-y-8 lg:space-y-10">
          {/* Profile Card */}
          <div className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                <Avatar className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 border-2 border-[#6A38C2]/20">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                    }
                    alt="profile"
                  />
                  <AvatarFallback className="bg-gradient-to-r from-[#6A38C2] to-[#F83002] text-white font-semibold text-lg">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left">
                  <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl text-gray-900">
                    {user?.fullname}
                  </h1>
                  {user?.profile?.bio && (
                    <p className="text-gray-600 text-sm sm:text-base mt-2 sm:mt-3 max-w-lg">
                      {user?.profile?.bio}
                    </p>
                  )}
                </div>
              </div>
              <Button
                onClick={() => setOpen(true)}
                variant="outline"
                className="w-full sm:w-auto mt-4 sm:mt-0 px-6 py-2.5 sm:py-3 rounded-lg border-[#6A38C2] text-[#6A38C2] hover:bg-[#6A38C2] hover:text-white transition-all duration-300"
              >
                <Pen className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Edit Profile
              </Button>
            </div>

            {/* Contact Info */}
            <div className="mt-8 sm:mt-10 space-y-4 sm:space-y-5">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center gap-2">
                <User className="h-5 w-5 text-[#6A38C2]" />
                Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl">
                  <Mail className="h-5 w-5 text-[#6A38C2]" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl">
                  <Phone className="h-5 w-5 text-[#6A38C2]" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">
                      {user?.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="mt-8 sm:mt-10">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-[#6A38C2]" />
                Skills
              </h2>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {user?.profile?.skills && user.profile.skills.length !== 0 ? (
                  user.profile.skills.map((item, index) => (
                    <Badge
                      key={index}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#6A38C2]/10 to-[#F83002]/10 text-[#6A38C2] hover:from-[#6A38C2]/20 hover:to-[#F83002]/20 border-0 text-sm sm:text-base"
                    >
                      {item}
                    </Badge>
                  ))
                ) : (
                  <div className="text-gray-500 text-sm sm:text-base bg-gray-50 px-4 py-3 rounded-lg">
                    No skills added yet
                  </div>
                )}
              </div>
            </div>

            {/* Resume Section */}
            <div className="mt-8 sm:mt-10">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#6A38C2]" />
                Resume
              </h2>
              <div className="p-4 sm:p-5 bg-gray-50 rounded-xl">
                {user?.profile?.resume ? (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <Label className="text-sm text-gray-500">
                        Uploaded Resume
                      </Label>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={user.profile.resume}
                        className="text-[#6A38C2] hover:text-[#5b30a6] font-medium hover:underline cursor-pointer text-sm sm:text-base block mt-1"
                      >
                        {user.profile.resumeOriginalName || "View Resume"}
                      </a>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto"
                      onClick={() => setOpen(true)}
                    >
                      <Pen className="h-4 w-4 mr-2" />
                      Update Resume
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <Label className="text-sm text-gray-500">
                        Resume Status
                      </Label>
                      <p className="text-gray-600 text-sm sm:text-base mt-1">
                        No resume uploaded
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto"
                      onClick={() => setOpen(true)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Upload Resume
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Applied Jobs Section */}
          <div className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6 sm:mb-8">
              <h1 className="font-bold text-xl sm:text-2xl text-gray-900">
                Applied Jobs
              </h1>
              <Badge className="bg-[#6A38C2] text-white px-3 py-1 text-sm">
                {user?.appliedJobs?.length || 0}
              </Badge>
            </div>
            <AppliedJobTable />
          </div>
        </div>
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
