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
import { useHistory, useParams } from "react-router-dom";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { axiosReq } from "../../api/axiosDefaults";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import InfiniteScroll from "react-infinite-scroll-component";
import Event from "../events/Event";
import Preference from "./preferences/Preference";
import PreferenceCreateForm from "./preferences/PreferenceCreateForm";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const history = useHistory();
  const is_owner = currentUser?.username === profile?.owner;
  const [profileEvents, setProfileEvents] = useState({
    results: [],
  });
  const [preferences, setPreferences] = useState({
    results: [],
  });
  const allCategories = preferences.results.map(
    (preference) => preference.category
  );
  const filteredCategories = allCategories.filter(
    (cat, idx) => allCategories.indexOf(cat) === idx
  );

  useEffect(() => {
    const fetchData = async () => {
      // It requests to the API endpoint the profile,
      // the owner events, and preferences and stores
      // them respectively in profileData, profileEvents,
      // and preferences. It sets the hasLoaded variable to true.
      try {
        const [
          { data: pageProfile },
          { data: profileEvents },
          { data: preferences },
        ] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
          axiosReq.get(`/events/?owner__profile=${id}`),
          axiosReq.get(`/profiles/preferences/?profile=${id}`),
        ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfileEvents(profileEvents);
        setPreferences(preferences);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfileHeader = (
    <>
      <Row noGutters className="justify-content-center">
        <Image
          alt={`${profile?.username}'s image`}
          className={styles.ProfileImage}
          roundedCircle
          src={profile?.image}
        />
      </Row>
      <Row className="my-3 justify-content-center">
        {profile?.is_owner ? (
          <>
            <Col
              xs={10}
              sm={6}
              lg={12}
              className="d-flex justify-content-center"
            >
              <Container className="px-0 d-flex">
                <ProfileEditDropdown id={profile?.id} />
                <div className="ml-auto">
                  <Button
                    className={btnStyles.Button}
                    onClick={() => history.push(`/my_photos/${id}`)}
                  >
                    Photos
                  </Button>
                </div>
              </Container>
            </Col>
          </>
        ) : (
          <>
            {currentUser && (
              <Button
                className={btnStyles.Button}
                onClick={() => history.push(`/my_photos/${id}`)}
              >
                Photos
              </Button>
            )}
          </>
        )}
      </Row>
    </>
  );
  const mainProfileActions = (
    <>
      <Row className="my-3 justify-content-center ">
        {is_owner && <PreferenceCreateForm setPreferences={setPreferences} />}
      </Row>
      <Row className="my-3 justify-content-center">
        <>
          {preferences.results.length ? (
            <Container
              className={`justify-content-center ${appStyles.Content}`}
            >
              <h3 className="pb-1">{profile?.owner}'s favorites:</h3>
              {filteredCategories.map((uniqueCategory) => (
                <Container className="p-2" key={uniqueCategory}>
                  <h5 className="p-2">{uniqueCategory}</h5>
                  <InfiniteScroll
                    children={preferences.results.map((preference) => (
                      <div className={`${styles.Genres}`} key={preference.id}>
                        {preference.category === uniqueCategory && (
                          <Preference
                            {...preference}
                            setPreferences={setPreferences}
                          />
                        )}
                      </div>
                    ))}
                    dataLength={preferences.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!preferences.next}
                    next={() => fetchMoreData(preferences, setPreferences)}
                  />
                </Container>
              ))}
            </Container>
          ) : (
            <p> No preferences yet...</p>
          )}
        </>
      </Row>
    </>
  );

  const mainProfileDetails = (
    <>
      <Row className="mx-1 text-center">
        <Col xs={12} lg={10} className={styles.FollowersBox}>
          <h3 className="m-2">{profile?.owner}</h3>
          <Row className="justify-content-between no-gutters">
            <Col xs={3} className="my-2">
              <div>{profile?.events_count}</div>
              <div className={styles.BoxText}>Events</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.followers_count}</div>
              <div className={styles.BoxText}>Followers</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.following_count}</div>
              <div className={styles.BoxText}>Following</div>
            </Col>
          </Row>
        </Col>
        <Col lg={2} className="text-lg-right px-0">
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={`${btnStyles.Button} ${btnStyles.PurpleOutline}`}
                onClick={() => handleUnfollow(profile)}
              >
                Unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Purple}`}
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
    <Row className="h-100">
      {hasLoaded ? (
        <>
          <Col lg={3} className="d-none d-lg-block">
            {mainProfileHeader}
            {mainProfileActions}
          </Col>
          <Col className="py-2 p-0 p-lg-2" lg={6}>
            <Container className={appStyles.Content}>
              <div className="d-lg-none">{mainProfileHeader}</div>

              {mainProfileDetails}
              <hr />
              <div className="d-lg-none">{mainProfileActions}</div>
              {mainProfileEvents}
            </Container>
          </Col>
          <Col lg={3} className="d-none d-lg-block p-0 pt-lg-2">
            <PopularProfiles />
          </Col>
        </>
      ) : (
        <Asset spinner />
      )}
    </Row>
  );
}

export default ProfilePage;
