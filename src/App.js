import styles from "./App.module.css";
import Container from "react-bootstrap/Container";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import EventCreateForm from "./pages/events/EventCreateForm";
import CategoryCreateForm from "./pages/categories/CategoryCreateForm";

function App() {
  return (
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route exact path="/" render={() => <h1>Home</h1>} />
              <Route exact path="/signin" render={() => <SignInForm />} />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route exact path="/event/create" render={() => <EventCreateForm />} />
              <Route exact path="/category/create" render={() => <CategoryCreateForm />} />
              <Route render={() => <p>Page Not Found</p>} />
            </Switch>
          </Container>
        </div>
  );
}

export default App;
