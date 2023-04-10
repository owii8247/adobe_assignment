import React, { useEffect, useState } from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Box,
    Spinner,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Textarea,
    Heading,
} from "@chakra-ui/react";
import axios from "axios";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState({});
    const [contentInput, setContentInput] = useState("");
console.log("posts", posts)
    useEffect(() => {
        setIsLoading(true);
        axios
            .get("https://adobe-backend-sx70.onrender.com/getposts")
            .then((response) => setPosts(response.data))
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));
    }, []);

    const handleEditButtonClick = (post) => {
        setSelectedPost(post);
        
        setContentInput(post.content);
        setIsEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setSelectedPost({});
        setContentInput("");
        setIsEditModalOpen(false);
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        axios
            .put(`https://adobe-backend-sx70.onrender.com/posts/${selectedPost._id}`, {
               
                content: contentInput,
            })
            .then((response) => {
                const updatedPostIndex = posts.findIndex(
                    (post) => post._id === selectedPost._id
                );
                const updatedPost = [...posts];
                updatedPost[updatedPostIndex] = response.data;
                setPosts(updatedPost);
                handleEditModalClose();
            })
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));
    };

    const handleDeleteButtonClick = (post) => {
        setSelectedPost(post);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteModalClose = () => {
        setSelectedPost({});
        setIsDeleteModalOpen(false);
    };

    const handleDeleteFormSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        axios
            .delete(`https://adobe-backend-sx70.onrender.com/posts/${selectedPost._id}`)
            .then(() => {
                const updatedPost = posts.filter(
                    (post) => post._id !== selectedPost._id
                );
                setPosts(updatedPost);
                handleDeleteModalClose();
            })
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));
    };

    return (
        <Box overflowX="auto">
          <Heading as="h1" size="xl" mb={4}>
        Post List
      </Heading>
            {isLoading ? (
                <Spinner size="xl" />
            ) : (
                <Table variant="striped">
                    <Thead>
                        <Tr>
                            <Th>Id</Th>
                            <Th>User Id</Th>
                            <Th>Content</Th>
                            <Th>Edit</Th>
                            <Th>Delete</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {posts.map((post) => (
                            <Tr key={post.id}>
                                <Td>{post._id}</Td>
                                <Td>{post.user_id}</Td>
                                <Td>{post.content}</Td>
                                <Td>
                                    <Button onClick={() => handleEditButtonClick(post)}>
                                        Edit
                                    </Button>
                                </Td>
                                <Td>
                                    <Button onClick={() => handleDeleteButtonClick(post)}>
                                        Delete
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            )}

            <Modal isOpen={isEditModalOpen} onClose={handleEditModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit User</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleEditFormSubmit}>
                            
                            <FormControl mb={3}>
                                <FormLabel>Bio</FormLabel>
                                <Textarea
                                    value={contentInput}
                                    onChange={(event) => setContentInput(event.target.value)}
                                />
                            </FormControl>
                            <Button type="submit" mr={3}>
                                Update
                            </Button>
                            <Button onClick={handleEditModalClose}>Cancel</Button>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Modal isOpen={isDeleteModalOpen} onClose={handleDeleteModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleDeleteFormSubmit}>
                            <p>Are you sure you want to delete this post?</p>
                            <Button type="submit" colorScheme="red" mr={3}>
                                Delete
                            </Button>
                            <Button onClick={handleDeleteModalClose}>Cancel</Button>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    )
}


export default PostList;
