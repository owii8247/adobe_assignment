import { useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";

const PostForm = () => {
  const[id, setId] = useState("")
  const [user_id, setUserId] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (content.length < 1 || content.length > 300) {
      toast({
        title: "Invalid content",
        description: "Content must be between 1 and 50 characters",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsSubmitting(false);
      return;
    }
  
    try {
      const response = await axios.post("https://adobe-backend-sx70.onrender.com/posts",
        {id, user_id, content }
      );
      console.log("res",response)
      setId("")
      setUserId("");
      setContent("");
      toast({
        title: "Post created",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error creating post",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Flex justify="center" py={10}>
      <Box w={{ base: "100%", md: "50%" }}>
      <Heading as="h1" size="xl" mb={4}>
        Post Form
      </Heading>
        <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
            <FormLabel>Id</FormLabel>
            <Input
              type="number"
              value={id}
              onChange={(event) => setId(event.target.value)}
              
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>User Id</FormLabel>
            <Input
              type="text"
              value={user_id}
              onChange={(event) => setUserId(event.target.value)}
              required
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Content</FormLabel>
            <Textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              
            />
          </FormControl>
          <Button
            type="submit"
            isLoading={isSubmitting}
            loadingText="Submitting"
            colorScheme="blue"
            mt={4}
          >
            Submit
          </Button>
          
        </form>
      </Box>
    </Flex>
  );
};

export default PostForm;
