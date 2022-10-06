import React, { Component } from 'react';
import { Amplify } from 'aws-amplify';
import { Button, Grid, Box, Typography, Container, Divider } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsExports from '../../aws-exports';
import '@aws-amplify/ui-react/styles.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {styled} from '@mui/system';
import uuid from '../../../node_modules/uuid/dist/v4';
import AddButton from '../../Components/AddButton/AddButton'

import { Storage } from 'aws-amplify';
// import AuthTheme from '../../Config/AuthTheme';
// import { signUpConfig } from '../../Config/AuthConfig';

const Item = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    border: '1px solid',
    borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
    padding: theme.spacing(1),
    borderRadius: '4px',
    textAlign: 'center',
  }));

Amplify.configure(awsExports);

class Projects extends Component { 
    render() {
        return (
            <Container>
                <Typography style={{marginBottom: "20px"}} variant="h4" >Imagine! You as Ironman. Your dog going for a Swim. Your Boss Crushed by Soviet Russia. Your Ex Making Sweet Love with Satan. </Typography>
                <Typography variant="h6">With Meru, you can train stable diffusion on your own private assets, and turn them into whatever art your heart desires.</Typography>
                <Divider style={{marginBottom: "20px"}}/>
                <Typography variant="p" style={{marginBottom: "40px"}}>To get started, we need ~20 pictures of something you want to create artwork of. This can be your face, your sofa, or your octopus. Right now, our model works well for faces, so maybe start there? To check out some examples visit usemeru.com</Typography>
                <Box style={{marginTop:"20px"}}>
                <Alert severity = "error" style={{marginBottom: "40px"}}> 
                <AlertTitle>
                    Warning: You are limited to training one model.
                </AlertTitle>
                Right now, we can only afford to have each user generate one unique model. Once you upload your images this page will be locked. You will have to get in touch with our team to unlock it. </Alert>
                </Box>
                <Typography>Step 1: Take photos of your asset. For faces, we've found that images with vastly different backgrounds and compositions tend to work best. Here are some examples of me. You can use them to catfish on Tinder if you'd like.</Typography>
                <Box
                        component="img"
                        sx={{
                        height: 410,
                        width: 350,  
                        marginTop: 20, 
                        alignContent: 'center'                 
                        }}
                        alt="Not sure why you are seeing this but text me 5108945410"
                        src={require("../../assets/img/Example.png")}
                    />
                <Typography>Step 2: Add your images to a folder, and compress the folder into a zip file. </Typography>
                <Container style={{marginBottom:"20px"}}>
                </Container>
                <Typography>Step 3: Click the button below and upload your zip file. Model training will begin immediately after your upload is complete.</Typography>
                <Container maxWidth='md' style={{padding: 20}}>
                <AddButton />
                </Container>
            </Container>
        );
    }
}
export default withAuthenticator(Projects);