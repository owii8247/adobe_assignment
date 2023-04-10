import { Box, Heading, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

const UserAnalytics = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [mostActiveUsers, setMostActiveUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [totalCountResponse, topActiveResponse] = await Promise.all([
          axios.get("https://adobe-backend-sx70.onrender.com/analytics/users"),
          axios.get(
            "https://adobe-backend-sx70.onrender.com/analytics/users/top-active"
          ),
        ]);

        setTotalUsers(totalCountResponse.data.count);
        setMostActiveUsers(topActiveResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
        User Analytics
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Total Users</Th>
            <Th>Most Active Users</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{totalUsers}</Td>
            <Td>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Username</Th>
                    <Th>Number of Posts</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {mostActiveUsers.map((user) => (
                    <Tr key={user._id}>
                      <Td>{user._id}</Td>
                      <Td>{user.count}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default UserAnalytics;
