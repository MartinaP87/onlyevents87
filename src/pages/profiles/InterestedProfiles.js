import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import NoResults from "../../assets/no-results.png";
import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";

const InterestedProfiles = (props) => {
  const { popularProfiles } = useProfileData();
  const {mobile, id} = props
  const [interested, setInterested] = useState({results: []})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosReq.get(`/interested/?posted_event=${id}`)
        setInterested(data)
      } catch(err) {console.log(err)}
    }
    if (id) {
      fetchData()}
  }, [id])

const interestedProfiles = popularProfiles?.results.filter((profile) => 
interested?.results.map((person_interested) => person_interested.owner).includes(profile.owner) ); 

 
  return (

    <Container className={`${appStyles.Content} ${mobile && "d-lg-none text-center mb-3"}`}>
       <h3>Interested</h3>
      {interestedProfiles.length ? (
        <>
         
          {mobile ? (
            <div className="d-flex justify-content-around">
                {interestedProfiles.slice(0,4).map((profile) => (
            <Profile key={profile.id} profile={profile} mobile />
          ))}
            </div>
          ) : (
            interestedProfiles.map((profile) => (
                <Profile key={profile.id} profile={profile} eventPage imageSize={30} />
          ))
          )}
          
        </>
      ) : (
        <Asset src={NoResults} />
      )}
    </Container>
  );
};

export default InterestedProfiles;
