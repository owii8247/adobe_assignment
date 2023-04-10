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
} from "@chakra-ui/react";
import axios from "axios";

const UserForm = () => {
  const[id, setId] = useState("")
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (name.length < 1 || name.length > 50) {
      toast({
        title: "Invalid name",
        description: "Name must be between 1 and 50 characters",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsSubmitting(false);
      return;
    }
    if (bio.length < 1 || bio.length > 200) {
      toast({
        title: "Invalid bio",
        description: "Bio must be between 1 and 200 characters",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post("https://adobe-backend-sx70.onrender.com/users",
        {id, name, email, bio }
      );
      console.log("res",response)
      setId("")
      setName("");
      setEmail("");
      setBio("");
      toast({
        title: "User created",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error creating user",
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
        <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
            <FormLabel>Id</FormLabel>
            <Input
              type="number"
              value={id}
              onChange={(event) => setId(event.target.value)}
              required
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Bio</FormLabel>
            <Textarea
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              
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

export default UserForm;
