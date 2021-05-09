import React from "react";
import styled from "styled-components";

const CategoryOptions = ({
  catagories = [],
  getCatID,
  setSelectedCategoryID,
  isConnected,
}) => {
  const handleSelectChange = (e) => {
    if (true) {
      getCatID(e.target.value);
      console.log(e.target.value);
      setSelectedCategoryID(e.target.value);
    }
  };

  return (
    <Select>
      <select
        className={isConnected ? "" : "disable"}
        onClick={handleSelectChange}
      >
        {catagories.map((ctg, inx) => {
          return (
            <option
              key={ctg.cat_name + inx}
              id={ctg._id}
              value={ctg._id}
              defaultValue={ctg._id}
            >
              {ctg.cat_name}
            </option>
          );
        })}
      </select>
    </Select>
  );
};

export default CategoryOptions;

const Select = styled.div`
  flex-direction: column;
  justify-content: center;
  display: flex;
  select {
    width: 170px;
    border-radius: 11px;
    height: 35px;
    padding: 7px;
    @media only screen and (max-width: 414px) {
      width: 167px;
    }
  }
`;
