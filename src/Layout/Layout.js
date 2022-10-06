import React, { Component } from 'react';
import './Layout.scss';
import { Box, List, Divider, ListItem, ListItemIcon, ListItemText, Hidden, Drawer, Typography, AppBar, Toolbar, IconButton } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import Help from '@material-ui/icons/Help';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { ProjectsRoute, HomeRoute } from '../Routing';
import { Link } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Auth, Hub } from 'aws-amplify';

   
const drawerWidth = 250;
const theme = createTheme({
palette: {
        primary: {
            main: '#fefefe',
        },
        secondary: {
            main: '#3e4f6a',
        },
    },
});

const styles = theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: "rgba(23, 37, 42, 1)",
        color: "#fefefe",
        border: "none",
    },
    content: {
        flexGrow: 1,
        minHeight: "100vh",
    },
    icon: {
        color: "#fefefe",
    },
    toolbar: theme.mixins.toolbar,
});
class Layout extends Component {
    async onSignOutClick() {
        await Auth.signOut()
            .then(data => console.log(data))
            .catch(err => console.log(err));
       }
       getCurrentUsername() {
        return new Promise((resolve, reject) => {
         Auth.currentAuthenticatedUser()
          .then(user => {
           if (user.username) {
            console.log(user.username)
            resolve(user.username)
           } else {
            console.log(user)
            resolve(null)
           }
          })
          .catch(err => {
           console.log(err)
           resolve(null)
          });
        })
       }
       constructor() {
        super();
        this.updateLoggedStatus = this.updateLoggedStatus.bind(this)
       }
       async updateLoggedStatus() {
        const username = await this.getCurrentUsername()
        let newLoggedStatus = false;
        if (username) newLoggedStatus = true;
        this.setState({ isLogged: newLoggedStatus });
       }
       componentDidMount() {
        this.updateLoggedStatus();
        Hub.listen('auth', this.updateLoggedStatus);
       }
       componentWillUnmount() {
        Hub.remove('auth');
       }
       
       
    state = {
        mobileOpen: false,
        isLogged: false,
    };
handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };
    render() {
        const { classes } = this.props;
        const { mobileOpen, isLogged } = this.state;
const drawer = (
            <div id="drawer-container">
                <div className="logo-drawer" />
                <List>
                    <ListItem><ListItemText primary="Welcome to Meru"/></ListItem>
                    <Divider/>
                <ListItem button component={Link} to={HomeRoute}
  onClick={mobileOpen ? this.handleDrawerToggle : null}>
        <ListItemIcon>
            <Help className={classes.icon} />
        </ListItemIcon>
        <ListItemText primary="Train Model" />
    </ListItem>
    <Divider />
    <ListItem button component={Link} to={ProjectsRoute} onClick={mobileOpen ? this.handleDrawerToggle : null}>
        <ListItemIcon>
            <PersonIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText primary="Run Inference" />
    </ListItem>
    <Divider/>
    { isLogged ?
            <List>
            <ListItem button onClick={this.onSignOutClick}>
            <ListItemIcon>
                <ExitToAppIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary="Log out" />
            </ListItem>
            </List>:
        null
    }

                </List>
            </div>
        );
        return (
            <div>
                <div id="main-background" />
                <div id="main-layout">
                    <MuiThemeProvider theme={theme}>
                        <div className={classes.root} >
                            <Hidden mdUp implementation="css">
                                <AppBar position="fixed" color="secondary">
                                    <Toolbar>
                                        <IconButton
                                            color="inherit"
                                            aria-label="Open drawer"
                                            onClick={this.handleDrawerToggle}
                                            className={classes.menuButton}
                                        >
                                            <MenuIcon />
                                        </IconButton>
                                        <Typography variant="h6" color="inherit" className={classes.title}>
                                            Meru
                                    </Typography>
                                    </Toolbar>
                                </AppBar>
                            </Hidden>
                            <nav className={classes.drawer}>
                                <Hidden mdUp implementation="css">
                                    <Drawer
                                        color="primary"
                                        className={classes.drawer}
                                        variant="temporary"
                                        open={mobileOpen}
                                        onClose={this.handleDrawerToggle}
                                        classes={{
                                            paper: classes.drawerPaper,
                                        }}
                                        anchor="left"
                                    >
                                        {drawer}
                                    </Drawer>
                                </Hidden>
                                <Hidden smDown implementation="css">
                                    <Drawer
                                        classes={{
                                            paper: classes.drawerPaper,
                                        }}
                                        variant="permanent"
                                        open
                                    >
                                        {drawer}
                                    </Drawer>
                                </Hidden>
                            </nav>
                            <main className={classes.content}>
                                <Hidden mdUp implementation="css">
                                    <div className={classes.toolbar} />
                                </Hidden>
                                <Box width="100%" className="mainContent">
                                    {this.props.children}
                                </Box>
                            </main>
                        </div>
                    </MuiThemeProvider>
                </div>
            </div>
        );
    }
}
export default withStyles(styles)(Layout)