import React, { useState, useEffect } from 'react';
import { withAuthorization, withAuthUser } from './Session';
import {
  Flex,
  Heading,
  Box,
  Divider,
  SimpleGrid,
  Stack,
  Image,
  Text,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
} from '@chakra-ui/core';
import { compose } from 'recompose';
import { withFirebase } from './Firebase';
import { FaCheck, FaPlus } from 'react-icons/fa';

import common from '../images/commonapp.png';
import coalition from '../images/coalitionapplication.jpg';
import uc from '../images/ucapplication.jpg';

const HomeBase = props => {
  const [name, setName] = useState('');
  const [todosLoaded, setTodosLoaded] = useState(false);
  const [todos, setTodos] = useState(['To Do']);

  const addTodo = () => {
    setTodos(oldList => [...oldList, 'New To Do']);
  };

  const deleteTodo = task => {
    let filtered = todos.filter(function (todo) {
      return todo != task;
    });
    setTodos(filtered);
  };

  useEffect(() => {
    props.firebase.user(props.authUser.uid).on('value', snapshot => {
      setName(snapshot.val().firstName);
      if (snapshot.val().todos) setTodos(snapshot.val().todos);
    });
    setTodosLoaded(true);
  }, []);

  useEffect(() => {
    if (todosLoaded) {
      props.firebase.user(props.authUser.uid).update({
        todos: todos,
      });
    }
  }, [todos, setTodos]);

  return (
    <Box w="100%">
      <Flex justify="center">
        <Heading>Welcome Back {name}!</Heading>
      </Flex>
      <Divider mb="1em" />
      <SimpleGrid columns={2} spacing={10} w="100%">
        <Box w="100%">
          <Text fontSize="lg">To Do's: </Text>
          {todos.map(todo => (
            <Box mb="20px" bg="gray.300" p="5px" rounded="5px">
              <Flex align="center" justify="space-between">
                <Editable value={todo} w="100%" mx="10px">
                  <EditablePreview />
                  <EditableInput
                    onChange={e => {
                      let newTodos = todos.slice();
                      let index = todos.slice().indexOf(todo);
                      newTodos[index] = e.target.value;
                      setTodos(newTodos);
                    }}
                  />
                </Editable>
                <Button onClick={() => deleteTodo(todo)}>
                  <FaCheck />
                </Button>
              </Flex>
            </Box>
          ))}
          <Button onClick={addTodo} w="100%">
            <FaPlus />
          </Button>
        </Box>
        <Box w="100%">
          <Stack>
            <a href="https://www.commonapp.org/" target="_blank">
              <Box w="80%" mb={{ base: 12, md: 0 }}>
                <Image src={common} size="100%" rounded="1rem" shadow="2xl" />
              </Box>
            </a>
            <a
              href="https://www.coalitionforcollegeaccess.org/  "
              target="_blank"
            >
              <Box w="80%" mb={{ base: 12, md: 0 }}>
                <Image
                  src={coalition}
                  size="100%"
                  rounded="1rem"
                  shadow="2xl"
                />
              </Box>
            </a>
            <a
              href="https://apply.universityofcalifornia.edu/my-application/login"
              target="_blank"
            >
              <Box w="80%" mb={{ base: 12, md: 0 }}>
                <Image src={uc} size="100%" rounded="1rem" shadow="2xl" />
              </Box>
            </a>
          </Stack>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

const Home = compose(withAuthUser, withFirebase)(HomeBase);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Home);
