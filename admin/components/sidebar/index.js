// pages/admin.js
import React, { useState, useEffect } from "react";
// import { fetchUsersDetails } from "@/services/users";
import Link from "next/link";

const Sidebar = () => {
  const sections = ["Genres", "Categories", "Products", "ProductVariants", "Comments", "Transactions", "Customers"];

  const [selectedSection, setSelectedSection] = useState("Genres");
  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  useEffect(() => {
    // getUserDetails();
  }, []);

  // const getUserDetails = async () => {
  //   try {
  //     const response = await fetchUsersDetails();
  //     if (response) {
  //       console.log("response is", response.data);
  //       setUserData(response.data);
  //       return response.data;
  //     }
  //   } catch (error) {
  //     return error.message;
  //   }
  // };

  return (
    <div className="sideBar">
      <div className="logo"> </div>
      <ul>
      {sections.map((section, index) => (
      <Link href={`/${section.toLowerCase()}`} className="textLink" key={index}>
        <li
          className={selectedSection === section ? "active" : ""}
          onClick={() => handleSectionClick(section)}
        >
          {section}
        </li>
      </Link>
    ))}
      </ul>
    </div>
  );
};

export default Sidebar;
