import styles from "./App.module.css";
import Container from "react-bootstrap/Container";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import EventCreateForm from "./pages/events/EventCreateForm";
import EventPage from "./pages/events/EventPage";
import EventsPage from "./pages/events/EventsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import EventEditForm from "./pages/events/EventEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import NotFound from "./components/NotFound";
import CategoriesPage from "./pages/categories/CategoriesPage";
import CategoryPage from "./pages/categories/CategoryPage";
import PhotoPage from "./pages/events/Photos/PhotoPage";
import PhotoEditForm from "./pages/events/Photos/PhotoEditForm";
import PhotosPage from "./pages/profiles/PhotosPage";

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
              <EventsPage 
              message="No results found. Adjust the search keyword."
              filter={`ordering=-date&`} />
            )}
          />
          <Route
            exact
            path="/feeds"
            render={() => (
              <EventsPage
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&ordering=-date&`}
              />
            )}
          />
          <Route
            exact
            path="/interested"
            render={() => (
              <EventsPage
                message="No results found. Adjust the search keyword or show interest for an event."
                filter={`interesteds__owner__profile=${profile_id}&ordering=-date&`}
              />
            )}
          />
          <Route
            exact
            path="/going"
            render={() => (
              <EventsPage
                message="No results found. Adjust the search keyword or show that you are going to an event."
                filter={`goings__owner__profile=${profile_id}&ordering=-date&`}
              />
            )}
          />
          <Route
            exact
            path="/favorites"
            render={() => (
              <EventsPage
                message="No results found. Adjust the search keyword or show that you are going to an event."
                filter={`event_genres__genre__preference__profile=${profile_id}&ordering=-date&`}
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
          <Route exact path="/events/:id" 
          render={() => <EventPage />} />
          <Route
            exact
            path="/events/galleries/photos/:id"
            render={() => <PhotoPage />}
          />
          <Route
            exact
            path="/events/galleries/photos/:id/edit"
            render={() => <PhotoEditForm />}
          />
          <Route
            exact
            path="/categories/"
            render={() => <CategoriesPage />}
          />
          <Route exact path="/categories/:id" render={() => <CategoryPage />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route exact path="/my_photos/:id" render={() => <PhotosPage />} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          <Route render={() => <p>< NotFound/></p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
