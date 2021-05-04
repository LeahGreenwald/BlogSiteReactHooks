import React, { Component } from 'react';
import { Route } from 'react-router';
import Home from './Pages/Home';
import Layout from './Layout';
import ViewBlog from './Pages/ViewBlog';
import NewPost from './Pages/NewPost';
import MostRecent from './Pages/MostRecent';



export default class App extends Component {
  render() {
    return (
      <Layout>
        <Route exact path='/page/:page' component={Home} />
        <Route exact path='/' component={Home} />
        <Route exact path='/viewblog/:id' component={ViewBlog} />
        <Route exact path='/NewPost' component={NewPost} />
        <Route exact path='/mostRecent' component={MostRecent} />
      </Layout>
    );
  }
}