'use client'
import React, { useEffect } from "react";
import { checkAuth } from "@/app/data/checkAuth";
import { useRouter } from "next/navigation";
// import { ReactComponent as FamilySVG } from "@/app/assets/family-4-people-svgrepo-com.svg";
// import { ReactComponent as AdultSVG } from "@/app/assets/men-2763099.svg";
import EnrollModal from "@/app/components/EnrollModal";

const Enroll = () => {
  const navigate = useRouter();

  useEffect(() => {
    localStorage.removeItem("familyEmail");
    localStorage.removeItem("familyID");
    checkAuth().then(() => {
      if (localStorage.getItem("isLoggedIn") !== "true") {
        navigate.push("/auth/login");
      }
    });
  }, []);

  const goToIndependentStudentReg = () => {
    navigate.push("/master-admin/add-independent-student");
  };

  return (
    <div className="container px-4 mx-auto">
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        <div className="flex flex-col items-center justify-center gap-3 p-4 border-2">
          {/* <FamilySVG className="w-36 h-36 md:w-48 md:h-48 lg:w-56 lg:h-56" /> */}
          <img src='family-4-people-svgrepo-com.svg' className="w-36 h-36 md:w-48 md:h-48 lg:w-56 lg:h-56" />
          <h3 className="text-lg font-semibold">Family and Child Student</h3>
          <EnrollModal />
        </div>
        <div className="flex flex-col items-center justify-center gap-3 p-4 border-2">
          <img src='/men-2763099.svg' className="w-36 h-36 md:w-48 md:h-48 lg:w-56 lg:h-56" />
          {/* <AdultSVG className="w-36 h-36 md:w-48 md:h-48 lg:w-56 lg:h-56" /> */}
          <h3 className="text-lg font-semibold">Independent (Adult) Student</h3>
          <button
            className="text-base font-semibold button"
            onClick={goToIndependentStudentReg}
          >
            Register
          </button>
        </div>
      </section>
    </div>
  );
};

export default Enroll;
