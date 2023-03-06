import React, { useState } from "react";
import styles from "../../styles/Comment.module.css";
import { Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { MoreDropdown } from '../../components/MoreDropdown';
import { axiosRes } from '../../api/axiosDefaults';
import CommentEditForm from "./CommentEditForm";


const Comment = (props) => {
    const {
        profile_id,
        profile_image,
        owner,
        updated_at,
        content,
        id,
        like_id,
        likes_count,
        setEvent,
        setComments,
    } = props;
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const [showEditForm, setShowEditForm] = useState(false);

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/comments/${id}/`);
            setEvent((prevEvent) => ({
                results: [{
                    ...prevEvent.results[0],
                    comments_count: prevEvent.results[0].comments_count - 1,
                },
              ],
            }));
            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.filter((comment) => comment.id !== id),
            }));
        } catch(err) {
            console.log(err)
        }
    };

    const handleLike = async () => {
      try {
        const { data } = await axiosRes.post("/likes/", {
          comment: id,
        });
        setComments((prevComments) => ({
          ...prevComments,
          results: prevComments.results.map((comment) => {
            // console.log(posted_event);
            return comment.id === id
              ? {
                  ...comment,
                  likes_count: comment.likes_count + 1,
                  like_id: data.id,
                }
              : comment;
          }),
        }));
      } catch (err) {
        console.log(err);
      }
    };
  
    const handleUnlike = async () => {
      try {
        axiosRes.delete(`/likes/${like_id}`);
        setComments((prevComments) => ({
          ...prevComments,
          results: prevComments.results.map((comment) => {
            return comment.id === id
              ? {
                  ...comment,
                  likes_count: comment.likes_count - 1,
                  like_id: null,
                }
              : comment;
          }),
        }));
      } catch (err) {
        console.log(err);
      }
    };
   

  return (
      <>
        <hr />
        <Media>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} />
          </Link>
          <Media.Body className="align-self-center ml-2">
            <span className={styles.Owner}>{owner}</span>
            <span className={styles.Date}>{updated_at}</span>
            {showEditForm ? (
              <CommentEditForm
              id={id}
              profile_id={profile_id}
              content={content}
              profileImage={profile_image}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
            ) : (<>
              <p>{content}</p>
              <div>
                {is_owner ? 
                (<OverlayTrigger placement="top" overlay={<Tooltip>
                  You can't like your own comment!
                </Tooltip>}>
                  <i className="fas fa-heart" />
                </OverlayTrigger>) : like_id ? (
                  <span onClick={handleUnlike}>
                    <i className={`far fa-heart ${styles.Heart}`}/>
                  </span>
                ) : currentUser ? (
                  <span onClick={handleLike}>
                    <i className={`fas fa-heart ${styles.HeartOutline}`}/>
                  </span>
                ) : (<OverlayTrigger placement="top" overlay={<Tooltip>
                  Log in to like comments!
                </Tooltip>}>
                  <i className="far fa-heart" />
                </OverlayTrigger>)}
                {likes_count}
              </div>
              </>

            )}
          </Media.Body>
          {is_owner && !showEditForm && (
            <MoreDropdown
              handleEdit={() => setShowEditForm(true)}
              handleDelete={handleDelete}
            />
          )}
        </Media>
      </>
    );
}

export default Comment