import React, { Component } from 'react';
import { Box , Button} from '@material-ui/core';
import { Storage, Auth } from 'aws-amplify';
import uuid from '../../../node_modules/uuid/dist/v4'
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
const normalize = require('normalize-path');
class AddButton extends Component {    
    async pushImgToS3(uri, filename) {
        if (uri === null) return
        await Storage.put(filename, uri)
            .then(result => console.log(result.key))
            .catch(err => console.log(err));
       }
       constructor() {
        super()
        this.handleChange= this.handleChange.bind(this)
        this.state = false
        }
        
        
    
      async componentDidMount()
       {
        await Auth.currentUserInfo().then(data => this.setState({'state': data.attributes['custom:modelTrained']}))
        console.log(this.state)
        }     
    
       handleChange = async (event) => {
        event.persist();
        // Check there is some files to upload
        if (!event || !event.target || !event.target.files) return
       const filesLength = event.target.files.length;
       console.log(filesLength);
        // Loop through all selected files
        const userInfo = await Auth.currentUserInfo()
        const user = await Auth.currentAuthenticatedUser();
        
        for (let i = 0; i < filesLength; i++) {
         const file = event.target.files[i];
         const filename = file.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
         const fileExtension = file.name.split('.').pop();
         // Define the image name
         let mainImgName = normalize(userInfo.username + '/' + uuid() + '.' + fileExtension);
         // Push the image to S3
        await this.pushImgToS3(file, mainImgName)
        // await Auth.updateUserAttributes(user, {
        //     'custom:modelTrained': 'inprogress'
        // });
        }
        await Auth.currentUserInfo().then(data => this.setState({'state': data.attributes['custom:modelTrained']}))
        console.log(this.state.attributes)
       }
    render() {
        let content = (
            <Box>
            <input
        accept=".zip"
        id="button-add-picture"
        type="file"
        onChange={this.handleChange}
        style={{ display: 'none' }}
    />
    <label htmlFor="button-add-picture">
 <Button variant="contained"
         component="span"
 >
    Give it to the AI
 </Button>
</label>
        </Box>
        );
        if(this.state.state == 'inprogress'){
            content = (
                <Box>
                <Alert severity = "success" style={{marginBottom: "40px"}}> 
                    <AlertTitle>
                        Your Images have been received and your model is now training!
                    </AlertTitle>
                        You will be notified when your model is ready for inference. To cancel your training or upload a new set of assets, please contact me at rohan@usemeru.com
                    </Alert>
            </Box>)
            }
        return (
            <div>
            {content}
        </div>
            
        );
    }}
export default AddButton