import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import NoResults from "../../assets/no-results.webp";
import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";
import styles from "../../styles/GoingInterestedProfiles.module.css";

const InterestedProfiles = (props) => {
  const { popularProfiles } = useProfileData();
  const { id, interested_count } = props;
  const [interested, setInterested] = useState({ results: [] });

  useEffect(() => {
    // It requests the interested data to the API endpoint and
    // stores it in the interested variable.
    const fetchData = async () => {
      try {
        const { data } = await axiosReq.get(`/interested/?posted_event=${id}`);
        setInterested(data);
      } catch (err) {
        //console.log(err);
      }
    };
    // It runs the function only if the id is defined.
    id && fetchData();
  }, [id, interested_count]);

  const interestedProfiles = popularProfiles?.results.filter((profile) =>
    interested?.results
      .map((person_interested) => person_interested.owner)
      .includes(profile.owner)
  );

  return (
    <Container className={`${appStyles.Content} mb-3`}>
      <h3 className={styles.Title}>{interested_count} Interested:</h3>
      {interestedProfiles.length ? (
        interestedProfiles.map((profile) => (
          <Profile
            key={profile.id}
            profile={profile}
            eventPage
            imageSize={40}
          />
        ))
      ) : (
        <div>
          <Asset className={styles.NoResult} src={NoResults} />
        </div>
      )}
    </Container>
  );
};

export default InterestedProfiles;
