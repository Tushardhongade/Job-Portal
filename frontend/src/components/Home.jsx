import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "./shared/Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]); // Added dependencies for better useEffect practice

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50/30">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full">
        {/* Hero Section - Full width */}
        <section className="w-full">
          <HeroSection />
        </section>

        {/* Category Carousel with responsive padding */}
        <section className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="py-8 md:py-12">
            <CategoryCarousel />
          </div>
        </section>

        {/* Latest Jobs with responsive padding */}
        <section className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="py-8 md:py-12">
            <LatestJobs />
          </div>
        </section>
      </main>

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
