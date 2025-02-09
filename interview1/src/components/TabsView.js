import React, { useState } from "react";
import Interests from "./Interests";
import Profile from "./Profile";
import Settings from "./Settings";
import "./styles.css";

const TabsView = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [data, setData] = useState({
    name: "",
    email: "",
    age: 0,
    interests: [],
    theme: "Dark",
  });

  const [errors, setErrors] = useState({});
  const tabs = [
    {
      tabHeader: "Profile",
      tabComponent: Profile,
      validate: () => {
        const validateErrors = {};
        const regex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}/;
        if (data.name.trim().length < 4) {
          validateErrors.name = "Invalid Name";
        }
        if (data.age < 18) {
          validateErrors.age = "Age is less than 18";
        }
        if (!regex.test(data.email)) {
          validateErrors.email = "Email not Valid";
        }
        if (validateErrors.age || validateErrors.email || validateErrors.name) {
          setErrors(validateErrors);
          return false;
        }
        return true;
      },
    },
    {
      tabHeader: "Interests",
      tabComponent: Interests,
      validate: () => {
        const validateErrors = {};
        if (data.interests.length === 0) {
          validateErrors.interests = "Please atleast have one interest";
          setErrors(validateErrors);
          return false;
        }
        return true;
      },
    },
    {
      tabHeader: "Settings",
      tabComponent: Settings,
      validate: () => {
        return true;
      },
    },
  ];

  const ActiveView = tabs[selectedTab].tabComponent;
  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  const handleChange = (e, label) => {
    setData((prev) => ({ ...prev, [label]: e.target.value }));
  };

  const handleSubmit = () => {
    console.log(data);
    //stimulate the calls
  };

  return (
    <div className="tabContainer">
      <div className="tabHeaders">
        {tabs.map((tab, index) => (
          <div
            className={`tabHeader ${
              selectedTab === index ? "selectedTab" : ""
            }`}
            onClick={() =>
              tabs[selectedTab].validate() && handleTabClick(index)
            }
            key={tab.tabHeader}
          >
            {tab.tabHeader}
          </div>
        ))}
      </div>
      <ActiveView data={data} handleChange={handleChange} errors={errors} />
      {selectedTab > 0 && (
        <button onClick={() => handleTabClick(selectedTab - 1)}>Prev</button>
      )}
      {selectedTab < tabs.length - 1 && (
        <button
          onClick={() =>
            tabs[selectedTab].validate() && handleTabClick(selectedTab + 1)
          }
        >
          Next
        </button>
      )}
      {selectedTab === tabs.length - 1 && (
        <button onClick={handleSubmit}>Submit</button>
      )}
    </div>
  );
};

export default TabsView;
