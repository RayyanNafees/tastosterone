import React from "react";

import AssignSubject from "../../../components/AssignSubject";
import SaveGroupBtn from "../../../components/SaveGroupBtn";

import { IndependentStudentRegData } from "../../../data/data";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "../../../data/checkAuth";
import { key, subjectData } from "../../../data/globalData";
import axios from "axios";
import { validateEmail } from "../../../data/validateEmail";
import { baseURL } from "../../../data/url";
import CryptoJS from "crypto-js";

const AddIndependentStudent = () => {
  const navigate = useRouter();
  const encrypted_token = localStorage.getItem("token");
  let decrypted_token;

  if (encrypted_token !== null) {
    decrypted_token = CryptoJS.AES.decrypt(encrypted_token, key).toString(
      CryptoJS.enc.Utf8
    );
  }
  const config = { headers: { Authorization: `token ${decrypted_token}` } };

  useEffect(() => {
    checkAuth().then(() => {
      if (localStorage.getItem("isLoggedIn") !== "true") {
        navigate.push("/auth/login");
      }
    });
  }, []);

  const makeFormObj = () => {
    let formObj = {};
    // let index = 0;
    IndependentStudentRegData.map((student) => {
      formObj = { ...formObj, [student["inputName"]]: "" };
    });

    return formObj;
  };

  const [studentInfo, setStudentInfo] = useState({
    ...makeFormObj(),
    add_info: "",
  });

  const [subjects, setSubjects] = useState([]);

  const fnRef = useRef(null);
  const lnRef = useRef(null);
  const gender = useRef(null);
  const emailRef = useRef(null);
  const DOBRef = useRef(null);
  const school = useRef(null);
  const grade = useRef(null);
  const phoneNumberRef = useRef(null);
  const addressRef = useRef(null);
  const stateRef = useRef(null);
  const countryRef = useRef(null);
  const zip_code = useRef(null);

  const refs = [
    fnRef,
    lnRef,
    gender,
    emailRef,
    DOBRef,
    school,
    grade,
    phoneNumberRef,
    addressRef,
    stateRef,
    countryRef,
    zip_code,
  ];

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setStudentInfo({ ...studentInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("student", studentInfo);
    const keys = Object.keys(studentInfo);
    for (let prop in studentInfo) {
      const index = keys.indexOf(prop);
      if (!(index > 11)) {
        if (studentInfo[prop] === "") {
          refs[index].current.placeholder = "this field can't be empty";
          refs[index].current.className = "reg-form-input-error";
        } else {
          refs[index].current.placeholder = "";
          refs[index].current.className = "reg-form-input";
        }
      }
    }

    const email_is_valid = validateEmail(studentInfo["email"]);
    if (email_is_valid) {
      // const adminID = JSON.parse(localStorage.getItem('user_info'))['id']
      const branch = JSON.parse(localStorage.getItem("branchInfo"))["id"];
      const subj = JSON.stringify(subjects);

      const newStudentInfo = {
        ...studentInfo,
        branch,
        subjects: subj,
      };

      axios
        .post(`${baseURL}${"add-independent-student/"}`, newStudentInfo, config)
        .then((resp) => {
          console.log(resp);
        })
        .catch((err) => {
          const err_data = err.response.data;
          console.log(err_data);
          if (err_data["email"]) {
            const email_index = keys.indexOf("email");
            setStudentInfo({ ...studentInfo, email: "" });
            refs[email_index].current.placeholder = "email has been used";
            refs[email_index].current.className = "reg-form-input-error";
          }

          if (err_data["phoneNumber"]) {
            const phoneNumberIndex = keys.indexOf("phoneNumber");
            setStudentInfo({ ...studentInfo, phoneNumber: "" });
            refs[phoneNumberIndex].current.placeholder =
              err_data["phoneNumber"];
            refs[phoneNumberIndex].current.className = "reg-form-input-error";
          }
        });

      // here
    } else {
      const email_index = keys.indexOf("email");
      setStudentInfo({ ...studentInfo, email: "" });
      refs[email_index].current.placeholder = "enter a valid email";
      refs[email_index].current.className = "reg-form-input-error";
    }
  };

  return (
    <subjectData.Provider value={{ subjects, setSubjects }}>
      <div>
        <h1 className="class-page-subheading text-2xl">Add New Student</h1>
        <p className="class-paragraph">
          Use the below form to add new student to your database
        </p>

        <h2 className="class-page-subheading mt-5 mb-0">Add student details</h2>
        <p className="class-paragraph">
          assign student to family and enter the student personal information.
        </p>

        <section className="mt-9">
          <form className=" w-full xs:flex-col md:flex-row gap-5 md:justify-start">
            <section className="mt-4 flex gap-1 flex-col">
              <footer className="text-sm text-[#1F2937]">
                If checked, staff will be allow to also tutor
              </footer>
            </section>

            {/* students's personal info */}
            <section>
              <main className="xs:flex xs:flex-col md:grid md:grid-cols-12 md:gap-x-10 gap-y-8 mt-3">
                {IndependentStudentRegData.map((data) => {
                  const { id, label, inputName, placeholder, type } = data;
                  return (
                    <span className="col-span-4" key={id}>
                      <label
                        htmlFor={inputName}
                        className="font-semibold text-base text-[#1F2937]"
                      >
                        {label}
                      </label>
                      <input
                        className="class-input"
                        type={type}
                        id={inputName}
                        name={inputName}
                        placeholder={placeholder}
                        value={studentInfo[inputName]}
                        onChange={handleChange}
                        ref={refs[id]}
                      />
                    </span>
                  );
                })}
              </main>
            </section>

            {/* employee's personal info ends */}

            {/* bio section */}
            <div>
              <span className="flex flex-col mt-4">
                <label
                  htmlFor="employee-bio"
                  className="class-input-label my-2"
                >
                  {"Student's Bio"}
                </label>
                <textarea
                  placeholder="add additional information"
                  className="class-input w-[85vw] md:w-[31.88rem] h-[7.63rem]"
                  name="add_info"
                  value={studentInfo["add_info"]}
                  onChange={handleChange}
                ></textarea>
              </span>
            </div>
            {/* bio section ends */}
          </form>
          <span className="">
            <header>
              <h2 className="class-page-subheading mb-1 mt-5">
                Add class student will be assign to
              </h2>
              <p className="class-paragraph">
                Select class(es) the student will be taken to serve as reference
                when scheduling lesson for the student. You can leave these
                fields blank, if you wanna assign class later.
              </p>
            </header>
            <AssignSubject />
          </span>

          <footer>
            <header>
              <h3 className="class-page-subheading mt-5">Set permission</h3>
              <footer>Enable some permission for student</footer>
            </header>
            <main className="flex flex-wrap gap-5 w-[50%] font-semibold mt-3">
              <label className="flex gap-3">
                <input type="checkbox" name="agree" value="yes" />
                <p>Allow lesson reminders</p>
              </label>
              <label className="flex gap-3">
                <input type="checkbox" name="agree" value="yes" />
                <p>Allow student to Contact Tutor</p>
              </label>
              <label className="flex gap-3 w-full">
                <input type="checkbox" name="agree" value="yes" />
                <p>Allow user Account</p>
              </label>
            </main>
            <SaveGroupBtn handleSubmit={handleSubmit} />
          </footer>
        </section>
      </div>
    </subjectData.Provider>
  );
};

export default AddIndependentStudent;
