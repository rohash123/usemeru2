import React from 'react';
import { Route } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import Home from './Pages/Home/Home'
import Projects from './Pages/Projects/Projects'
import Layout from './Layout/Layout';
export const HomeRoute = "/";
export const ProjectsRoute = "/projects/";
class Routing extends React.Component {
    render() {
        return (
            <Layout>
                <Route path={HomeRoute} exact component={Home} />
                <Route path={ProjectsRoute} exact component={Projects} />
            </Layout >
        );
    }
}
export default withRouter(Routing);