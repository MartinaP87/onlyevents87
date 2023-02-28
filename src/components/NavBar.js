import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const {expanded, setExpanded, ref} = useClickOutsideToggle();

  const handleSignOut = async () => {
    try{
      await axios.post("dj-rest-auth/logout/")
      setCurrentUser(null);
    }catch (err) {
      console.log(err);
    }
  };

  const addEventIcon = (
    <NavLink
      to="/events/create"
      className={styles.NavLink}
      activeClassName={styles.Active}>
      <i className="fas fa-plus-square"></i>Add Event
    </NavLink>
  );

  const loggedInIcons = (
    <>
      {currentUser?.username}
      <NavLink
        to="/feeds"
        className={styles.NavLink}
        activeClassName={styles.Active}>
        <i className="fas fa-stream"></i>
        Feeds
      </NavLink>

      <NavLink
        to="/favourites"
        className={styles.NavLink}
        activeClassName={styles.Active}>
        <i className="fas fa-heart"></i>
        Favourites
      </NavLink>

      <NavLink
        to="/interested"
        className={styles.NavLink}
        activeClassName={styles.Active}>
        <i className="fas fa-calendar"></i>
        Interested
      </NavLink>

      <NavLink
        to="/going"
        className={styles.NavLink}
        activeClassName={styles.Active}>
        <i className="fa-solid fa-calendar-check"></i>
        Going
      </NavLink>

      <NavLink
        to="/past"
        className={styles.NavLink}
        activeClassName={styles.Active}>
        <i className="fa-duotone fa-face-holding-back-tears"></i>
        Past Events
      </NavLink>

      <NavLink
        to="/"
        onClick={handleSignOut}
        className={styles.NavLink}>
        <i className="fas fa-sign-out"></i>
        Sign Out
      </NavLink>

      <NavLink
        to={`/profiles/${currentUser?.profile_id}`}
        className={styles.NavLink}>
        <Avatar 
        src={currentUser?.profile_image} 
        text='Profile'
        height={40}/>
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink
        to="/signin"
        className={styles.NavLink}
        activeClassName={styles.Active}>
        <i className="fas fa-sign-in-alt"></i>Sign In
      </NavLink>

      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}>
        <i className="fas fa-user-plus"></i>Sign Up
      </NavLink>
    </>
  );

  return (
    <Navbar expanded={expanded} expand="md" fixed="top" className={styles.NavBar}>
      <Container>
        <NavLink exact to="/">
          <Navbar.Brand className={styles.NavbarBrand}>
            Only Events
          </Navbar.Brand>
        </NavLink>
        {currentUser && addEventIcon}
        <Navbar.Toggle ref={ref} onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            
            <NavLink
              exact
              to="/"
              className={styles.NavLink}
              activeClassName={styles.Active}>
              <i className="fas fa-home"></i>
              Home
            </NavLink>

            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
