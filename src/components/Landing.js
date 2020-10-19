import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Image,
  Heading,
  Stack,
  Divider,
  ListItem,
  List,
} from '@chakra-ui/core';
import * as ROUTES from '../constants/routes';
import landingImg from '../images/landing_hero.jpg';
import unorganized from '../images/unorganized.jpg';
import organized from '../images/organized.jpg';

const Landing = () => {
  return (
    <Box w="100%">
      <Flex
        align="center"
        justify={{ base: 'center', md: 'space-around', xl: 'space-between' }}
        direction={{ base: 'column-reverse', md: 'row' }}
        wrap="no-wrap"
        minH="70vh"
        px={8}
        mb={16}
      >
        <Stack
          spacing={4}
          w={{ base: '80%', md: '40%' }}
          align={['center', 'center', 'flex-start', 'flex-start']}
        >
          <Heading
            as="h1"
            size="xl"
            fontWeight="bold"
            color="primary.800"
            textAlign={['center', 'center', 'left', 'left']}
          >
            Design Your College Application in One Place
          </Heading>
          <Heading
            as="h2"
            size="md"
            color="primary.800"
            opacity="0.8"
            fontWeight="normal"
            lineHeight={1.5}
            textAlign={['center', 'center', 'left', 'left']}
          >
            A Student Solution For Student Needs
          </Heading>
          <Link to={ROUTES.SIGN_UP}>
            <Button
              variantColor="primary"
              borderRadius="8px"
              py="4"
              px="4"
              lineHeight="1"
              size="md"
            >
              Sign Up Right Now
            </Button>
          </Link>
        </Stack>
        <Box w={{ base: '80%', sm: '60%', md: '50%' }} mb={{ base: 12, md: 0 }}>
          <Image src={landingImg} size="100%" rounded="1rem" shadow="2xl" />
        </Box>
      </Flex>

      <Divider mb="1em" />

      <Flex
        align="center"
        justify={{ base: 'center', md: 'space-around', xl: 'space-between' }}
        direction={{ base: 'column-reverse', md: 'row' }}
        wrap="no-wrap"
        px={8}
        mb={16}
      >
        <Box w={{ base: '80%', sm: '60%', md: '50%' }} mb={{ base: 12, md: 0 }}>
          <Image src={unorganized} size="100%" rounded="1rem" shadow="2xl" />
        </Box>
        <Stack
          spacing={4}
          w={{ base: '80%', md: '40%' }}
          align={['center', 'center', 'flex-start', 'flex-start']}
        >
          <Heading
            as="h1"
            size="xl"
            fontWeight="bold"
            color="primary.800"
            textAlign={['center', 'center', 'left', 'left']}
          >
            College Applications Can Get Quite Complicated
          </Heading>
          <Heading
            as="h2"
            size="md"
            color="primary.800"
            opacity="0.8"
            fontWeight="normal"
            lineHeight={1.5}
            textAlign={['center', 'center', 'left', 'left']}
          >
            <List styleType="disc">
              <ListItem>
                GPA, Standardized Tests, Extracurriculars, Honors
              </ListItem>
              <ListItem>Best way to describe activities? </ListItem>
              <ListItem>How should I write my essay?</ListItem>
              <ListItem>Researching schools</ListItem>
              <ListItem>Filling out Financial Aid</ListItem>
            </List>
          </Heading>
          <Heading
            as="h1"
            size="xl"
            fontWeight="bold"
            color="primary.800"
            textAlign={['center', 'center', 'left', 'left']}
          >
            There are a LOT of moving components.
          </Heading>
        </Stack>
      </Flex>

      <Divider mb="1em" />
      <Flex
        align="center"
        justify={{ base: 'center', md: 'space-around', xl: 'space-between' }}
        direction={{ base: 'column-reverse', md: 'row' }}
        wrap="no-wrap"
        minH="70vh"
        px={8}
        mb={16}
      >
        <Stack
          spacing={4}
          w={{ base: '80%', md: '40%' }}
          align={['center', 'center', 'flex-start', 'flex-start']}
        >
          <Heading
            as="h1"
            size="xl"
            fontWeight="bold"
            color="primary.800"
            textAlign={['center', 'center', 'left', 'left']}
          >
            Organize Your College Application Experience
          </Heading>
          <Heading
            as="h2"
            size="md"
            color="primary.800"
            opacity="0.8"
            fontWeight="normal"
            lineHeight={1.5}
            textAlign={['center', 'center', 'left', 'left']}
          >
            Collegiate is a web platform that walks you through all components
            of the application, and organizes your work so that you can focus on
            presenting your best self to your desired schools.
          </Heading>
        </Stack>
        <Box w={{ base: '80%', sm: '60%', md: '50%' }} mb={{ base: 12, md: 0 }}>
          <Image src={organized} size="100%" rounded="1rem" shadow="2xl" />
        </Box>
      </Flex>
    </Box>
  );
};

export default Landing;
