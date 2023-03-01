import styles from "./App.module.css";
import Container from "react-bootstrap/Container";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import EventCreateForm from "./pages/events/EventCreateForm";
import CategoryCreateForm from "./pages/categories/CategoryCreateForm";
import EventPage from "./pages/events/EventPage";
import EventsPage from "./pages/events/EventsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import EventEditForm from "./pages/events/EventEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <EventsPage message="No results found. Adjust the search keyword." />
            )}
          />
          <Route
            exact
            path="/feeds"
            render={() => (
              <EventsPage
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/interested"
            render={() => (
              <EventsPage
                message="No results found. Adjust the search keyword or show interest for an event."
                filter={`ineresteds__owner__profile=${profile_id}&ordering=-interesteds__created_at&`}
              />
            )}
          />
          <Route
            exact
            path="/going"
            render={() => (
              <EventsPage
                message="No results found. Adjust the search keyword or show that you are going to an event."
                filter={`goings__owner__profile=${profile_id}&ordering=-goings__created_at&`}
              />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route
            exact
            path="/events/create"
            render={() => <EventCreateForm />}
          />
          <Route
            exact
            path="/events/:id/edit"
            render={() => <EventEditForm />}
          />
          <Route exact path="/events/:id" render={() => <EventPage />} />
          <Route
            exact
            path="/categories/create"
            render={() => <CategoryCreateForm />}
          />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route render={() => <p>Page Not Found</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
