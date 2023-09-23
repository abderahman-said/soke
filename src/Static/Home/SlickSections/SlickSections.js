"use client"
import React from "react";
import SlickCategories from "../../../Layout/SlickCategories/SlickCategories";
import styles from "../../../app/page.module.css"
const SlickSections = ({ Categories }) => {
  const SelectCategories = Categories
    ? Categories.cats
        ?.filter((ele) => ele.catList.length > 0)
        .map((ele, idx) => {
          return (
            <SlickCategories
              key={idx}
              MainName={ele.name}
              id={ele.id}
              catList={ele.catList}
              backImage={ele.image}
            />
          );
        })
    : null;
  return <div className={styles.SlickSections}>{SelectCategories}</div>;
};

export default SlickSections;
