import React from "react";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import NoResults from "../assets/404.webp";
import styles from "../styles/NotFound.module.css";

const NotFound = () => {
  return (
    <Container  className="p-3">
   <div className={styles.NotFound}>
      <p>Sorry, the page you're looking for doesn't exist</p>
      <Image className={styles.Image404} src={NoResults}
      />
      </div>
    </Container>
  );
};

export default NotFound;
