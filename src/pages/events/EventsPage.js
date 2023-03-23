import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import styles from "../../styles/EventsPage.module.css";
import { useLocation, Link } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results.png";
import Event from "./Event";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const EventsPage = ({ message, filter = "" }) => {
  const [events, setEvents] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axiosReq.get(
          `/events/?${filter}search=${query}`
        );
        setEvents(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);

    const timer = setTimeout(() => {
      fetchEvents();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname]);
  return (
    <Row className="h-100 pt-4">
      <PopularProfiles mobile />
      <Col className="pt-1" lg={3} md={12}>
        <Row className="py-2">
          <h3>Events</h3>
        </Row>
        <Row className="flex-nowrap pr-4">
          <i className={`fas fa-search ${styles.SearchIcon}`} />
          <Form
            className={styles.SearchBar}
            onSubmit={(event) => event.preventDefault()}
          >
            <Form.Control
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="text"
              className="mr-sm-2"
              placeholder="Search events"
            />
          </Form>
          <OverlayTrigger
            key="top"
            placement="top"
            overlay={
              <Tooltip id={`tooltip-top`}>
                Search for events by date (Year-Month-Day numbers), title, or name of the user that
                posted it!
              </Tooltip>
            }
          >
            <div className="px-1">
              <i className={`fas fa-info-circle ${styles.InfoIcon}`} />
            </div>
          </OverlayTrigger>
        </Row>
      </Col>

      <Col className="py-2 p-0 p-lg-2" lg={6}>
        {currentUser && <Link name="event create form" className="d-none d-md-inline" to={`/events/create`}>
          <Container className="d-inline-flex justify-content-center px-4">
            <h3 className={`${styles.AddLink} d-flex align-items-center mb-0`}>
              Add the next event!{" "}
            </h3>
            <i
              className={`fas fa-plus-square d-flex px-3 ${styles.AddEvent}`}
            />
          </Container>
        </Link>}

        {hasLoaded ? (
          <>
            {events.results.length ? (
              <InfiniteScroll
                children={events.results.map((event) => (
                  <Event key={event.id} {...event} setEvents={setEvents} />
                ))}
                dataLength={events.results.length}
                loader={<Asset spinner />}
                hasMore={!!events.next}
                next={() => fetchMoreData(events, setEvents)}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col lg={3} md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
};

export default EventsPage;
