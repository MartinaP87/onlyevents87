import { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Category from "./Category";
import Container from "react-bootstrap/Container";
import GenreCreateForm from "../genres/GenreCreateForm";
import Genre from "../genres/Genre";
import { useRedirect } from "../../hooks/useRedirect";
import { useParams } from "react-router-dom";

function CategoryPage() {
  // It redirects the logged out user to the home page.
  useRedirect("loggedOut");
  const { id } = useParams();
  const [categoryData, setCategoryData] = useState([]);
  const [genres, setGenres] = useState([]);
  const currentUser = useCurrentUser();
  const admin = currentUser?.pk === 1;

  useEffect(() => {
    // It requests the category and its genres to the API
    // endpoint and updates the category data and genres variables.
    const handleMount = async () => {
      try {
        const [{ data: category }, { data: genres }] = await Promise.all([
          axiosReq.get(`/categories/${id}`),
          axiosReq.get(`/categories/genres/?category=${id}`),
        ]);
        setCategoryData([category]);
        setGenres(genres);
      } catch (err) {
        //console.log(err);
      }
    };
    // If the user is logged in it runs the function,
    // otherwise it redirects to the home page.
    currentUser && handleMount();
  }, [id, currentUser]);
  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={6}>
        <Category
          {...categoryData[0]}
          setCategories={setCategoryData}
          categoryPage
        />
        {genres.length ? (
          genres.map((genre) => (
            <Genre key={genre.id} {...genre} setGenres={setGenres} cat_id={id}/>
          ))
        ) : (
          <p>No genres in this category yet</p>
        )}
      </Col>
      {admin && (
        <Col lg={6} className="d-lg-block p-0 p-lg-2">
          <Container>
            <GenreCreateForm id={id} setGenres={setGenres} />
          </Container>
        </Col>
      )}
    </Row>
  );
}

export default CategoryPage;
