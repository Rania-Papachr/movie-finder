import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  AppBar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;
const navItems = [
  { label: "Home", path: "/" },
  { label: "Add Movie", path: "/add-movie" },
  { label: "Favorites", path: "/favorites" },
];

const categories = ["drama", "comedy", "horror"];

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        variant="h6"
        sx={{
          my: 2,
          color: "primary.main",
          fontWeight: 700,
        }}
      >
        Movie Finder
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.path}
              sx={{
                textAlign: "center",
                "&.active": {
                  color: "primary.main",
                  fontWeight: 600,
                },
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        {categories.map((category) => (
          <ListItem key={category} disablePadding>
            <ListItemButton
              component={NavLink}
              to={`/categories/${category}`}
              sx={{
                textAlign: "center",
                "&.active": {
                  color: "primary.main",
                  fontWeight: 600,
                },
              }}
            >
              <ListItemText
                primary={category}
                sx={{ textTransform: "capitalize" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" sx={{ bgColor: "background.paper" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              color: "primary.main",
              fontWeight: 700,
            }}
          >
            Movie Finder
          </Typography>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              gap: 1,
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={NavLink}
                to={item.path}
                sx={{
                  color: "text.primary",
                  "&.active": {
                    color: "primary.main",
                    fontWeight: 600,
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
            <Button onClick={handleMenuOpen} sx={{ color: "text.primary" }}>
              Categories
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {categories.map((category) => (
                <MenuItem
                  key={category}
                  component={NavLink}
                  to={`/categories/${category}`}
                  onClick={handleMenuClose}
                  sx={{ textTransform: "capitalize" }}
                >
                  {category}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

export default NavBar;
