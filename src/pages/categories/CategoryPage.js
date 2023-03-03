import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import Container from "react-bootstrap/Container";
// import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Category from "./Category";
import { Container } from "react-bootstrap";
import GenreCreateForm from "../genres/GenreCreateForm";

function CategoryPage() {
  const { id } = useParams();
  const [category, setCategory] = useState({ results: [] });
  // const currentUser = useCurrentUser();
  const [genres, setGenres] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: category }, { data: genres }] = await Promise.all([
          axiosReq.get(`/categories/${id}`),
          axiosReq.get(`/categories/genres/?category=${id}`),
        ]);
        setCategory({ results: [category] });
        //   setGenres({ results: [genres] });
        console.log(category.results);
        setGenres(genres);
        console.log("GEN", genres);
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={6}>
        <h1>PAGINA</h1>
        <Category
          {...category.results[0]}
          setCategories={setCategory}
          categoryPage
        />
        {genres.results.length ? <p>Si</p> : <p>No</p>}
      </Col>
      <Col lg={6} className="d-lg-block p-0 p-lg-2">
        <Container>
          <GenreCreateForm id={id}/>
        </Container>
      </Col>
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
                setComments={setComments}
              />
            ) : comments.results.length ? (
              "Comments"
            ) : null}
            {comments.results.length ? (
              <InfiniteScroll 
              children={comments.results.map((comment) => (
                <Comment key={comment.id} {...comment}
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
