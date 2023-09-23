"use client"
import React from "react";
import styles from "../../app/page.module.css"
const LoadingScreen = () => {
  return (
    <div className={styles.LoadingScreen}>
      <div className={styles.boxes}>
        <div className={styles.box}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={styles.box}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={styles.box}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={styles.box}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
