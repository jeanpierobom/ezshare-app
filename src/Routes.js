import React from "react";
import { Route, Switch } from "react-router-dom";

import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

import Home from "./containers/Home";
import All from "./containers/All";
import YouTubeVideos from "./containers/YouTubeVideos";
import ExclusiveVideos from "./containers/ExclusiveVideos";
import CommunityPosts from "./containers/CommunityPosts";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";
import Signup from "./containers/Signup";
import NewPost from "./containers/NewPost";
import Posts from "./containers/Posts";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/all" exact component={All} props={childProps} />
    <AppliedRoute path="/youtube-videos" exact component={YouTubeVideos} props={childProps} />
    <AppliedRoute path="/exclusive-videos" exact component={ExclusiveVideos} props={childProps} />
    <AppliedRoute path="/community-posts" exact component={CommunityPosts} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <AuthenticatedRoute path="/posts/new" exact component={NewPost} props={childProps} />
    <AuthenticatedRoute path="/posts/:id" exact component={Posts} props={childProps} />

    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;