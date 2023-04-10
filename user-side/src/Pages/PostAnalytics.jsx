import { Box, Heading, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

const PostAnalytics = () => {
  const [totalPosts, setTotalPosts] = useState(0);
  const [mostLikedPosts, setMostLikedPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [totalPostResponse, topLikedResponse] = await Promise.all([
          axios.get("https://adobe-backend-sx70.onrender.com/analytics/posts"),
          axios.get(
            "https://adobe-backend-sx70.onrender.com/analytics/posts/top-liked"
          ),
        ]);

        setTotalPosts(totalPostResponse.data.count);
        setMostLikedPosts(topLikedResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Post Analytics
      </Heading>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Total Posts</Th>
            <Th>Most Liked Posts</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{totalPosts}</Td>
            <Td>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Username</Th>
                    <Th>Number of Likes</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {mostLikedPosts.map((post) => (
                    <Tr key={post._id}>
                      <Td>{post._id}</Td>
                      <Td>{post.likes}</Td>
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

export default PostAnalytics;
