import React from "react";
import NoResults from "../assets/404.webp";
import styles from "../styles/NotFound.module.css";
import Asset from "./Asset";

const NotFound = () => {
  return (
    <div className={styles.NotFound}>
      <h1>Sorry, the page you're looking for doesn't exist</h1>
      <Asset
        src={NoResults}
      />
    </div>
  );
};

export default NotFound;
