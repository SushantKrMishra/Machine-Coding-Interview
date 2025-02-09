import React from "react";

const Profile = ({ data, handleChange, errors }) => {
  return (
    <div className="profileSection">
      <label>
        Name :
        <input
          type="text"
          value={data.name}
          onChange={(e) => handleChange(e, "name")}
        />
      </label>
      <main className="errors">{errors.name && errors.name}</main>
      <label>
        Email :
        <input
          type="email"
          value={data.email}
          onChange={(e) => handleChange(e, "email")}
        />
      </label>
      <main className="errors">{errors.email && errors.email}</main>

      <label>
        Age :
        <input
          type="number"
          value={data.age}
          onChange={(e) => handleChange(e, "age")}
        />
      </label>
      <main className="errors">{errors.age && errors.age}</main>
    </div>
  );
};

export default Profile;
