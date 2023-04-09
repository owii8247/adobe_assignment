import { useState } from "react";
import {
  Box,
  Flex,
  Spacer,
  IconButton,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const NavButton = ({ label, to, ...rest }) => (
  <Button as={Link} to={to} variant="ghost" {...rest}>
    {label}
  </Button>
);

const Navbar = () => {
  const [showDrawer, setShowDrawer] = useState(false);


  const menuButtonSize = useBreakpointValue({ base: "lg", md: "md" });

  const handleToggleDrawer = () => setShowDrawer(!showDrawer);

  return (
    <Flex align="center" py={4} px={6}>
      <Box>
        <IconButton
          aria-label="Open menu"
          icon={<HamburgerIcon />}
          size={menuButtonSize}
          onClick={handleToggleDrawer}
        />
      </Box>
      <Spacer />
      <Box display={{ base: "none", md: "block" }}>
        <NavButton label="User Form" to="/user-form" />
        <NavButton label="Post Form" to="/post-form" />
        <NavButton label="User List" to="/user-list" />
        <NavButton label="Post List" to="/post-list" />
        <NavButton label="User Analytics" to="/user-analytics" />
        <NavButton label="Post Analytics" to="/post-analytics" />
      </Box>
      <Drawer isOpen={showDrawer} onClose={handleToggleDrawer} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <Flex justify="space-between" align="center">
              <Box>Menu</Box>
              <IconButton
                aria-label="Close menu"
                icon={<CloseIcon />}
                onClick={handleToggleDrawer}
              />
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <Box py={2}>
              <NavButton
                label="User Form"
                to="/user-form"
                onClick={handleToggleDrawer}
              />
            </Box>
            <Box py={2}>
              <NavButton
                label="Post Form"
                to="/post-form"
                onClick={handleToggleDrawer}
              />
            </Box>
            <Box py={2}>
              <NavButton
                label="User List"
                to="/user-list"
                onClick={handleToggleDrawer}
              />
            </Box>
            <Box py={2}>
              <NavButton
                label="Post List"
                to="/post-list"
                onClick={handleToggleDrawer}
              />
            </Box>
            <Box py={2}>
              <NavButton
                label="User Analytics"
                to="/user-analytics"
                onClick={handleToggleDrawer}
              />
            </Box>
            <Box py={2}>
              <NavButton
                label="Post Analytics"
                to="/post-analytics"
                onClick={handleToggleDrawer}
              />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Navbar;
