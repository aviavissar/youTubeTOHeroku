import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import CategoryOptions from "./CategoryOptions";
import { deleteCategory, createCategory } from "../service/fetchApi";

const CategoryCreator = ({
  setCatagories,
  catagories,
  selectedCategoryID,
  setSelectedCategoryID,
  userToken,
  isConnected,
}) => {
  let [catInput, setCatInput] = useState("");
  let [deletecatID, setDeletecatID] = useState("");
  const [disabledBt, setdisabledBt] = useState(false);

  useEffect(() => {
    setdisabledBt(isConnected);
  }, [isConnected]);

  const addCategory = async (e) => {
    e.preventDefault();
    if (catInput !== "") {
      if (!catagories.find((cat) => cat.cat_name === catInput)) {
        const new_cat = await createCategory(userToken, {
          cat_name: catInput,
          videos: [],
        });

        setCatagories([...catagories, new_cat]);
        setCatInput("");
      } else {
        alert("this name all ready exists");
        setCatInput("");
        return;
      }
    } else {
      alert("You need to put a category name");
    }
  };

  const toDeleteCategory = (e) => {
    e.preventDefault();
    if (catagories.length > 1) {
      const newCat = catagories.filter((cat) => cat._id !== deletecatID);
      setCatagories(newCat);
      console.log(deletecatID);
      deleteCategory(userToken, deletecatID);
    } else {
      alert("No catagories to delete");
    }
  };
  const getCatID = (id) => {
    console.log(id);
    setDeletecatID(id);
  };

  return (
    <form className={isConnected ? "category_form" : "disable category_form"}>
      <Inp>
        <div className="description">
          <span> the video will add to:</span>
        </div>
        <CategoryOptions
          className={isConnected ? "" : "disable"}
          {...{
            catagories,
            setSelectedCategoryID,
            selectedCategoryID,
            getCatID,
            isConnected,
          }}
        />
      </Inp>
      <Border />
      <Inp>
        <input
          type="text"
          value={catInput}
          onChange={(e) => setCatInput(e.target.value)}
          placeholder="category name"
          className={isConnected ? "category" : "disable category"}
        />
        <button
          className={isConnected ? "" : "disable"}
          disabled={!disabledBt}
          onClick={(e) => addCategory(e)}
        >
          add category
        </button>
      </Inp>
      <Border />
      <Inp>
        <CategoryOptions
          {...{
            catagories,
            setSelectedCategoryID,
            selectedCategoryID,
            getCatID,
            isConnected,
          }}
        />
        <button
          className={isConnected ? "" : "disable"}
          onClick={toDeleteCategory}
          disabled={!disabledBt}
        >
          delete category
        </button>
      </Inp>
    </form>
  );
};

export default CategoryCreator;

const Inp = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-around;
  padding: 1px 5px;
  @media only screen and (max-width: 414px) {
    width: 100%;
    height: 40px;
  }
`;
const Border = styled.div`
  width: 4px;
  background-color: #e3e3e3;
  height: auto;
  margin: 1px auto;
  border-radius: 5px;
`;
