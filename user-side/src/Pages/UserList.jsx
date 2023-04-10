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
    Input,
    Textarea,
} from "@chakra-ui/react";
import axios from "axios";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [nameInput, setNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [bioInput, setBioInput] = useState("");
console.log("selected", selectedUser)
    useEffect(() => {
        setIsLoading(true);
        axios
            .get("https://adobe-backend-sx70.onrender.com/getusers")
            .then((response) => setUsers(response.data))
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));
    }, []);

    const handleEditButtonClick = (user) => {
        setSelectedUser(user);
        setNameInput(user.name);
        setEmailInput(user.email);
        setBioInput(user.bio);
        setIsEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setSelectedUser({});
        setNameInput("");
        setEmailInput("");
        setBioInput("");
        setIsEditModalOpen(false);
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        axios
            .put(`https://adobe-backend-sx70.onrender.com/users/${selectedUser._id}`, {
                name: nameInput,
                email: emailInput,
                bio: bioInput,
            })
            .then((response) => {
                const updatedUserIndex = users.findIndex(
                    (user) => user._id === selectedUser._id
                );
                const updatedUsers = [...users];
                updatedUsers[updatedUserIndex] = response.data;
                setUsers(updatedUsers);
                handleEditModalClose();
            })
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));
    };

    const handleDeleteButtonClick = (user) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteModalClose = () => {
        setSelectedUser({});
        setIsDeleteModalOpen(false);
    };

    const handleDeleteFormSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        axios
            .delete(`https://adobe-backend-sx70.onrender.com/users/${selectedUser._id}`)
            .then(() => {
                const updatedUsers = users.filter(
                    (user) => user._id !== selectedUser._id
                );
                setUsers(updatedUsers);
                handleDeleteModalClose();
            })
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));
    };

    return (
        <Box overflowX="auto">
            {isLoading ? (
                <Spinner size="xl" />
            ) : (
                <Table variant="striped">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Bio</Th>
                            <Th>Edit</Th>
                            <Th>Delete</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {users.map((user) => (
                            <Tr key={user.id}>
                                <Td>{user.name}</Td>
                                <Td>{user.email}</Td>
                                <Td>{user.bio}</Td>
                                <Td>
                                    <Button onClick={() => handleEditButtonClick(user)}>
                                        Edit
                                    </Button>
                                </Td>
                                <Td>
                                    <Button onClick={() => handleDeleteButtonClick(user)}>
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
                                <FormLabel>Name</FormLabel>
                                <Input
                                    value={nameInput}
                                    onChange={(event) => setNameInput(event.target.value)}
                                />
                            </FormControl>
                            <FormControl mb={3}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    value={emailInput}
                                    onChange={(event) => setEmailInput(event.target.value)}
                                />
                            </FormControl>
                            <FormControl mb={3}>
                                <FormLabel>Bio</FormLabel>
                                <Textarea
                                    value={bioInput}
                                    onChange={(event) => setBioInput(event.target.value)}
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
                    <ModalHeader>Delete User</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleDeleteFormSubmit}>
                            <p>Are you sure you want to delete this user?</p>
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


export default UserList;
