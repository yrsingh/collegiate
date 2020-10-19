import React, { useState, useEffect } from 'react';
import { compose } from 'recompose';
import { withFirebase } from './Firebase';
import { withAuthorization, withAuthUser } from './Session';
import {
  Textarea,
  Box,
  Input,
  Text,
  Flex,
  Heading,
  Button,
  Divider,
} from '@chakra-ui/core';
import { FaPlus } from 'react-icons/fa';

const ActivitiesBase = props => {
  const [contentLoaded, setContentLoaded] = useState(false);
  const [honors, setHonors] = useState(['']);
  const [activities, setActivities] = useState([
    {
      name: '',
      description: '',
    },
  ]);

  useEffect(() => {
    props.firebase.user(props.authUser.uid).on('value', snapshot => {
      const { honors, activities } = snapshot.val();
      if (honors) {
        setHonors(honors);
      }
      if (activities) {
        setActivities(activities);
      }

      setContentLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (contentLoaded) {
      props.firebase.user(props.authUser.uid).update({
        honors: honors,
      });
    }
  }, [honors, setHonors]);

  useEffect(() => {
    if (contentLoaded) {
      props.firebase.user(props.authUser.uid).update({
        activities: activities,
      });
    }
  }, [activities, setActivities]);

  const addHonor = () => {
    setHonors(prevState => [...prevState, '']);
  };

  const addActivity = () => {
    setActivities(prevState => [
      ...prevState,
      {
        name: '',
        description: '',
      },
    ]);
  };

  const handleActivityChange = (event, index, field) => {
    let newActivities = activities.slice();
    newActivities[index][field] = event.target.value;

    setActivities(newActivities);
  };

  const handleHonorChange = (event, index) => {
    let newHonors = honors.slice();
    newHonors[index] = event.target.value;

    setHonors(newHonors);
  };

  return (
    <Box w="100%">
      <Box mb="2em">
        <Heading mb="1em">Honors and Awards</Heading>
        {honors.map((honor, index) => (
          <Flex mb="10px" align="center" justify="space-between">
            <Text fontSize="lg" mr="1em" w="15%">
              Honor/Award:
            </Text>
            <Input
              name={index}
              w="100%"
              value={honor}
              onChange={event => handleHonorChange(event, index)}
            />
          </Flex>
        ))}
      </Box>
      <Button onClick={addHonor} w="100%" mb="1em">
        <FaPlus />
      </Button>
      <Divider />
      <Heading my="1em">Activities</Heading>
      {activities.map((activity, index) => (
        <Box
          mb="1em"
          border="1px"
          borderColor="teal.300"
          rounded="10px"
          p="1em"
          rounded="5px"
        >
          <Flex mb="20px" align="center" justify="space-between">
            <Text fontSize="lg" mr="1em" w="15%">
              Activity Name:
            </Text>
            <Input
              w="100%"
              maxLength="50"
              value={activity.name}
              onChange={event => handleActivityChange(event, index, 'name')}
            />
          </Flex>
          <Text fontSize="lg">Activity Description:</Text>
          <Textarea
            maxLength="150"
            value={activity.description}
            onChange={event =>
              handleActivityChange(event, index, 'description')
            }
          />
        </Box>
      ))}
      <Button onClick={addActivity} w="100%" mb="1em">
        <FaPlus />
      </Button>
    </Box>
  );
};

const Activities = compose(withAuthUser, withFirebase)(ActivitiesBase);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Activities);
