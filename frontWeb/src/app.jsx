import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Loader from "./components/loader";
import { useSelector } from "react-redux";
const Login = lazy(() => import("./routes/auth/login"));
const ToutLesCours = lazy(() => import("./routes/ToutLesCours"));
const Signup = lazy(() => import("./routes/auth/signup"));
const Dashboard = lazy(() => import("./routes/dashboard"));
const MesCours = lazy(() => import("./routes/MesCours"));
const Homepage = lazy(() => import("./routes/landingpage"));
const Profile = lazy(() => import("./routes/profile"));
const Faq = lazy(() => import("./routes/faqs"));
const AddCours = lazy(() => import("./routes/addCours/addCours"));
const CoursDetails = lazy(() => import("./routes/CoursDetails"));
const Messages = lazy(() => import("./routes/Messages"));

const Loading = () => <Loader color="primary" />;

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  let routes = (
    <Switch>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/signup" component={Signup}></Route>
      <Route exact path="/" component={Homepage}></Route>
      <Redirect to="/" />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route exact path="/cours/:id" component={MesCours}></Route>
        <Route exact path="/allCours" component={ToutLesCours}></Route>
        <Route exact path="/message" component={Messages}></Route>
        <Route exact path="/coursDetails/:id" component={CoursDetails}></Route>
        <Route exact path="/dash" component={Dashboard}></Route>
        <Route exact path="/profile" component={Profile}></Route>
        <Route exact path="/faqs" component={Faq}></Route>
        <Route exact path="/addCours" component={AddCours}></Route>
        <Redirect to="/dash" />
      </Switch>
    );
  }

  return (
    <div>
      <Suspense fallback={<Loading />}>{routes}</Suspense>
    </div>
  );
}

export default withRouter(App);
