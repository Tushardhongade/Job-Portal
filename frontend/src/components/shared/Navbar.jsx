import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import {
  LogOut,
  User2,
  Briefcase,
  Building,
  Home,
  Search,
  Menu,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
        setMobileMenuOpen(false); // Close mobile menu after logout
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user?.fullname) return "JP";
    return user.fullname
      .split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Navigation items based on user role
  const navItems =
    user && user.role === "recruiter"
      ? [
          {
            to: "/admin/companies",
            label: "Companies",
            icon: <Building className="w-4 h-4" />,
          },
          {
            to: "/admin/jobs",
            label: "Jobs",
            icon: <Briefcase className="w-4 h-4" />,
          },
        ]
      : [
          { to: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
          {
            to: "/jobs",
            label: "Jobs",
            icon: <Briefcase className="w-4 h-4" />,
          },
          {
            to: "/browse",
            label: "Browse",
            icon: <Search className="w-4 h-4" />,
          },
        ];

  return (
    <div className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-20 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#6A38C2] to-[#F83002] bg-clip-text text-transparent">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          <ul className="flex font-medium items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="flex items-center gap-2 text-gray-700 hover:text-[#6A38C2] transition-colors duration-200 group"
                >
                  {item.icon}
                  <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#6A38C2] after:transition-all after:duration-300 hover:after:w-full">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Auth buttons / User Menu */}
          {!user ? (
            <div className="flex items-center gap-3 lg:gap-4">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-[#6A38C2] text-[#6A38C2] hover:bg-[#6A38C2] hover:text-white transition-all duration-300 px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-[#6A38C2] to-[#8A4EDE] hover:from-[#5b30a6] hover:to-[#7a45c9] text-white shadow-lg hover:shadow-xl transition-all duration-300 px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <div className="relative group cursor-pointer">
                  <Avatar className="cursor-pointer w-10 h-10 sm:w-12 sm:h-12 border-2 border-transparent group-hover:border-[#6A38C2] transition-all duration-300 shadow-md hover:shadow-lg">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt={user?.fullname || "User"}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-gradient-to-r from-[#6A38C2] to-[#F83002] text-white font-semibold text-sm">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
              </PopoverTrigger>
              <PopoverContent
                className="w-72 p-4 border-0 shadow-xl rounded-xl bg-white"
                align="end"
              >
                <div className="space-y-4">
                  {/* User profile section */}
                  <div className="flex gap-3 items-center pb-3 border-b border-gray-100">
                    <Avatar className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-[#6A38C2]/20">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt={user?.fullname || "User"}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-gradient-to-r from-[#6A38C2] to-[#F83002] text-white font-semibold">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                        {user?.fullname}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 truncate max-w-[150px]">
                        {user?.email}
                      </p>
                      <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-[#6A38C2]/10 text-[#6A38C2] rounded-full capitalize">
                        {user?.role}
                      </span>
                    </div>
                  </div>

                  {/* Menu options */}
                  <div className="space-y-2">
                    {user && user.role === "student" && (
                      <Link to="/profile">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-gray-700 hover:text-[#6A38C2] hover:bg-[#6A38C2]/5 transition-colors text-sm sm:text-base"
                        >
                          <User2 className="w-4 h-4 mr-3" />
                          <span className="font-medium">View Profile</span>
                        </Button>
                      </Link>
                    )}

                    <Button
                      onClick={logoutHandler}
                      variant="ghost"
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors text-sm sm:text-base"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      <span className="font-medium">Logout</span>
                    </Button>
                  </div>

                  {/* User bio if exists */}
                  {user?.profile?.bio && (
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-xs sm:text-sm text-gray-600 italic">
                        "{user.profile.bio}"
                      </p>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile menu button - Visible only on mobile */}
        <div className="md:hidden flex items-center gap-3">
          {user ? (
            <div className="relative group cursor-pointer mr-2">
              <Avatar className="cursor-pointer w-10 h-10 border-2 border-transparent group-hover:border-[#6A38C2] transition-all duration-300 shadow-md">
                <AvatarImage
                  src={user?.profile?.profilePhoto}
                  alt={user?.fullname || "User"}
                  className="object-cover"
                />
                <AvatarFallback className="bg-gradient-to-r from-[#6A38C2] to-[#F83002] text-white font-semibold text-sm">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
          ) : null}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="text-gray-700 hover:text-[#6A38C2] hover:bg-gray-100"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu - Slide in from top */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-in slide-in-from-top-5 duration-300">
          <div className="px-4 py-6 space-y-6">
            {/* Mobile Navigation Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-2">
                Navigation
              </h3>
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:text-[#6A38C2] hover:bg-[#6A38C2]/5 transition-colors duration-200 group"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="text-[#6A38C2]">{item.icon}</div>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Auth Section */}
            <div className="pt-4 border-t border-gray-100 space-y-4">
              {!user ? (
                <>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-2">
                    Account
                  </h3>
                  <div className="space-y-3 px-2">
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full border-[#6A38C2] text-[#6A38C2] hover:bg-[#6A38C2] hover:text-white transition-all duration-300 py-3"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-[#6A38C2] to-[#8A4EDE] hover:from-[#5b30a6] hover:to-[#7a45c9] text-white shadow-lg hover:shadow-xl transition-all duration-300 py-3">
                        Signup
                      </Button>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-2">
                    Profile
                  </h3>
                  {/* Mobile User Info */}
                  <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg mx-2">
                    <Avatar className="w-12 h-12 border-2 border-[#6A38C2]/20">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt={user?.fullname || "User"}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-gradient-to-r from-[#6A38C2] to-[#F83002] text-white font-semibold">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 truncate">
                        {user?.fullname}
                      </h4>
                      <p className="text-sm text-gray-500 truncate">
                        {user?.email}
                      </p>
                      <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-[#6A38C2]/10 text-[#6A38C2] rounded-full capitalize">
                        {user?.role}
                      </span>
                    </div>
                  </div>

                  {/* Mobile User Actions */}
                  <div className="space-y-2 px-2">
                    {user && user.role === "student" && (
                      <Link
                        to="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-gray-700 hover:text-[#6A38C2] hover:bg-[#6A38C2]/5 transition-colors py-3"
                        >
                          <User2 className="w-5 h-5 mr-3" />
                          <span className="font-medium">View Profile</span>
                        </Button>
                      </Link>
                    )}

                    <Button
                      onClick={() => {
                        logoutHandler();
                        setMobileMenuOpen(false);
                      }}
                      variant="ghost"
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors py-3"
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      <span className="font-medium">Logout</span>
                    </Button>
                  </div>

                  {/* Mobile User Bio */}
                  {user?.profile?.bio && (
                    <div className="px-4 pt-3 border-t border-gray-100">
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">
                        About
                      </h4>
                      <p className="text-sm text-gray-600 italic">
                        "{user.profile.bio}"
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
