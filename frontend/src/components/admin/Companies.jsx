import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";
import { Search, Building, Plus } from "lucide-react";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto py-6 sm:py-8 lg:py-10">
          {/* Header Section */}
          <div className="mb-6 sm:mb-8 lg:mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-8 h-8 sm:w-10 sm:h-10 text-[#6A38C2]" />
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                Company <span className="text-[#6A38C2]">Management</span>
              </h1>
            </div>
            <p className="text-gray-600 text-sm sm:text-base">
              Manage and search through all companies in your system
            </p>
          </div>

          {/* Search and Actions Bar */}
          <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Search Input */}
              <div className="relative w-full sm:w-auto sm:flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Filter companies by name..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="pl-10 pr-4 py-2.5 sm:py-3 w-full sm:w-96 border-gray-300 focus:border-[#6A38C2] focus:ring-[#6A38C2] transition-colors duration-300 text-sm sm:text-base rounded-lg"
                />
                {input && (
                  <button
                    onClick={() => setInput("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <span className="text-xs text-gray-500 hover:text-gray-700">
                      Clear
                    </span>
                  </button>
                )}
              </div>

              {/* New Company Button */}
              <Button
                onClick={() => navigate("/admin/companies/create")}
                className="w-full sm:w-auto bg-gradient-to-r from-[#6A38C2] to-[#8A4EDE] hover:from-[#5b30a6] hover:to-[#7a45c9] text-white shadow-lg hover:shadow-xl transition-all duration-300 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base"
              >
                <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                New Company
              </Button>
            </div>

            {/* Search Status */}
            {input && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  Showing results for:{" "}
                  <span className="font-medium text-[#6A38C2]">"{input}"</span>
                </p>
              </div>
            )}
          </div>

          {/* Companies Table Section */}
          <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Company Directory
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Browse and manage all registered companies
              </p>
            </div>
            <CompaniesTable />
          </div>

          {/* Footer Note */}
          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-xs sm:text-sm text-gray-500">
              Use the search to find specific companies or create new ones as
              needed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;
