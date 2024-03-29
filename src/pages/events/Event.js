import React from "react";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link, useHistory } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Event.module.css";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import EventGenreCreateForm from "./EventGenres/EventGenreCreateForm";
import Container from "react-bootstrap/Container";
import { format } from "date-fns";
import { NotificationManager } from "react-notifications";

const Event = (props) => {
  const {
    id,
    title,
    owner,
    date,
    category,
    category_name,
    location,
    address,
    content,
    image,
    updated_at,
    profile_id,
    profile_image,
    comments_count,
    interested_id,
    interesteds_count,
    going_id,
    goings_count,
    eventPage,
    setEvents,
    setGenres,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    // It redirects the user to the event edit page.
    history.push(`/events/${id}/edit`);
  };

  const handleDelete = async () => {
    // It deletes the event and redirects the user to their profile.
    try {
      await axiosRes.delete(`/events/${id}/`);
      history.push(`/profiles/${currentUser.pk}`);
      NotificationManager.success(
        `You successfully deleted the event!`,
        "Event delete",
        3000
      );
    } catch (err) {
      //console.log(err);
      NotificationManager.error(
        `Oops! Something went wrong when deleting the event...`,
        "Event delete error",
        3000
      );
    }
  };

  const handleInterested = async () => {
    // It sends the new Interested object to the API endpoint
    // and updates the interesteds_count of the event
    // in the events variable.
    try {
      const { data } = await axiosRes.post("/interested/", {
        posted_event: id,
      });
      setEvents((prevEvents) => ({
        ...prevEvents,
        results: prevEvents.results.map((posted_event) => {
          return posted_event.id === id
            ? {
                ...posted_event,
                interesteds_count: posted_event.interesteds_count + 1,
                interested_id: data.id,
              }
            : posted_event;
        }),
      }));
    } catch (err) {
      //console.log(err);
    }
  };

  const handleUninterested = async () => {
    // It deletes the Interested object from the database
    // and updates the interested_count of the event
    // in the events variable.
    try {
      await axiosRes.delete(`/interested/${interested_id}`);
      setEvents((prevEvents) => ({
        ...prevEvents,
        results: prevEvents.results.map((posted_event) => {
          return posted_event.id === id
            ? {
                ...posted_event,
                interesteds_count: posted_event.interesteds_count - 1,
                interested_id: null,
              }
            : posted_event;
        }),
      }));
    } catch (err) {
      //console.log(err);
    }
  };
  const handleGoing = async () => {
    // It sends the new Going object to the API endpoint
    // and updates the goings_count of the event
    // in the events variable.
    try {
      const { data } = await axiosRes.post("/going/", { posted_event: id });
      setEvents((prevEvents) => ({
        ...prevEvents,
        results: prevEvents.results.map((posted_event) => {
          return posted_event.id === id
            ? {
                ...posted_event,
                goings_count: posted_event.goings_count + 1,
                going_id: data.id,
              }
            : posted_event;
        }),
      }));
    } catch (err) {
      //console.log(err);
    }
  };

  const handleNotGoing = async () => {
    // It deletes the Going object from the database
    // and updates the going_count of the event
    // in the events variable.
    try {
      await axiosRes.delete(`/going/${going_id}`);
      setEvents((prevEvents) => ({
        ...prevEvents,
        results: prevEvents.results.map((posted_event) => {
          return posted_event.id === id
            ? {
                ...posted_event,
                goings_count: posted_event.goings_count - 1,
                going_id: null,
              }
            : posted_event;
        }),
      }));
    } catch (err) {
      //console.log(err);
    }
  };
  return (
    <Container>
      <Card className={styles.Event}>
        <Card.Body>
          <Media className="align-item-center justify-content-between">
            <Link
              name="profile"
              className="d-flex"
              to={`/profiles/${profile_id}/`}
            >
              <Avatar src={profile_image} height={55} />
              <p className={styles.Name}>{owner}</p>
            </Link>
            <div className="d-sm-flex align-item-center">
              <span className={`${styles.CreatedAt} d-none d-sm-inline`}>
                {updated_at}
              </span>

              {is_owner && eventPage && (
                <MoreDropdown
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              )}
            </div>
          </Media>
        </Card.Body>
        <Link name="event" to={`/events/${id}/`}>
          <Card.Img className={styles.EventImage} src={image} alt={title} />
        </Link>
        <Card.Body>
          {date && (
            <Card.Subtitle>
              {format(new Date(date), "d-MMM-yyyy")}
            </Card.Subtitle>
          )}
          {date && eventPage && (
            <Card.Subtitle className="p-2">
              Time: {format(new Date(date), "HH.mm")}
            </Card.Subtitle>
          )}
          {title && (
            <Card.Title className="text-center">
              <h3>{title}</h3>
            </Card.Title>
          )}
          {location && (
            <Card.Subtitle className="p-2">
              <strong>{location}</strong>
            </Card.Subtitle>
          )}
          {!eventPage && category_name && (
            <Card.Subtitle className="p-2">
              Category: {category_name}
            </Card.Subtitle>
          )}

          {eventPage && (
            <>
              {address && <Card.Subtitle>{address}</Card.Subtitle>}
              <hr />
              {content && <Card.Text>{content}</Card.Text>}
            </>
          )}

          <div>
            <hr />
            {interested_id ? (
              <span onClick={handleUninterested}>
                <i className={`fas fa-star ${styles.Star}`} />
              </span>
            ) : currentUser ? (
              <span onClick={handleInterested}>
                <i className={`far fa-star ${styles.StarOutline}`} />
              </span>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip>Log in to show your interest to an event!</Tooltip>
                }
              >
                <i className="far fa-star" />
              </OverlayTrigger>
            )}
            {interesteds_count}

            {going_id ? (
              <span onClick={handleNotGoing}>
                <i className={`fas fa-calendar-check ${styles.Star}`} />
              </span>
            ) : currentUser ? (
              <span onClick={handleGoing}>
                <i className={`far fa-calendar-check ${styles.StarOutline}`} />
              </span>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip>
                    Log in to show that you are going to an event!
                  </Tooltip>
                }
              >
                <i className="far fa-calendar-check" />
              </OverlayTrigger>
            )}
            {goings_count}

            <Link aria-label={`link-to-event-${title}`} to={`/events/${id}`}>
              <i className="far fa-comments" />
            </Link>
            {comments_count}
          </div>
          <hr />
          {eventPage && category_name && (
            <Card.Subtitle>Category: {category_name}</Card.Subtitle>
          )}
        </Card.Body>
      </Card>
      {is_owner && eventPage && (
        <EventGenreCreateForm category={category} setGenres={setGenres} />
      )}
    </Container>
  );
};

export default Event;
