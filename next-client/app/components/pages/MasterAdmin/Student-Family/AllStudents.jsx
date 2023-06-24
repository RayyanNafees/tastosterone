'use client'
import React, { useState, useEffect } from "react";
import Badge from "@/app/components/Badge";
import { Link } from "next/link";
import { BsFilter } from "react-icons/bs";
import { checkAuth } from "@/app/data/checkAuth";
import { useRouter } from "next/navigation";
import { baseURL } from "@/app/data/url";
import { authConfig } from "@/app/data/authConfig";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const AllStudents = () => {
  const [studentLists, setStudentLists] = useState([]);

  const navigate = useRouter();
  const config = authConfig();
  const branch = JSON.parse(localStorage.getItem("branchInfo"))["id"];
  useEffect(() => {
    checkAuth().then(() => {
      if (localStorage.getItem("isLoggedIn") !== "true") {
        navigate.push("/auth/login");
      }
    });
  }, []);

  // this function handles btn navigating to enrolling page
  const handleStdEnroll = () => {
    navigate.push("/master-admin/enroll");
  };

  useEffect(() => {
    axios
      .get(`${baseURL}get-list/students/${branch}`, config)
      .then((resp) => {
        setStudentLists(JSON.parse(resp.data).reverse());
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const StudentTable = () => {
    return (
      <div className="overflow-auto mt-5">
        <table className="w-full text-[#1F2937] tracking-[-0.02rem]">
          <thead className="bg-[#F3F4F6] font-semibold">
            <tr className="text-center">
              <th>
                <input type="checkbox" />
              </th>
              <th className="whitespace-nowrap p-3 text-left">Name</th>
              <th className="whitespace-nowrap p-3 text-left">Class(es)</th>
              <th className="whitespace-nowrap p-3 text-left">Contact</th>
              <th className="whitespace-nowrap p-3 text-left">Email</th>
              <th className="whitespace-nowrap p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="whitespace-nowrap text-sm divide-y divide-gray-300">
            {studentLists.map((student) => {
              return (
                <tr key={uuidv4()}>
                  <td className="p-3">
                    <input type="checkbox" />
                  </td>

                  {/* I have to discuss the look of the tables on mobile because of how long class names can get */}
                  {/* a good solution is to make limit to how long a class name can get or make use of cards instead of tables */}
                  <td className="p-3">
                    <span className="flex gap-2 items-center">
                      <img
                        src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
                        className="rounded-full w-10"
                      />
                      <p className="xs:mr-9 md:mr-0 font-bold">
                        <Link
                          href={`/master-admin/student-profile/${student.id}`}
                        >
                          {`${student.firstName} ${student.lastName}`}
                        </Link>
                      </p>
                    </span>
                  </td>
                  <td className="p-3">4</td>
                  <td className="p-3">{student.phoneNumber}</td>
                  <td className="p-3">{student.email}</td>
                  <td className="p-3">
                    <Badge status="inactive" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const FilterStudent = () => {
    return (
      <div className="flex flex-col md:flex-row items-center md:justify-between mt-5 mb-9">
        <span className="self-start flex items-center gap-2">
          <BsFilter />
          <p>Filter</p>
        </span>
        <span className="flex gap-3 flex-wrap ">
          <select className="w-[13.75rem] border border-[#6B7280] rounded h-[2.50rem] p-2">
            <option disabled selected>
              Select class
            </option>
            <option>Physics</option>
            <option>math</option>
            <option>Chemistry</option>
          </select>
          <select className="w-[13.75rem] border border-[#6B7280] rounded h-[2.50rem] p-2">
            <option disabled selected>
              select invoice
            </option>
            <option>Paid</option>
            <option>Overdue</option>
            <option>expired</option>
          </select>
          <select className="w-[13.75rem] border border-[#6B7280] rounded h-[2.50rem] p-2">
            <option disabled selected>
              Select tutor
            </option>
            <option>Mr. Micheal</option>
            <option>Mr. John</option>
            <option>Mr. Ankush</option>
          </select>
          <button className="button h-[38px] text-center py-[5px] px-[62px]">
            Apply
          </button>
        </span>
      </div>
    );
  };
  return (
    <div>
      <span className="flex flex-col gap-2">
        <h1 className="font-semibold text-[16px] text-[#031F42]">Students</h1>
        <h4 className="font-normal text-[#4B5563] text-sm tracking-tighter">
          Here is a list of all your students
        </h4>
      </span>

      <section>
        <div className="flex justify-between mt-3">
          <h3 className="class-page-subheading text-[16px]">All Students</h3>
          <span className="flex flex-col gap-2">
            <div className="flex gap-3">
              <button className="filter-btn">All</button>
              <button className="active-filter-btn">Active</button>
              <button className="filter-btn">Inactive</button>
            </div>
            <input
              type="text"
              placeholder="search for student"
              className="reg-form-input h-10 xs:w-full md:w-[23.5rem] px-2"
            />
          </span>
        </div>
      </section>
      <FilterStudent />
      {studentLists.length !== 0 ? (
        <StudentTable />
      ) : (
        <div className="">
          <p className="font-semibold text-2xl">
            No student have been enrolled yet
          </p>
          <button className="button mt-3" onClick={handleStdEnroll}>
            Enroll
          </button>
        </div>
      )}
      <section className="flex flex-col md:flex-row gap-3 mt-6">
        <select className="border rounded-md text-sm h-[38px]">
          <option>View student</option>
          <option>Edit student</option>
          <option>Delete student</option>
          <option>Deactivate student</option>
        </select>
        <button className="button h-[38px] text-center py-[5px] px-[62px]">
          Apply
        </button>
      </section>
    </div>
  );
};

export default AllStudents;
