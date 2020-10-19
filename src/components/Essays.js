import React, { useState, useEffect } from 'react';
import { compose } from 'recompose';
import { withAuthorization, withAuthUser } from './Session';
import { withFirebase } from './Firebase';
import {
  Box,
  Input,
  Flex,
  Text,
  Button,
  Heading,
  Textarea,
} from '@chakra-ui/core';
import { FaPlus } from 'react-icons/fa';

const EssaysBase = props => {
  const [essays, setEssays] = useState([{ prompt: '', essay: '' }]);
  const [essaysLoaded, setEssaysLoaded] = useState(false);

  useEffect(() => {
    props.firebase.user(props.authUser.uid).on('value', snapshot => {
      const { essays } = snapshot.val();
      if (essays) {
        setEssays(essays);
      }
      setEssaysLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (essaysLoaded) {
      props.firebase.user(props.authUser.uid).update({
        essays: essays,
      });
    }
  }, [essays, setEssays]);

  const handleChange = (event, index, field) => {
    let newEssays = essays.slice();
    newEssays[index][field] = event.target.value;

    setEssays(newEssays);
  };

  const addEssay = () => {
    setEssays(prevState => [
      ...prevState,
      {
        prompt: '',
        essay: '',
      },
    ]);
  };

  return (
    <Box w="100%">
      <Heading mb="1em">Essays</Heading>
      {essays.map((essay, index) => (
        <Box
          border="1px"
          rounded="3px"
          padding="1em"
          borderColor="gray.300"
          mb="1em"
        >
          <Flex align="center" mb="20px">
            <Text mr="10px" fontSize="lg">
              Prompt:{' '}
            </Text>
            <Input
              value={essay.prompt}
              onChange={event => handleChange(event, index, 'prompt')}
            />
          </Flex>
          <Text fontSize="lg">Essay</Text>
          <Textarea
            maxLength="3055"
            value={essay.essay}
            onChange={event => handleChange(event, index, 'essay')}
          />
        </Box>
      ))}
      <Button onClick={addEssay} w="100%" mb="1em">
        <FaPlus />
      </Button>
    </Box>
  );
};

const Essays = compose(withAuthUser, withFirebase)(EssaysBase);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Essays);
