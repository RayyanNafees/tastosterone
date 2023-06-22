import React, { useEffect } from "react";
import { checkAuth } from "../../../data/checkAuth";
import { useRouter } from "next/navigation";
import { ReactComponent as FamilySVG } from "../../../assets/family-4-people-svgrepo-com.svg";
import { ReactComponent as AdultSVG } from "../../../assets/men-2763099.svg";
import EnrollModal from "../../../components/EnrollModal";

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
    <div className="container mx-auto px-4">
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        <div className="border-2 flex flex-col items-center gap-3 justify-center p-4">
          <FamilySVG className="w-36 h-36 md:w-48 md:h-48 lg:w-56 lg:h-56" />
          <h3 className="text-lg font-semibold">Family and Child Student</h3>
          <EnrollModal />
        </div>
        <div className="border-2 flex flex-col items-center gap-3 justify-center p-4">
          <AdultSVG className="w-36 h-36 md:w-48 md:h-48 lg:w-56 lg:h-56" />
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
