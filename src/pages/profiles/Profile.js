import React from "react";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import Button from "react-bootstrap/Button";
import { useSetProfileData } from "../../contexts/ProfileDataContext";

const Profile = (props) => {
  const { profile, mobile, imageSize = 55, eventPage } = props;
  const { id, following_id, image, owner } = profile;
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const { handleFollow, handleUnfollow } = useSetProfileData();

  return (
    <div
      className={`${!eventPage && "my-1"} d-flex align-item-center ${
        mobile && "flex-column"
      }`}
    >
      <div className="align-self-center">
        <Link
          name="profile"
          className="align-self-center"
          to={`/profiles/${id}`}
        >
          <Avatar src={image} height={imageSize} />
        </Link>
      </div>
      <div
        className={`${styles.WordBreak} ${styles.Usernames} 
        ${!mobile && currentUser && !is_owner && "mx-auto"}
        ${!mobile && !currentUser && "mx-auto"}
        ${!mobile && currentUser && is_owner && "mx-lg-3"}`}
      >
        <strong>{owner}</strong>
      </div>
      <div className={`text-right py-3 ${!mobile && "ml-auto"}`}>
        {!mobile &&
          currentUser &&
          !is_owner &&
          (following_id ? (
            <Button
              className={`${btnStyles.Button} ${btnStyles.PurpleOutline} ${styles.Button}`}
              onClick={() => handleUnfollow(profile)}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              // ${eventPage && styles.Button}
              className={` ${btnStyles.Purple} ${btnStyles.Button}`}
              onClick={() => handleFollow(profile)}
            >
              Follow
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Profile;
