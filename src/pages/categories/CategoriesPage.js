import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import CategoryCreateForm from "./CategoryCreateForm";
import { axiosReq } from "../../api/axiosDefaults";
import Category from "./Category";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import Asset from "../../components/Asset";

const CategoriesPage = () => {
  // It redirects the logged out user to the home page.
  useRedirect("loggedOut");
  const currentUser = useCurrentUser();
  const admin = currentUser?.pk === 1;

  const [categories, setCategories] = useState({
    results: [],
  });

  useEffect(() => {
    const fetchCategories = async () => {
      // It requests the categories to the API endpoint
      // and stores them in a variable.
      try {
        const { data } = await axiosReq.get("/categories/");
        setCategories(data);
      } catch (err) {
        //console.log(err);
      }
    };
    // Make the request only if the user is logged in.
    currentUser && fetchCategories();
  }, [currentUser]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-lg-2" lg={6}>
        <h1>Categories:</h1>
        {categories.results.length ? (
        <InfiniteScroll
          children={categories?.results.map((category) => (
            <div key={category.id}>
              <Category {...category} setCategories={setCategories} />
            </div>
          ))}
          dataLength={categories.results.length}
          loader={<Asset spinner />}
          hasMore={!!categories.next}
          next={() => fetchMoreData(categories, setCategories)}
        />
        ) : (
          <p>No categories yet</p>
        )}
      </Col>
      <Col lg={6} className="d-lg-block p-0 p-lg-2">
        {admin && (
          <Container>
            <CategoryCreateForm setCategories={setCategories} />
          </Container>
        )}
      </Col>
    </Row>
  );
};

export default CategoriesPage;
