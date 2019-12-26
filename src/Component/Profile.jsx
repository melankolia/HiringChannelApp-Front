import {Form} from 'react-bootstrap';
import React, { Component } from 'react';
import '../Styles/Profile.css';
import {Link} from 'react-router-dom';
import Cards from './Card.jsx'

class Profile extends Component {
    constructor(){
      super()
        this.state = {
          nama:'',
          engineersBeta: [],
          toogleProfile:false      
      }

    }
    componentDidMount(){
        console.log('did mount')
        console.log(this.props.nama)
    }
    render(){
        console.log('render')
        return(
            <Cards nama={this.props.nama} description={this.props.description} skills={this.props.skills}/>
        )
    }
}
export default Profile;