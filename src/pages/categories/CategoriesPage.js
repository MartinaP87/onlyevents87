import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import CategoryCreateForm from "./CategoryCreateForm";
import { axiosReq } from "../../api/axiosDefaults";
import Category from "./Category";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";

const CategoriesPage = () => {
  useRedirect("loggedOut")
  const currentUser = useCurrentUser();
  const admin = currentUser?.pk === 1;
 
  const [categories, setCategories] = useState({
    results: [],
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosReq.get("/categories/");
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2 justify-center" lg={6}>
        <h1>Categories:</h1>
        {categories?.results.map((category) => (
          <div key={category.id}>
            <Category {...category} setCategories={setCategories} />
          </div>
        ))}
      </Col>
      <Col lg={6} className="d-lg-block p-0 p-lg-2">
        {admin &&
          <Container>
            <CategoryCreateForm setCategories={setCategories} />
          </Container>
        }
      </Col>
    </Row>
  );
};

export default CategoriesPage;
