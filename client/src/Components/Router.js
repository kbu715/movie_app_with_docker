import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Home from "Routes/Home";
import Search from "Routes/Search";
import Header from "Components/Header";
import Detail from "Routes/Detail";
import Login from "../Routes/Login";
import SignUp from "../Routes/SignUp";
import Logout from "../Routes/Logout";
import Auth from "../hoc/auth";
import Favorite from "../Routes/Favorite";
import Admin from "../Routes/Admin";
import MyScore from "../Routes/MyScore";
import MyPage from "../Routes/MyPage";
import UpdateProfile from "../Routes/UpdateProfile";

//hoc 불러오기
export default () => (
  <Router>
    <>
      {" "}
      <Header />
      <Switch>
        <Route path="/" exact component={Auth(Home, true)} />
        <Route path="/search" component={Auth(Search, null)} />
        <Route path="/movie/:id" component={Auth(Detail, true)} />
        <Route path="/sign-in" component={Auth(Login, false)} />
        <Route path="/sign-up" component={Auth(SignUp, false)} />
        <Route path="/logout" component={Auth(Logout, true)} />
        <Route path="/favorite" component={Auth(Favorite, true)} />
        <Route path="/admin" component={Auth(Admin, true, true)} />

        <Route path="/myscore" component={Auth(MyScore, true)} />
        <Route path="/mypage" exact component={Auth(MyPage, true)} />
        <Route
          path="/mypage/update"
          exact
          component={Auth(UpdateProfile, true)}
        />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
);

// <Redirect from="*" to="/"/> : 위의 페이지 외에 어느페이지든 "/"로 가게해라 Router는 오직 one child
// element만 가질 수 있기 때문에 <>로 감싼다. Switch는 한 번에 오직 하나의 Route만 Render하게 해줘
// /movie/12 /show/12 exact : 정확히 해당 path여야 한다는 걸 알려준다.
