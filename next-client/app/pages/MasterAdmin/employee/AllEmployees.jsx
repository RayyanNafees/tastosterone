import React, { useState, useEffect } from "react";
import Badge from "../../../components/Badge";
import { Link, useRouter } from "next/navigation";
import { authConfig } from "../../../data/authConfig";
import { checkAuth } from "../../../data/checkAuth";
import { baseURL } from "../../../data/url";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { extractDateFromTimestamp as extractDate } from "./extractDate";

const AllEmployees = () => {
  const navigate = useRouter();
  const config = authConfig();
  const [employeeLists, setEmployeeLists] = useState([]);

  const branch = JSON.parse(localStorage.getItem("branchInfo"))["id"];

  // this function handles btn navigating to enrolling page
  const handleAddEmploy = () => {
    navigate.push("/master-admin/add-employee");
  };
  useEffect(() => {
    checkAuth().then(() => {
      if (localStorage.getItem("isLoggedIn") !== "true") {
        navigate.push("/auth/login");
      }
    });
  }, []);

  useEffect(() => {
    axios
      .get(`${baseURL}get-list/employees/${branch}`, config)
      .then((resp) => {
        console.log(resp);
        setEmployeeLists(JSON.parse(resp.data).reverse());
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const EmployeesTable = () => {
    return (
      <div className="overflow-auto mt-5">
        <table className="w-full text-[#1F2937] tracking-[-0.02rem]">
          <thead className="bg-[#F3F4F6] font-semibold">
            <tr className="text-center">
              <th>
                <input type="checkbox" />
              </th>
              <th className="whitespace-nowrap p-3 text-left">Name</th>
              <th className="whitespace-nowrap p-3 text-left">Role</th>
              <th className="whitespace-nowrap p-3 text-left">Hired Date</th>
              <th className="whitespace-nowrap p-3 text-left">Email</th>
              <th className="whitespace-nowrap p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="whitespace-nowrap text-sm divide-y divide-gray-300">
            {employeeLists.map((employee) => {
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
                      <p className="xs:mr-9 md:mr-0">
                        <Link
                          to={`/master-admin/employee-profile/${employee.id}`}
                        >
                          {`${employee.firstName} ${employee.lastName}`}
                        </Link>
                      </p>
                    </span>
                  </td>
                  <td className="p-3">Staff</td>
                  <td className="p-3">{extractDate(employee.hireDate)}</td>
                  <td className="p-3">{employee.email}</td>
                  <td className="p-3">
                    <Badge status="yet to start" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
  return (
    <div>
      <span className="flex flex-col gap-2">
        <h1 className="font-semibold text-[16px] text-[#031F42]">Employees</h1>
        <h4 className="font-normal text-[#4B5563] text-sm tracking-tighter">
          Here is a list of all your employees
        </h4>
      </span>

      <section>
        <div className="flex justify-between">
          <h3 className="class-page-subheading text-[16px]">All Employees</h3>
          <input
            type="text"
            placeholder="search for employee"
            className="reg-form-input h-10 xs:w-full md:w-[23.5rem] px-2"
          />
        </div>
      </section>
      {employeeLists.length !== 0 ? (
        <EmployeesTable />
      ) : (
        <div className="">
          <p className="font-semibold text-2xl">No employee added yet</p>
          <button className="button mt-3" onClick={handleAddEmploy}>
            Add
          </button>
        </div>
      )}
      <section className="flex flex-col md:flex-row gap-3 mt-6">
        <select className="border rounded-md text-sm h-[38px]">
          <option>View employees</option>
          <option>Edit employees</option>
          <option>Delete employees</option>
          <option>Deactivate employees</option>
        </select>
        <button className="button h-[38px] text-center py-[5px] px-[62px]">
          Apply
        </button>
      </section>
    </div>
  );
};

export default AllEmployees;
