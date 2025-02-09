import React from "react";

const Interests = ({ data, handleChange, errors }) => {
  const handleInterestsChange = (option) => {
    const interestsData = data.interests.includes(option)
      ? data.interests.filter((interest) => interest !== option)
      : [...data.interests, option];
    handleChange(
      {
        target: {
          value: interestsData,
        },
      },
      "interests"
    );
  };
  const availableInterestsOptions = [
    "JavaScript",
    "TypeScript",
    "ML",
    "AI",
    "Coding",
  ];
  return (
    <div className="interestsContainer">
      {availableInterestsOptions.map((option) => (
        <main key={option}>
          <input
            type="checkbox"
            checked={data.interests.includes(option)}
            onChange={() => handleInterestsChange(option)}
          />
          {option}
        </main>
      ))}
      <span className="errors"> {errors.interests && errors.interests}</span>
    </div>
  );
};

export default Interests;
