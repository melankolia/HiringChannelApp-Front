import {Navbar,Image} from 'react-bootstrap';
import React, { Component } from 'react';
import '../Styles/Home.css';
import Arka from '../Images/arka.png';
import Avatar from '../Images/Avatar.png';
import Chat from '../Images/chat.png'
import Bell from '../Images/bell.png'
import {Link} from 'react-router-dom';
class Home extends Component {

  state = {
      
  }

  render() {
    return (
    <div className='container-home'>
      <Navbar className='navbar-style'>
          <Navbar.Brand>
            <img
              alt="Arka"
              src={Arka}
            />
          </Navbar.Brand>
          <input className='navbar-search' type="text" name="search" placeholder="Search.."></input>
          <Link to = '/home'>
            <Navbar.Text className='nav-text'>
              Home
            </Navbar.Text>
          </Link>
          <img src={Avatar} alt="Avatar" className="nav-avatar"/>
          <Link to = '/user'>
          <Navbar.Text className='nav-name'>
              Ageng
            </Navbar.Text>
          </Link>
            <div className='border-vertical'>
            </div>
            <img src={Chat} alt="Chat" className="nav-chat"/>
            <img src={Bell} alt="Bell" className="nav-bell"/>

      </Navbar>
      <div>
        <br/>
        <p>
          ROW 2
        </p>
        </div>
    </div>
    );
  }
  
}

export default Home;
