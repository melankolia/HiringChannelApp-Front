import {Navbar, Nav, Col, Row, Container, Form, FormControl, Button} from 'react-bootstrap';
import {Link, Redirect} from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {

  }

  render() {
    return (
      <Redirect to='/login'/>
    );
  }
  
}

export default App;