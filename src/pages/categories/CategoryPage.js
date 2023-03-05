import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Category from "./Category";
import { Container } from "react-bootstrap";
import GenreCreateForm from "../genres/GenreCreateForm";
import Genre from "../genres/Genre";

function CategoryPage() {
  const { id } = useParams();
  const [categoryData, setCategoryData] = useState({ results: [] });
  const [genres, setGenres] = useState({ results: [] });
  // const currentUser = useCurrentUser();
  // const admin = currentUser.pk === 1;

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: category }, { data: genres}] = await Promise.all([
          axiosReq.get(`/categories/${id}`),
          axiosReq.get(`/categories/genres/?category=${id}`),
        ]);
        setCategoryData({ results: [category] });
        setGenres(genres);
        
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={6}>
        <Category
          {...categoryData.results[0]}
          setCategories={setCategoryData}
          categoryPage
        />
        {genres.results.length ? 
          genres.results.map((genre) => (
        <Genre 
        key={genre.id} 
        {...genre}
        setGenres={setGenres}
        cat_id={id}
        />
          )) : <p>No genres in this category yet</p>}
      </Col>
      {
      // admin && 
      <Col lg={6} className="d-lg-block p-0 p-lg-2">
        <Container>
          <GenreCreateForm 
          id={id}
          setGenres={setGenres}
          />
        </Container>
      </Col>}
    </Row>
  );
}

  /* <Container>
            {currentUser ? (
              <CommentCreateForm
                profile_id={currentUser.profile_id}
                profileImage={profile_image}
                event={id}
                setEvent={setEvent}
                setComments={setCategory}
              />
            ) : genres.results.length ? (
              "Genres:"
            ) : null}
            {genres.results.length ? (
              <InfiniteScroll 
              children={genres.results.map((genre) => (
                <Genre key={genre.id} {...genre}
                setEvent={setEvent}
                setComments={setComments} />
              ))}
              dataLength={comments.results.length}
              loader={<Asset spinner />}
              hasMore={!!comments.next}
              next={() => fetchMoreData(comments, setComments)}
              />
            ) : currentUser? (
              <span>No comments yet, be the first to comment!</span>
            ) : (
              <span>No comments... yet</span>
            )}
          </Container> */

export default CategoryPage;
