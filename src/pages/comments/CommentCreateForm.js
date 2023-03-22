import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import btnStyles from "../../styles/Button.module.css"
import styles from "../../styles/CommentCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

function CommentCreateForm(props) {
  const { event, setEvent, setComments, profileImage, profile_id } = props;
  const [content, setContent] = useState("");

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content: content,
        posted_event: event,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setEvent((prevEvent) => ({
        results: [
          {
            ...prevEvent.results[0],
            comments_count: prevEvent.results[0].comments_count + 1,
          },
        ],
      }));
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link name="profile" to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          <Form.Control
            className={styles.Form}
            placeholder="my comment..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      <button
        className={`${btnStyles.Button} ${styles.White} d-block ml-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        post
      </button>
    </Form>
  );
}

export default CommentCreateForm;
