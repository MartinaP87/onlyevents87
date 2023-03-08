import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { ProfileEditDropdown } from "../../components/MoreDropdown";
import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results.png";
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link, useParams } from "react-router-dom";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { axiosReq } from "../../api/axiosDefaults";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import InfiniteScroll from "react-infinite-scroll-component";
import Event from "../events/Event";
import Preference from "./prefernces/Preference";
import PreferenceCreateForm from "./prefernces/PreferenceCreateForm";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;
  const [profileEvents, setProfileEvents] = useState({
    results: [],
  });
  const [preferences, setPreferences] = useState({
    results: [],
  });
  const [preferenceChoice, setPreferenceChoice] = useState({
    results: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          { data: pageProfile },
          { data: profileEvents },
          { data: preferences },
          { data: preferenceChoice },
        ] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
          axiosReq.get(`/events/?owner__profile=${id}`),
          axiosReq.get(`/profiles/preferences/?profile=${id}`),
          axiosReq.get(`/categories/genres/`),
        ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfileEvents(profileEvents);
        setPreferences(preferences);
        setPreferenceChoice(preferenceChoice);
        setHasLoaded(true);
        console.log("PREF", preferences.results.length);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfileActions = (
    <Container>
      <Row noGutters className="justify-content-center">
        <Image
          className={styles.ProfileImage}
          roundedCircle
          src={profile?.image}
        />
      </Row>
      <Row className="my-3 justify-content-center">
        {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
        <Button className="ml-auto">
          <Link to={`/my_photos/${id}`}>Photos</Link>
          
        </Button>
      </Row>
      <Row className="my-3 justify-content-center">
        {is_owner && (
          <PreferenceCreateForm
            preferenceChoice={preferenceChoice}
            setPreferences={setPreferences}
          />
        )}
      </Row>
      <Row className="my-3 justify-content-center">
        <Col lg={12}>
        {preferences.results.length ? (
          <InfiniteScroll
            children={preferences.results.map((preference) => (
              <Preference
                key={preference.id}
                {...preference}
                setPreferences={setPreferences}
              />
            ))}
            dataLength={preferences.results.length}
            loader={<Asset spinner />}
            hasMore={!!preferences.next}
            next={() => fetchMoreData(preferences, setPreferences)}
          />
        ) : (
          <p> No preferences yet...</p>
        )}</Col>
      </Row>
    </Container>
  );

  const mainProfile = (
    <>
      <Row noGutters className="px-3 text-center">
        <Col lg={9}>
          <h3 className="m-2">{profile?.owner}</h3>
          <Row className="justify-content-center no-gutters">
            <Col xs={3} className="my-2">
              <div>{profile?.events_count}</div>
              <div>Events</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.followers_count}</div>
              <div>Followers</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.following_count}</div>
              <div>Following</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                onClick={() => handleUnfollow(profile)}
              >
                Unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Black}`}
                onClick={() => handleFollow(profile)}
              >
                Follow
              </Button>
            ))}
        </Col>
        {profile?.content && <Col className="p-3">{profile.content}</Col>}
      </Row>
    </>
  );

  const mainProfileEvents = (
    <>
      <hr />
      <p className="text-center">{profile?.owner}'s events</p>
      <hr />
      {profileEvents.results.length ? (
        <InfiniteScroll
          children={profileEvents.results.map((event) => (
            <Event key={event.id} {...event} setEvents={setProfileEvents} />
          ))}
          dataLength={profileEvents.results.length}
          loader={<Asset spinner />}
          hasMore={!!profileEvents.next}
          next={() => fetchMoreData(profileEvents, setProfileEvents)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't posted any events yet.`}
        />
      )}
    </>
  );

  return (
    <Row>
      <Col lg={3}>{mainProfileActions}</Col>
      <Col className="py-2 p-0 p-lg-2" lg={6}>
        <PopularProfiles mobile />
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfileEvents}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={3} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;
