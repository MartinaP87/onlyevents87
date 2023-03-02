import React, { useState } from "react";
import { Media } from "react-bootstrap";
// import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { MoreDropdown } from '../../components/MoreDropdown';
import { axiosRes } from '../../api/axiosDefaults';
import CategoryEditForm from "./CategoryEditForm";

const Category = (props) => {
    const {
        cat_name,
        id,
        setCategories,
    } = props;
    // const currentUser = useCurrentUser();
    const [showEditForm, setShowEditForm] = useState(false)

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/categories/${id}/`);
            
            setCategories((prevCategories) => ({
                ...prevCategories,
                results: prevCategories.results.filter((category) => category.id !== id),
            }));
        } catch(err) {
            console.log(err)
        }
    };

  return (
    <>
        <hr />
        <Media>
          <Media.Body className="align-self-center ml-2">
          {showEditForm ? (
              <CategoryEditForm
              id={id}
              cat_name={cat_name}
              setCategories={setCategories}
              setShowEditForm={setShowEditForm}
            />
            ) : (
              <p key={id}>{cat_name}</p>
            )}
          
          </Media.Body>
            <MoreDropdown
              handleEdit={() => {setShowEditForm(true)}}
              handleDelete={handleDelete}
            />
        </Media>
      </>
  )
}

export default Category