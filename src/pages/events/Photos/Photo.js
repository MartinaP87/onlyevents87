import React from "react";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../../components/Avatar";
import styles from "../../../styles/Photo.module.css";
import { axiosRes } from "../../../api/axiosDefaults";
import { MoreDropdown } from "../../../components/MoreDropdown";

const Photo = (props) => {
  const {
    id,
    owner,
    gallery,
    title,
    created_at,
    image,
    is_owner,
    profile_id,
    profile_image,
    photoPage,
  } = props;

  const history = useHistory();

  const handleEdit = () => {
    // It redirects the user to the photo edit page.
    history.push(`/events/galleries/photos/${id}/edit`);
  };

  const handleDelete = async () => {
    // It deletes the photo from the database and redirects
    // the user to the event page.
    try {
      await axiosRes.delete(`/events/galleries/photos/${id}/`);
      history.push(`/events/${gallery}`);
    } catch (err) {
      //console.log(err);
    }
  };

  return (
    <Card className={`${styles.PhotoCard} `}>
      {photoPage && (
        <Card.Body className="py-1">
          <Media className="align-item-center justify-content-between">
            <Link
              className={styles.Pink}
              name="profile"
              to={`/profiles/${profile_id}/`}
            >
              <Avatar src={profile_image} height={55} />
              {owner}
            </Link>
            <div className="d-flex align-item-center">
              <span>{created_at}</span>

              {is_owner && (
                <MoreDropdown
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              )}
            </div>
          </Media>
          {title && (
            <Card.Title className="text-center p-0">{title}</Card.Title>
          )}
        </Card.Body>
      )}

      <Link name={`${title} image`} to={`/events/galleries/photos/${id}/`}>
        <Card.Img className={styles.Photo} src={image} alt={title} />
      </Link>
    </Card>
  );
};

export default Photo;
