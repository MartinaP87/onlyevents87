import React, { useState } from "react";
import Media from "react-bootstrap/Media";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { MoreDropdown } from "../../components/MoreDropdown";
import { axiosRes } from "../../api/axiosDefaults";
import CategoryEditForm from "./CategoryEditForm";
import { Link, useHistory } from "react-router-dom";
import { NotificationManager } from "react-notifications";

const Category = (props) => {
  const { cat_name, id, setCategories, categoryPage } = props;
  const currentUser = useCurrentUser();
  const admin = currentUser?.pk === 1;
  const [showEditForm, setShowEditForm] = useState(false);
  const history = useHistory();

  const handleDelete = async () => {
    // It deletes the category from the database, redirects
    // the user to the categories page, and updates the
    // categories variable.
    try {
      await axiosRes.delete(`/categories/${id}/`);
      history.push("/categories/");
      setCategories((prevCategories) => ({
        ...prevCategories,
        results: prevCategories.results.filter(
          (category) => category.id !== id
        ),
      }));
      NotificationManager.success(
        `You successfully deleted the category!`,
        "Category delete",
        3000
      );
    } catch (err) {
      //console.log(err);
      NotificationManager.error(
        `Ups! Something went wrong when deleting the category...`,
        "Category delete error",
        3000
      );
    }
  };

  return (
    <>
      <hr />
      <Media>
        <Media.Body className="align-self-center">
          {showEditForm ? (
            <CategoryEditForm
              id={id}
              cat_name={cat_name}
              setCategories={setCategories}
              setShowEditForm={setShowEditForm}
            />
          ) : categoryPage ? (
            <Link aria-label={cat_name} to={`/categories/${id}/`}>
              <h1>{cat_name}</h1>
            </Link>
          ) : (
            <Link aria-label={cat_name} to={`/categories/${id}/`}>
              <p>{cat_name}</p>
            </Link>
          )}
        </Media.Body>
        {admin && categoryPage && (
          <MoreDropdown
            handleEdit={() => {
              setShowEditForm(true);
            }}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </>
  );
};

export default Category;
