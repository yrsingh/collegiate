import React from 'react';
import {
  Box,
  Heading,
  Flex,
  Button,
  Link as ChakraLink,
} from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import SignOut from './SignOut';
import { AuthUserContext } from './Session';

const MenuItems = ({ children, to }) => (
  <Link to={to}>
    <ChakraLink mt={{ base: 4, md: 0 }} mr={6} display="block">
      {children}
    </ChakraLink>
  </Link>
);

const Header = () => (
  <>
    <AuthUserContext.Consumer>
      {authUser => (authUser ? <AuthHeader /> : <NonAuthHeader />)}
    </AuthUserContext.Consumer>
  </>
);

const NonAuthHeader = () => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
    >
      <Flex align="center" mr={5}>
        <Link to={ROUTES.LANDING}>
          <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
            Collegiate
          </Heading>
        </Link>
      </Flex>

      <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? 'block' : 'none', md: 'block' }}
        mt={{ base: 4, md: 0 }}
      >
        <ColorModeSwitcher style={{ marginRight: '1em' }} />
        <Link to={ROUTES.SIGN_IN} style={{ marginRight: '1em' }}>
          <Button>Sign In</Button>
        </Link>
        <Link to={ROUTES.SIGN_UP}>
          <Button>Sign Up</Button>
        </Link>
      </Box>
    </Flex>
  );
};

const AuthHeader = () => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
    >
      <Flex align="center" mr={5}>
        <Link to="/">
          <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
            Collegiate
          </Heading>
        </Link>
      </Flex>

      <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? 'block' : 'none', md: 'flex' }}
        width={{ sm: 'full', md: 'auto' }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems to={ROUTES.HOME}>Home</MenuItems>
        <MenuItems to={ROUTES.COLLEGELIST}>College List</MenuItems>
        <MenuItems to={ROUTES.ACTIVITIES}>Activities and Honors</MenuItems>
        <MenuItems to={ROUTES.ESSAYS}>Essays</MenuItems>
      </Box>

      <Box
        display={{ sm: show ? 'block' : 'none', md: 'block' }}
        mt={{ base: 4, md: 0 }}
      >
        <ColorModeSwitcher style={{ marginRight: '1em' }} />
        <SignOut />
      </Box>
    </Flex>
  );
};

export default Header;
