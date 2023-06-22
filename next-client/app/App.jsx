/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { UserAuthTokenContext } from './data/globalData'
import { useState } from 'react'

// branch admin register view (UI)
import BranchAdminSharedLayout from './pages/BranchAdminReg/BranchAdminSharedLayout'
import RegisterOrg from './pages/BranchAdminReg/RegisterOrg'
import Verify from './pages/BranchAdminReg/Verify'
import BranchReg from './pages/BranchAdminReg/BranchReg'
import Branch404 from './pages/BranchAdminReg/Branch404'

import WelcomeOrg from './pages/MasterAdmin/WelcomeOrg'

import SharedLayout from './pages/MasterAdmin/SharedLayout'
import Dashboard from './pages/MasterAdmin/Dashboard'

// class
import AddClass from './pages/MasterAdmin/class/AddClasses'
import Classes from './pages/MasterAdmin/class/Classes'
import Class from './pages/MasterAdmin/class/Class'

// employee
import AddEmployee from './pages/MasterAdmin/employee/AddEmployee'
import AllEmployees from './pages/MasterAdmin/employee/AllEmployees'
import EmployeeProfile from './pages/MasterAdmin/employee/EmployeeProfile'

// student and family
import AddStudent from './pages/MasterAdmin/Student-Family/AddStudent'
import AddFamily from './pages/MasterAdmin/Student-Family/AddFamily'
import AllStudents from './pages/MasterAdmin/Student-Family/AllStudents'
import AllFamilies from './pages/MasterAdmin/Student-Family/AllFamilies'
import FamilyProfile from './pages/MasterAdmin/Student-Family/FamilyProfile'
import StudentProfile from './pages/MasterAdmin/Student-Family/StudentProfile'
import AddIndependentStudent from './pages/MasterAdmin/Student-Family/AddIndependentStudent'
import Enroll from './pages/MasterAdmin/Student-Family/Enroll'

// schdule class
import ScheduleNewLesson from './pages/MasterAdmin/calender/ScheduleNewLesson'
import ScheduledLessons from './pages/MasterAdmin/calender/ScheduledLessons'

// login page
import Login from './pages/Login'

import React from 'react'

function App() {
  const [authData, setAuthData] = useState({ email: '', token: '' })

  return (
    <div className='App'>
      <React.Fragment>
        <UserAuthTokenContext.Provider value={{ authData, setAuthData }}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<h1>hello world</h1>} />
              <Route path='auth' element={<BranchAdminSharedLayout />}>
                <Route path='login' element={<Login />} />
              </Route>

              {/* <Route path='register-org' element={<RegisterOrg />} /> */}
              <Route path='welcome-org' element={<WelcomeOrg />} />

              <Route path='master-admin' element={<SharedLayout />}>
                <Route index element={<Dashboard />} />

                {/* class */}
                <Route path='add-class' element={<AddClass />} />
                <Route path='classes' element={<Classes />} />
                <Route path='class' element={<Class />} />

                {/* employee */}
                <Route path='add-employee' element={<AddEmployee />} />
                <Route path='all-employees' element={<AllEmployees />} />
                <Route
                  path='employee-profile/:employeeID'
                  element={<EmployeeProfile />}
                />

                {/* students and family */}
                <Route path='enroll' element={<Enroll />} />
                <Route path='add-family' element={<AddFamily />} />
                <Route path='all-families' element={<AllFamilies />} />
                <Route path='add-student' element={<AddStudent />} />
                <Route
                  path='add-independent-student'
                  element={<AddIndependentStudent />}
                />
                <Route path='all-students' element={<AllStudents />} />
                <Route
                  path='family-profile/:familyID'
                  element={<FamilyProfile />}
                />
                <Route
                  path='student-profile/:studentID'
                  element={<StudentProfile />}
                />

                {/* schduele class */}
                <Route
                  path='schedule-new-lesson'
                  element={<ScheduleNewLesson />}
                />
                <Route
                  path='scheduled-lessons'
                  element={<ScheduledLessons />}
                />
              </Route>

              <Route path='branch-admin' element={<BranchAdminSharedLayout />}>
                <Route path='register' element={<RegisterOrg />} />
                <Route path='verify' element={<Verify />} />
                <Route path='branch-reg' element={<BranchReg />} />
                <Route path='branch-not-found' element={<Branch404 />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserAuthTokenContext.Provider>
      </React.Fragment>
    </div>
  )
}

export default App
