import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import CategoryCreateForm from "./CategoryCreateForm";
import { axiosReq } from "../../api/axiosDefaults";
import Category from "./Category";

const CategoriesPage = () => {
  const [categories, setCategories] = useState({
    results: [],
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosReq.get("/categories/");
        console.log(data);
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2 justify-center" lg={4}>
        {categories?.results.map((category) => (
          <div key={category.id}>
            <Category {...category} setCategories={setCategories} />
          </div>
        ))}
      </Col>
      <Col lg={6} className="d-lg-block p-0 p-lg-2">
        <Container>
          <CategoryCreateForm setCategories={setCategories} />
        </Container>
      </Col>
    </Row>
  );
};

export default CategoriesPage;
