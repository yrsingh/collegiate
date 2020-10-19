import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Heading,
  Box,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/core';
import { withFirebase } from './Firebase';
import * as ROUTES from '../constants/routes';

const SignInPage = () => (
  <Box w="50%">
    <Heading mb="1em">Sign In</Heading>
    <SignInForm />
    <Text mt="1em">
      Don't have an account?{' '}
      <Link to={ROUTES.SIGN_UP}>
        <ChakraLink color="teal.500">Sign Up</ChakraLink>
      </Link>
    </Text>
  </Box>
);

const SignInFormBase = props => {
  const [error, setError] = useState({});
  const { handleSubmit, errors, register, formState } = useForm();
  const onSubmit = values => {
    console.log(values);
    const { email, password } = values;
    console.log(props.firebase.createUserWithEmailAndPassword);
    props.firebase
      .signInWithEmailAndPassword(email, password)
      .then(authUser => {
        props.history.push(ROUTES.HOME);
      })
      .catch(err => {
        console.log(err);
        setError({ ...err });
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.email} mb="20px">
        <FormLabel htmlFor="email">Email Address</FormLabel>
        <Input name="email" placeholder="Email Address" ref={register()} />
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.passwordOne}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          name="password"
          type="password"
          placeholder="Password"
          ref={register()}
        />
        <FormErrorMessage>
          {errors.passwordOne && errors.passwordOne.message}
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

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;
