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

const EventsPage = ({ message, filter = "" }) => {
  const [events, setEvents] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");

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
    <Row className="h-100">
      <Col lg={3}>
        <Row>Logo</Row>
        <Row>
          <h1>Events</h1>
        </Row>
        <Row>
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
            overlay={<Tooltip id={`tooltip-top`}>
              Search for events by date, title, or name of the user that posted it!
            </Tooltip>}
          >
            <div>
              <i className={`fas fa-info-circle ${styles.InfoIcon}`} />
            </div>
          </OverlayTrigger>
        </Row>
        <Row>Genres</Row>
      </Col>

      <Col className="py-2 p-0 p-lg-2" lg={6}>
        <Link to={`/events/create`}>
          <Container className="d-inline-flex justify-content-between px-4">
            <h2 className="d-flex mb-0">Add the next event! </h2>
            <i
              className={`fas fa-plus-square d-flex pt-0 ${styles.AddEvent}`}
            />
          </Container>
        </Link>

        <PopularProfiles mobile />

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
