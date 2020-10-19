import React, { useState, useEffect } from 'react';
import { compose } from 'recompose';
import { withFirebase } from './Firebase';
import { withAuthUser } from './Session';
import { withAuthorization } from './Session';
import {
  Input,
  Box,
  Flex,
  Text,
  Heading,
  Button,
  SimpleGrid,
  Stack,
} from '@chakra-ui/core';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';

const CollegeListBase = props => {
  const [collegeResults, setCollegeResults] = useState(null);
  const [search, setSearch] = useState('');
  const [myCollegeList, setMyCollegeList] = useState([]);
  const [listLoaded, setListLoaded] = useState(false);

  const addToMyList = (name, id) => {
    setMyCollegeList(oldList => [...oldList, { name, id }]);
  };

  const removeFromMyList = id => {
    let filtered = myCollegeList.filter(function (school) {
      return school.id != id;
    });
    setMyCollegeList(filtered);
  };

  useEffect(() => {
    props.firebase.user(props.authUser.uid).on('value', snapshot => {
      setMyCollegeList(snapshot.val().collegeList);
      setListLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (listLoaded) {
      props.firebase.user(props.authUser.uid).update({
        collegeList: myCollegeList,
      });
    }
  }, [myCollegeList, setMyCollegeList]);

  const searchDB = async search => {
    console.log(search);
    let data = await fetch(
      `https://api.data.gov/ed/collegescorecard/v1/schools.json?school.name=${search}&api_key=byOrxD23laXUiwp7Mk9fLd3oSHIanWcsgAfD0bwv&fields=id,school.name`
    ).then(res => res.json());
    setCollegeResults(data.results);
    console.log(data);
  };

  return (
    <SimpleGrid columns={2} spacing={10} w="100%">
      <Box>
        <Heading mb="1em">My Colleges</Heading>
        <Stack>
          {myCollegeList.length > 0 ? (
            myCollegeList.map(school => (
              <Box bg="gray.300" p="5px" rounded="5px">
                <Flex align="center" justify="space-between">
                  <Text fontSize="xl" pl="5px">
                    {school.name}
                  </Text>
                  <Button onClick={() => removeFromMyList(school.id)}>
                    <FaMinusCircle />
                  </Button>
                </Flex>
              </Box>
            ))
          ) : (
            <h1>No colleges in your list</h1>
          )}
        </Stack>
      </Box>
      <Box>
        <Box bg="teal.300" rounded="10px" p="25px" mb="1em">
          <Heading>Search For Colleges</Heading>
          <Flex>
            <Input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              mr="5px"
            />
            <Button onClick={() => searchDB(search)}>Search</Button>
          </Flex>
        </Box>
        <Stack>
          {collegeResults ? (
            collegeResults.map(school => (
              <Box bg="gray.300" p="5px" rounded="5px">
                <Flex align="center" justify="space-between">
                  <Text fontSize="xl" pl="5px">
                    {school['school.name']}
                  </Text>
                  <Button
                    onClick={() =>
                      addToMyList(school['school.name'], school.id)
                    }
                  >
                    <FaPlusCircle />
                  </Button>
                </Flex>
              </Box>
            ))
          ) : (
            <h1>No Results</h1>
          )}
        </Stack>
      </Box>
    </SimpleGrid>
  );
};

const CollegeList = compose(withAuthUser, withFirebase)(CollegeListBase);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(CollegeList);
