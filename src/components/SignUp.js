import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Text,
  Link as ChakraLink,
  Box,
  Heading,
} from '@chakra-ui/core';

import { withFirebase } from './Firebase';
import * as ROUTES from '../constants/routes';

const SignUpPage = () => (
  <Box w="50%">
    <Heading mb="1em">Sign Up</Heading>
    <SignUpForm />
    <Text mt="1em">
      Already have an account?{' '}
      <Link to={ROUTES.SIGN_IN}>
        <ChakraLink color="teal.500">Sign In</ChakraLink>
      </Link>
    </Text>
  </Box>
);

const SignUpFormBase = props => {
  const [error, setError] = useState({});
  const { handleSubmit, errors, register, formState } = useForm();

  const onSubmit = values => {
    const { email, firstName, lastName, passwordOne } = values;
    props.firebase
      .createUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        return props.firebase.user(authUser.user.uid).set({
          firstName,
          lastName,
          email,
        });
      })
      .then(() => {
        console.log('LKSJDFLKJ');
        props.history.push(ROUTES.HOME);
      })
      .catch(err => {
        setError({ ...err });
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.firstName} mb="20px">
        <FormLabel htmlFor="firstName">First name</FormLabel>
        <Input name="firstName" placeholder="First Name" ref={register()} />
        <FormErrorMessage>
          {errors.firstName && errors.firstName.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.lastName} mb="20px">
        <FormLabel htmlFor="lastName">Last name</FormLabel>
        <Input name="lastName" placeholder="Last Name" ref={register()} />
        <FormErrorMessage>
          {errors.lastName && errors.lastName.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.email} mb="20px">
        <FormLabel htmlFor="email">Email Address</FormLabel>
        <Input name="email" placeholder="Email Address" ref={register()} />
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.passwordOne} mb="20px">
        <FormLabel htmlFor="passwordOne">Password</FormLabel>
        <Input
          name="passwordOne"
          type="password"
          placeholder="Password"
          ref={register()}
        />
        <FormErrorMessage>
          {errors.passwordOne && errors.passwordOne.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.passwordTwo} mb="20px">
        <FormLabel htmlFor="passwordTwo">Confirm Password</FormLabel>
        <Input
          name="passwordTwo"
          placeholder="Confirm Password"
          type="password"
          ref={register()}
        />
        <FormErrorMessage>
          {errors.passwordTwo && errors.passwordTwo.message}
        </FormErrorMessage>
      </FormControl>
      <Button
        mt={4}
        variantColor="teal"
        isLoading={formState.isSubmitting}
        type="submit"
      >
        Submit
      </Button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpPage;
export { SignUpForm };
