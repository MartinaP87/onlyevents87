import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";
import NoResults from "../../assets/no-results.webp";
import Asset from "../../components/Asset";
import styles from "../../styles/GoingInterestedProfiles.module.css";

const GoingProfiles = (props) => {
  const { popularProfiles } = useProfileData();
  const { id, going_count } = props;
  const [going, setGoing] = useState({ results: [] });
  const goingProfiles = popularProfiles?.results.filter((profile) =>
    going?.results
      .map((person_going) => person_going.owner)
      .includes(profile.owner)
  );

  useEffect(() => {
    // It requests the going data to the API endpoint and
    // stores it in the going variable.
    const fetchData = async () => {
      try {
        const { data } = await axiosReq.get(`/going/?posted_event=${id}`);
        setGoing(data);
      } catch (err) {
        //console.log(err);
      }
    };
    // It runs the function only if the id is defined.
    id && fetchData();
  }, [id, going_count]);

  return (
    <Container className={`${appStyles.Content} mb-3`}>
      <h3 className={styles.Title}>{going_count} Going:</h3>
      {goingProfiles.length ? (
        goingProfiles.map((profile) => (
          <Profile
            key={profile.id}
            profile={profile}
            eventPage
            imageSize={40}
          />
        ))
      ) : (
        <Asset className={styles.NoResult} src={NoResults} />
      )}
    </Container>
  );
};

export default GoingProfiles;
