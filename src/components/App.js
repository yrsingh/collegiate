import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Flex } from '@chakra-ui/core';

import Navigation from './Navigation';
import LandingPage from './Landing';
import SignInPage from './SignIn';
import SignUpPage from './SignUp';
import HomePage from './Home';
import ActivitiesPage from './Activities';
import CollegeListPage from './CollegeList';
import EssayPage from './Essays';

import * as ROUTES from '../constants/routes';
import { withAuthentication } from './Session';

const App = props => {
  return (
    <Router>
      <Navigation />
      <Flex
        flexDirection="column"
        alignItems="center"
        style={{ margin: '2em' }}
      >
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.COLLEGELIST} component={CollegeListPage} />
        <Route path={ROUTES.ACTIVITIES} component={ActivitiesPage} />
        <Route path={ROUTES.ESSAYS} component={EssayPage} />
      </Flex>
    </Router>
  );
};

export default withAuthentication(App);
