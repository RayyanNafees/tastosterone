import React, { createContext, useState, useRef, useEffect } from "react";
import { TbGridDots } from "react-icons/tb";
import { HiOutlinePencil } from "react-icons/hi";
import AddModuleModal from "../../../components/AddModuleModal";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { authConfig } from "../../../data/authConfig";
import { baseURL } from "../../../data/url";
import { checkAuth } from "../../../data/checkAuth";
import { useRouter } from "next/navigation";

export const ModuleContext = createContext();

const AddClass = () => {
  const navigate = useRouter();
  useEffect(() => {
    checkAuth().then(() => {
      if (localStorage.getItem("isLoggedIn") !== "true") {
        navigate.push("/auth/login");
      }
    });
  }, []);

  const [classData, setClassData] = useState({
    title: "",
    section: "",
    description: "",
  });

  const titleRef = useRef();
  const sectionRef = useRef();
  const descriptionRef = useRef();

  const refs = [titleRef, sectionRef, descriptionRef];

  const [moduleData, setModuleData] = useState([]);

  // to make the request when all data is not empty

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClassData({ ...classData, [name]: value });
  };

  const keys = Object.keys(classData);

  const handleSubmit = () => {
    let isAnyEmpty = false;

    for (let key in classData) {
      if (classData.hasOwnProperty(key)) {
        if (classData[key] === "") {
          console.log(`${key} is empty`);
          setClassData({ ...classData, [key]: "" });
          const index = keys.indexOf(key);
          refs[index].current.placeholder = `${key} field cannot be empty`;
          refs[index].current.className = "reg-form-input-error";
          isAnyEmpty = true;
        }
      }
    }

    if (!isAnyEmpty) {
      const config = authConfig();
      const branch = JSON.parse(localStorage.getItem("branchInfo"))["id"];
      const data = {
        ...classData,
        modules: JSON.stringify(moduleData),
        branch,
      };
      axios
        .post(`${baseURL}class/`, data, config)
        .then((resp) => {
          console.log(resp);
          if (resp.status === 201) {
            // navigate.push('/')
          }
        })
        .catch((err) => {
          const err_data = err.response.data;
          console.error(err.response.data);
          if ("title" in err_data) {
            alert(err_data["title"]);
          }
        });
    }
  };

  const Header = () => {
    return (
      <header>
        <h1 className="text-[#031F42] text-xl font-semibold">Add New Class</h1>
        <p className="class-paragraph">
          Use the form below to add a new class you want to offer to your
          students.
        </p>
      </header>
    );
  };

  const ClassModule = () => {
    return (
      <section>
        <h2 className="class-page-subheading">Add class module</h2>
        <p className="class-paragraph">
          You can include a list of class modules that must be completed or
          followed by teachers taking the class.
        </p>

        <div className="mt-9 bg-[#F3F4F6] py-3 px-2">
          <h3 className="text-lg font-semibold">Topics to be treated</h3>
          <section className="mt-8">
            {moduleData.map((data) => {
              const { title, description } = data;
              return (
                <div
                  className="flex items-center justify-between px-2 bg-white py-4 border-l-4 border-[#BF011B] "
                  key={uuidv4()}
                >
                  <span className="flex items-center gap-4">
                    <TbGridDots className="text-[#4B5563] md:text-xl" />
                    <span>
                      <h4 className="text-xl font-semibold text-[#031F42]">
                        {title.toUpperCase()}
                      </h4>
                      <footer className="class-paragraph text whitespace-normal">
                        <p>{description}</p>
                      </footer>
                    </span>
                  </span>
                  <HiOutlinePencil className="text-[#4B5563] md:text-2xl" />
                </div>
              );
            })}
          </section>

          <footer className="flex items-center gap-2 mt-7">
            <AddModuleModal />
          </footer>
        </div>
      </section>
    );
  };

  return (
    <ModuleContext.Provider value={{ moduleData, setModuleData }}>
      <div className="overflow-y-auto">
        <Header />
        <main className="bg-[#F9FAFB] py-5 px-[10px] mt-10">
          <h1 className="class-page-subheading">Add class title & fee</h1>
          <p className="text-lg text-[#4B5563] font-normal leading-5 tracking-[-0.02em] my-[1rem]">
            Enter the class title and select the section you want to add the
            class to.
          </p>

          <section>
            <form className="flex flex-col md:flex-row gap-1 md:gap-16">
              <span className="mb-5">
                <label htmlFor="class-title" className="class-input-label">
                  Class Title
                </label>
                <br />
                <input
                  type="text"
                  placeholder="Enter Class Title"
                  id="title"
                  name="title"
                  ref={titleRef}
                  value={classData.title}
                  className="class-input md:w-[19.25rem] h-[3rem]"
                  onChange={handleChange}
                />
              </span>

              <span>
                <label
                  htmlFor="class-section"
                  className="class-input-label mt-7"
                >
                  Section
                </label>
                <br />
                <input
                  type="number"
                  placeholder="grade/year"
                  id="section"
                  name="section"
                  ref={sectionRef}
                  value={classData.section}
                  className="class-input md:w-[19.25rem] h-[3rem]"
                  onChange={handleChange}
                />
              </span>
            </form>
          </section>

          <div className="mt-9">
            <h2 className="class-page-subheading mb-2">
              Add class description (optional)
            </h2>
            <p className="class-paragraph">
              You can add a class description to help others understand what the
              class is all about.
            </p>
            <label htmlFor="description">
              <h3 className="class-page-subheading text-sm mb-1 mt-3">
                Description
              </h3>
            </label>

            <textarea
              placeholder="Add class description"
              className="w-[19.25rem] md:w-[29.63rem] h-[6.44rem] class-input"
              name="description"
              ref={descriptionRef}
              value={classData["description"]}
              onChange={handleChange}
            ></textarea>
          </div>
          <ClassModule />
        </main>
        <div className="flex flex-col gap-3 items-start mt-9">
          <button className="button" onClick={handleSubmit}>
            Save
          </button>
          <button className="button">Save and add another class</button>
        </div>
      </div>
    </ModuleContext.Provider>
  );
};

export default AddClass;
