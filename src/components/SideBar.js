import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser} from "../contexts/CurrentUserContext";
import { axiosReq } from "../api/axiosDefaults";
import Asset from "./Asset";


const SideBar = () => {
  const currentUser = useCurrentUser();
  const [categories, setCategories] = useState({results: []})

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

      <NavLink
        to="/feeds"
        className={styles.NavLink}
        activeClassName={styles.Active}>
        <i className="fas fa-stream"></i>
        Feeds
      </NavLink>

  return (
    
      <Container>
        {categories.results.length && (
            <InfiniteScroll
              children={categories.results.map((category) => (
                <Link 
                to={`/category/${category.id}/`}
                key={category.id}
                >{category.cat_name}</Link>
              ))}
              dataLength={categories.results.length}
              loader={<Asset spinner />}
              hasMore={!!categories.next}
              next={() => fetchMoreData(categories, setCategories)}
            />
          )}
      </Container>
  );
};

export default SideBar;
