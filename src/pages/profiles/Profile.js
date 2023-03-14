import React from 'react'
import styles from "../../styles/Profile.module.css"
import btnStyles from "../../styles/Button.module.css"
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { Link } from 'react-router-dom'
import Avatar from '../../components/Avatar'
import { Button } from 'react-bootstrap'
import { useSetProfileData } from '../../contexts/ProfileDataContext'

const Profile = (props) => {
    const {profile, mobile, imageSize=55, eventPage} = props
    const {id, following_id, image, owner } = profile
    const currentUser = useCurrentUser()
    const is_owner = currentUser?.username === owner
    const {handleFollow, handleUnfollow} = useSetProfileData()
  return (
    
    <div className={`${!eventPage && "my-1"} d-flex align-item-center ${mobile && "flex-column"}`}>
        <div>
            <Link className="align-self-center" to={`/profiles/${id}`}>
                <Avatar src={image} height={imageSize}/>
            </Link>
        </div>
        <div className={`mx-2 ${styles.WordBreak} ${styles.Usernames}`}>
            <strong>{owner}</strong>
        </div>
        <div className={`text-right py-3 ${!mobile && 'ml-auto'}`}>
            {!mobile && currentUser && ! is_owner && (
                following_id ? (
                    <Button 
                    className={`${btnStyles.Button} ${btnStyles.BlackOutline} ${styles.Button}`}
                    onClick={()=>handleUnfollow(profile)}>
                        Unfollow</Button>
                ) : (
                    <Button 
                    className={`${eventPage && styles.Button} ${btnStyles.Black} ${btnStyles.Button}`}
                    onClick={()=>handleFollow(profile)}>
                        Follow</Button>
                )
            )}
        </div>
    </div>
  )
}

export default Profile