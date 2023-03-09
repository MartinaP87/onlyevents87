import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";
import NoResults from "../../assets/no-results.png";
import Asset from "../../components/Asset";

const GoingProfiles = (props) => {
  const { popularProfiles } = useProfileData();
  const {mobile, id} = props
  const [going, setGoing] = useState({results: []})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosReq.get(`/going/?posted_event=${id}`)
        setGoing(data)
      } catch(err) {console.log(err)}
    }
    if (id) {
    fetchData()}
  }, [id])

const goingProfiles = popularProfiles?.results.filter((profile) => 
going?.results.map((person_going) => person_going.owner).includes(profile.owner) ); 

 
  return (

    <Container className={`${appStyles.Content} mb-3 ${mobile && "d-lg-none text-center py-4 mb-3"}`}>
      <h3>Going</h3>
      {goingProfiles.length ? (
        <>  
          {mobile ? (
            <div className="d-flex justify-content-around">
                {goingProfiles.slice(0,4).map((profile) => (
            <Profile key={profile.id} profile={profile} mobile />
          ))}
            </div>
          ) : (
            goingProfiles.map((profile) => (
                <Profile key={profile.id} profile={profile} eventPage imageSize={30}/>
          ))
          )}
          
        </>
      ) : (
        <Asset src={NoResults} />
      )}
    </Container>
  );
};

export default GoingProfiles;
