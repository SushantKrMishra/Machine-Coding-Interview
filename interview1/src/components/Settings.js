import React from "react";

const Settings = ({ data, handleChange }) => {
  return (
    <div className="themeContainer">
      Theme :
      <div>
        <span>
          <input
            type="radio"
            value={"Dark"}
            name={data.theme}
            checked={data.theme === "Dark"}
            onChange={(e) => handleChange(e, "theme")}
          />
          Dark
        </span>
        <span>
          <input
            type="radio"
            value={"Light"}
            name={data.theme}
            checked={data.theme === "Light"}
            onChange={(e) => handleChange(e, "theme")}
          />
          Light
        </span>
      </div>
    </div>
  );
};

export default Settings;
