'use client'

import React, { useState, useEffect } from "react";
import { Link, useRouter } from "next/link";
import Badge from "@/app/components/Badge";
import axios from "axios";
import { checkAuth } from "@/app/data/checkAuth";
import { baseURL } from "@/app/data/url";
import { v4 as uuidv4 } from "uuid";
import { authConfig } from "@/app/data/authConfig";

const StudentProfile = ({studentID}) => {
  const [defaultMenu, setDefaultMenu] = useState(true);
  const [studentInfo, setStudentInfo] = useState(null);
  const [loadProfile, setLoadProfile] = useState(false);
  const [personalDetails, setPersonalDetails] = useState([]);
  const [info, setInfo] = useState([]);

  console.log(studentID);

  const navigate = useRouter();
  const config = authConfig();

  useEffect(() => {
    checkAuth().then(() => {
      if (localStorage.getItem("isLoggedIn") !== "true") {
        navigate.push("/auth/login");
      }
    });
  }, []);

  const setDataValues = (studentInfo) => {
    if (!loadProfile) {
      setPersonalDetails([
        { title: "Gender", value: studentInfo.gender || "gender" },
        { title: "Date of Birth", value: studentInfo.date_of_birth },
        {
          title: "Home Address",
          value: `${studentInfo.address}, ${studentInfo.state}, ${studentInfo.country}.`,
        },
        {
          title: "Phone Number",
          value: studentInfo.phoneNumber,
        },
        {
          title: "Personal Email",
          value: studentInfo.email,
        },
      ]);

      setInfo([
        { title: "Grade/Year", value: studentInfo.grade },
        {
          title: "Student type",
          value: studentInfo.isAdult ? "Adult" : "Family",
        },
        {
          title: "Family",
          value: studentInfo.parentName,
        },
        {
          title: "Bio",
          value: studentInfo.add_info,
        },
        {
          title: "Family contact",
          value: studentInfo.parentPhoneNumber,
        },
        // {
        //   title: 'Registered by',
        //   value: 'James Solomon',
        // },
      ]);
    }
  };

  const fetchData = () => {
    return axios
      .get(`${baseURL}get-student-info/${studentID}`, config)
      .then((resp) => {
        setDataValues(resp.data);
        setStudentInfo(resp.data);
        console.log(resp.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!loadProfile) {
      fetchData().then(() => setLoadProfile(true));
    }
  }, []);

  const notficationSettings = [
    { title: "Lesson Note Emails", value: true },
    { title: "Lesson reminder", value: true },
    { title: "Contact tutor", value: false },
    { title: "User account", value: true },
  ];

  const StudentTable = () => {
    return (
      <div className="overflow-auto mt-5">
        <table className="w-full text-[#1F2937] tracking-[-0.02rem]">
          <thead className="bg-[#F3F4F6] font-semibold">
            <tr className="text-center">
              <th>
                <input type="checkbox" />
              </th>
              <th className="whitespace-nowrap p-3 text-left">Class Name</th>
              <th className="whitespace-nowrap p-3 text-left">
                Starting date - Ending date
              </th>
              <th className="whitespace-nowrap p-3 text-left">Tutor</th>
              <th className="whitespace-nowrap p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="whitespace-nowrap text-sm divide-y divide-gray-300">
            <tr>
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
                    <Link href="/master-admin/student-profile">
                      Chemistry class
                    </Link>
                  </p>
                </span>
              </td>
              <td className="p-3">02/07/2022 - 02/09/2022</td>
              <td className="p-3">Mary Helenee</td>
              <td className="p-3">
                <Badge status="inactive" />
              </td>
            </tr>
            <tr>
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
                  <p className="font-bold">
                    <Link to="/master-admin/student-profile">
                      Biology class
                    </Link>
                  </p>
                </span>
              </td>
              <td className="p-3">02/07/2022 - 02/09/2022</td>
              <td className="p-3">Mary Helenee</td>
              <td className="p-3">
                <Badge status="ongoing" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const InfoSection = () => {
    return (
      <div className="mt-6">
        {info.map((detail) => {
          const { title, value } = detail;
          return (
            <span
              key={uuidv4()}
              className="grid grid-cols-12 md:w-[40rem] mt-2 text-[#1F2937] leading-[28px] tracking-[-0.02rem]"
            >
              <p className="col-span-4 mb-6">{title + ":"}</p>
              <p className="font-semibold col-span-7">{value}</p>
            </span>
          );
        })}
      </div>
    );
  };

  const NotificationSettings = () => {
    return (
      <div className="mt-8">
        <h3 className="class-page-subheading">Notification settings</h3>
        <section>
          {notficationSettings.map((setting) => {
            const { title, value } = setting;
            return (
              <span className="grid grid-cols-12 gap-2 mb-3" key={uuidv4()}>
                <p className="col-span-5 md:col-span-2 text-[#1F2937]">
                  Lesson reminder:
                </p>

                <p
                  className={
                    value
                      ? "col-span-5 font-semibold text-[#16A34A] tracking-[-0.02rem]"
                      : "col-span-5 font-semibold text-[#DC2626] tracking-[-0.02rem]"
                  }
                >
                  {value ? "True" : "False"}
                </p>
              </span>
            );
          })}
        </section>
      </div>
    );
  };

  return (
    <div>
      {loadProfile ? (
        <section>
          <header>
            <h2 className="class-page-subheading mb-1">Student</h2>
            <p className="class-paragraph">
              Here is the profile of student;{" "}
              <span className="font-bold">{`${studentInfo.firstName} ${studentInfo.lastName}`}</span>
            </p>
            <section className="mt-6 flex xs:flex-col md:flex-row xs:gap-5 md:gap-0">
              <div className="mr-[140px] self-center">
                <img
                  src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
                  className="w-[200px] h-[200px] border-[2px] border-[#9CA3AF] rounded-[10px]"
                />
                <footer className="font-semibold text-center mt-4">
                  {`${studentInfo.firstName} ${studentInfo.lastName}`}
                </footer>
              </div>

              <aside>
                <header>
                  <h3 className="class-page-subheading">Personal details</h3>
                  <div>
                    {personalDetails.map((detail) => {
                      const { title, value } = detail;
                      return (
                        <span
                          key={uuidv4()}
                          className="grid grid-cols-12 w-[23rem] mt-2 text-[#1F2937] leading-[28px] tracking-[-0.02rem]"
                        >
                          <p className="col-span-5">{title + ":"}</p>
                          <p className="col-span-7 font-semibold">{value}</p>
                        </span>
                      );
                    })}
                  </div>
                </header>
              </aside>
            </section>
          </header>
          <main className="mt-16">
            <div className="w-full border-b flex">
              <span className="w-[50%] text-start">
                <button
                  className={
                    defaultMenu
                      ? "border-b-2 border-[#BF011B] text-[#BF011B] font-semibold pb-5"
                      : " font-semibold pb-5"
                  }
                  onClick={() => setDefaultMenu(true)}
                >
                  Student Profile
                </button>
              </span>

              <span className="w-[50%] text-start">
                <button
                  className={
                    !defaultMenu
                      ? "border-b-2 border-[#BF011B] text-[#BF011B] font-semibold pb-5"
                      : " font-semibold pb-5"
                  }
                  onClick={() => setDefaultMenu(false)}
                >
                  Classes
                </button>
              </span>
            </div>
            {defaultMenu ? (
              <section>
                <InfoSection />
                <NotificationSettings />
              </section>
            ) : (
              <StudentTable />
            )}
          </main>
        </section>
      ) : (
        <div>Loading......</div>
      )}
    </div>
  );
};

export default StudentProfile;
