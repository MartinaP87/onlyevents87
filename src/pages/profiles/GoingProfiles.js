import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";
import NoResults from "../../assets/no-results.png";
import Asset from "../../components/Asset";
import styles from "../../styles/GoingInterestedProfiles.module.css";

const GoingProfiles = (props) => {
  const { popularProfiles } = useProfileData();
  const { id, going_count } = props;
  const [going, setGoing] = useState({ results: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosReq.get(`/going/?posted_event=${id}`);
        setGoing(data);
      } catch (err) {
        console.log(err);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id, going_count]);

  const goingProfiles = popularProfiles?.results.filter((profile) =>
    going?.results
      .map((person_going) => person_going.owner)
      .includes(profile.owner)
  );

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
        <Asset src={NoResults} />
      )}
    </Container>
  );
};

export default GoingProfiles;
