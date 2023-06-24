"us client";
import React, { useState } from "react";

import Navbar from "./Navbar";
import TopBar from "./TopBar";

import { ToggleContext } from "@/app/data/globalData";

const SharedLayout = ({ children }: { children: any }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <ToggleContext.Provider value={{ toggle, setToggle }}>
      <div className="h-screen w-screen lg:bg-[#FAF5F5] bg-[#FAF5F5]">
        <TopBar />
        <Navbar />
        <main className="xs:absolute right-3 top-[4rem] xs:w-[calc(100vw-1.5rem)] lg:w-[calc(100vw-16.5rem)] h-[calc(100vh-5rem)] px-3 py-5 mb-3 bg-white overflow-auto scrollbar-thumb-[#D1D5DB] scrollbar-thin">
          {children}
        </main>
      </div>
    </ToggleContext.Provider>
  );
};

export default SharedLayout;
