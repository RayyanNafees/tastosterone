'use client'
import React, { useState, useEffect } from "react";
import { Link, useRouter } from "next/link";
import Badge from "@/app/components/Badge";
import { BiPlus } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { baseURL } from "@/app/data/url";
import { authConfig } from "@/app/data/authConfig";
import { checkAuth } from "@/app/data/checkAuth";

const FamilyProfile = ({ familyID }) => {
  const navigate = useRouter();
  const config = authConfig();

  const [familyInfo, setFamilyInfo] = useState(null);
  const [loadProfile, setLoadProfile] = useState(false);
  const [personalDetails, setPersonalDetails] = useState([]);
  const [info, setInfo] = useState([]);
  const [childStudents, setChildStudents] = useState([]);
  const [noStudent, setNoStudent] = useState(true);

  useEffect(() => {
    checkAuth().then(() => {
      if (localStorage.getItem("isLoggedIn") !== "true") {
        navigate.push("/auth/login");
      }
    });
  }, []);

  const setDataValues = (parentInfo) => {
    if (!loadProfile) {
      setPersonalDetails([
        { title: "Gender", value: parentInfo.gender },
        { title: "Date of Birth", value: parentInfo.date_of_birth },
        {
          title: "Home Address",
          value: `${parentInfo.address}, ${parentInfo.state}, ${parentInfo.country}`,
        },
        {
          title: "Phone Number",
          value: parentInfo.phoneNumber,
        },
        {
          title: "Personal Email",
          value: parentInfo.email,
        },
      ]);

      setInfo([
        { title: "Child-student", value: "3" },
        { title: "Workplace", value: "Amazon plc" },

        {
          title: "Home contact",
          value: parentInfo.homeNumber,
        },
        {
          title: "Bio",
          value: parentInfo.add_info,
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
      .get(`${baseURL}get-parent-info/${familyID}`, config)
      .then((resp) => {
        setDataValues(resp.data);
        setFamilyInfo(resp.data);
        console.log(resp.data);
        axios
          .get(`${baseURL}get-parent-child/${familyID}`, config)
          .then((resp) => {
            const data = JSON.parse(resp.data);
            data.length > 0 && setNoStudent(false);
            setChildStudents(data);
            console.log("children", data);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!loadProfile) {
      fetchData().then(() => setLoadProfile(true));
    }
  }, []);

  const [defaultMenu, setDefaultMenu] = useState({
    otherDetails: true,
    secondaryFamily: false,
    childStudent: false,
  });

  // const personalDetails = [
  //   { title: 'Gender', value: 'Male' },
  //   { title: 'Date of Birth', value: '08/07/2001' },
  //   {
  //     title: 'Home Address',
  //     value: '3517 W. Gray St. Utica, Pennsylvania 57867',
  //   },
  //   {
  //     title: 'Phone Number',
  //     value: '(603) 555-0123',
  //   },
  //   {
  //     title: 'Personal Email',
  //     value: 'leliealexenderr@gmail.com',
  //   },
  // ]

  const secondaryPersonalDetails = [
    { title: "Gender", value: "Male" },
    { title: "Date of Birth", value: "08/07/2001" },
    {
      title: "Home Address",
      value: "3517 W. Gray St. Utica, Pennsylvania 57867",
    },
    {
      title: "Phone Number",
      value: "(603) 555-0123",
    },
    {
      title: "Personal Email",
      value: "leliealexenderr@gmail.com",
    },
  ];

  // const info = [
  //   { title: 'Child-student', value: '3' },
  //   { title: 'Workplace', value: 'Amazon plc' },
  //   {
  //     title: 'Hired date',
  //     value: '(603) 555-0123',
  //   },
  //   {
  //     title: 'Home contact',
  //     value: ' (603) 555-0123',
  //   },
  //   {
  //     title: 'Bio',
  //     value:
  //       'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
  //   },
  //   {
  //     title: 'Registered by',
  //     value: 'James Solomon',
  //   },
  // ]

  const secondaryInfo = [
    { title: "Child-student", value: "3" },
    { title: "Workplace", value: "Amazon plc" },
    {
      title: "Hired date",
      value: "(603) 555-0123",
    },
    {
      title: "Home contact",
      value: " (603) 555-0123",
    },
    {
      title: "Bio",
      value:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    },
    {
      title: "Registered by",
      value: "James Solomon",
    },
  ];

  const notficationSettings = [
    { title: "Lesson reminder", value: true },
    { title: "Contact student", value: false },
    { title: "User account", value: true },
  ];

  const InfoSection = () => {
    return (
      <div className="mt-6">
        {info.map((detail) => {
          const { title, value } = detail;
          return (
            <span
              className="grid grid-cols-12 md:w-[40rem] mt-2 text-[#1F2937] leading-[28px] tracking-[-0.02rem]"
              key={uuidv4()}
            >
              <p className="col-span-4 mb-6">{title + ":"}</p>
              <p className="font-semibold col-span-7">{value}</p>
            </span>
          );
        })}
      </div>
    );
  };

  const ChildStudents = () => {
    return (
      <div className="overflow-auto mt-5">
        {!noStudent ? (
          <table className="w-full text-[#1F2937] tracking-[-0.02rem]">
            <tbody className="whitespace-nowrap text-sm divide-y divide-gray-300">
              {childStudents.map((child) => {
                return (
                  <tr key={uuidv4()}>
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
                            href={`/master-admin/student-profile/${child.id}`}
                          >
                            {`${child.firstName} ${child.lastName}`}
                          </Link>
                        </p>
                      </span>
                    </td>
                    <td className="p-3">3 Classes</td>
                    <td className="p-3">{child.email}</td>
                    <td className="p-3">
                      <Badge status="active" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div>You have not registered any child yet</div>
        )}
        <button className="flex text-[#BF011B] items-center gap-2 font-semibold mt-5">
          <BiPlus />
          <p>Add another child-student</p>
        </button>
      </div>
    );
  };

  //  for displaying info of secondary family

  const SecondaryInfoSection = () => {
    return (
      <div className="mt-6">
        {secondaryPersonalDetails.map((detail) => {
          const { title, value } = detail;
          return (
            <span
              className="grid grid-cols-12 md:w-[40rem] mt-2 text-[#1F2937] leading-[28px] tracking-[-0.02rem]"
              key={uuidv4()}
            >
              <p className="col-span-4 mb-6">{title + ":"}</p>
              <p className="font-semibold col-span-7">{value}</p>
            </span>
          );
        })}

        {secondaryInfo.map((detail) => {
          const { title, value } = detail;
          return (
            <span
              className="grid grid-cols-12 md:w-[40rem] mt-2 text-[#1F2937] leading-[28px] tracking-[-0.02rem]"
              key={uuidv4()}
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
            const { value } = setting;
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
            <h2 className="class-page-subheading mb-1">Family Profile</h2>
            <p className="class-paragraph">
              Here is the profile of family;{" "}
              <span className="font-bold">{`${familyInfo.firstName} ${familyInfo.lastName}`}</span>
            </p>
            <section className="mt-6 flex xs:flex-col md:flex-row xs:gap-5 md:gap-0">
              <div className="mr-[140px] self-center">
                <img
                  src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
                  className="w-[200px] h-[200px] border-[2px] border-[#9CA3AF] rounded-[10px]"
                />
                <footer className="font-semibold text-center mt-4">
                  {`${familyInfo.firstName} ${familyInfo.lastName}`}
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
                          className="grid grid-cols-12 w-[23rem] mt-2 text-[#1F2937] leading-[28px] tracking-[-0.02rem]"
                          key={uuidv4()}
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
                    defaultMenu.otherDetails
                      ? "border-b-2 border-[#BF011B] text-[#BF011B] font-semibold pb-5"
                      : " font-semibold pb-5"
                  }
                  onClick={() =>
                    setDefaultMenu({
                      otherDetails: true,
                      secondaryFamily: false,
                      childStudent: false,
                    })
                  }
                >
                  Other Details
                </button>
              </span>

              <span className="w-[50%] text-start">
                <button
                  className={
                    defaultMenu.secondaryFamily
                      ? "border-b-2 border-[#BF011B] text-[#BF011B] font-semibold pb-5"
                      : " font-semibold pb-5"
                  }
                  onClick={() =>
                    setDefaultMenu({
                      otherDetails: false,
                      secondaryFamily: true,
                      childStudent: false,
                    })
                  }
                >
                  Secondary family
                </button>
              </span>
              <span className="w-[50%] text-start">
                <button
                  className={
                    defaultMenu.childStudent
                      ? "border-b-2 border-[#BF011B] text-[#BF011B] font-semibold pb-5"
                      : " font-semibold pb-5"
                  }
                  onClick={() =>
                    setDefaultMenu({
                      otherDetails: false,
                      secondaryFamily: false,
                      childStudent: true,
                    })
                  }
                >
                  Child-Student
                </button>
              </span>
            </div>
            {defaultMenu.otherDetails ? (
              <section>
                <InfoSection />
                <NotificationSettings />
              </section>
            ) : defaultMenu.secondaryFamily ? (
              <section>
                <SecondaryInfoSection showSaveBtn={false} />
                <NotificationSettings />
              </section>
            ) : (
              <ChildStudents />
            )}
          </main>
        </section>
      ) : (
        <div>Loading....</div>
      )}
    </div>
  );
};

export default FamilyProfile;
