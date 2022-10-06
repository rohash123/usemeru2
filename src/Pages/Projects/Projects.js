import React, { Component } from 'react';
import { Auth, Amplify } from 'aws-amplify';
import { Box, Container, Typography } from '@material-ui/core';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import '@aws-amplify/ui-react/styles.css';

// import AuthTheme from '../../Config/AuthTheme';
// import { signUpConfig } from '../../Config/AuthConfig';

import awsExports from '../../aws-exports';
Amplify.configure(awsExports);
class Projects extends Component {
    constructor() {
        super()
        this.state = {}
    }
    async componentDidMount(){
        await Auth.currentUserInfo().then(data => this.setState({'state': data.attributes['custom:modelTrained']},function(){}))
    }
    render() {
        console.log(this.state)
        let content = (
            <Box style={{marginTop: '80px'}}>
            <Alert severity = "warning" style={{marginBottom: "40px"}}> 
                    <AlertTitle>
                        Train Your Model
                    </AlertTitle>
                        Before you can generate custom stable diffusion images, you must train the model to recognize your custom asset. Click the 'Train Model' tab on the left. 
                    </Alert>
        </Box>)
        if(this.state.state == 'inprogress'){
            content = (
                <Box style={{marginTop: '80px'}}>
                    <Alert severity = "success" style={{marginBottom: "40px"}}> 
                    <AlertTitle>
                        Your Images have been received and your model is now training!
                    </AlertTitle>
                        You will be notified when your model is ready for inference. To cancel your training or upload a new set of assets, please contact me at rohan@usemeru.com
                    </Alert>
                    </Box>
            );
        }
        if(this.state == 'done'){
            content = (
                <Box style={{marginTop: '80px'}}>
                    <Alert severity = "success" style={{marginBottom: "40px"}}> 
                    <AlertTitle>
                        Your Images have been received and your model is now training!
                    </AlertTitle>
                        You will be notified when your model is ready for inference. To cancel your training or upload a new set of assets, please contact me at rohan@usemeru.com
                    </Alert>
                </Box>

            );
        }
        return (
            <Container>
                <Typography style = {{margineBottom: '40px'}} variant = "h4">Generate Artwork</Typography>
                {content}
            </Container>
        );
    }
}
export default withAuthenticator(Projects);