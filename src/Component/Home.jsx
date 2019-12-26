import {Navbar, NavDropdown} from 'react-bootstrap';
import React, { Component } from 'react';
import '../Styles/Home.css';
import Arka from '../Images/arka.png';
import Avatar from '../Images/Avatar.png';
import Chat from '../Images/chat.png'
import Bell from '../Images/bell.png'
import {Link} from 'react-router-dom';
import Cards from './Card.jsx';

class Home extends Component {

  state = {
      nama:'Ageng Setyo',
      engineers:[['Budi Setyawan'],['Budi Herianto'],['Budi Suseno'],
           ['Budi Sutiyoso'],['Budi Jembot'],['Budi Wakwaw']],
      skills:[['NodeJS, React, ReactNative, ExpressJs'],['ReactNative, ExpressJs'],
              ['ReactNative'],['React'],['NodeJS, React, ReactNative, ExpressJs'],
              ['ReactNative']],
      description:[['Frontend Developer'],['Frontend Developer'],['Frontend Developer'],
                  ['Frontend Developer'],['Frontend Developer'],['Frontend Developer']]
  }

  render() {
    const {nama} = this.state
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
            <Navbar.Text id='nav-text'>
              Home
            </Navbar.Text>
          </Link>
          <img src={Avatar} alt="Avatar" className="nav-avatar"/>
          
          <NavDropdown title={nama}id="nav-dropdown">
              <NavDropdown.Item >Action</NavDropdown.Item>
              <NavDropdown.Item>Another action</NavDropdown.Item>
              <NavDropdown.Item>Something</NavDropdown.Item>
          <NavDropdown.Divider/>
              <NavDropdown.Item href="/login">Logout
              </NavDropdown.Item>
         </NavDropdown>
          
            <div className='border-vertical'>
            </div>
            <img src={Chat} alt="Chat" className="nav-chat"/>
            <img src={Bell} alt="Bell" className="nav-bell"/>

      </Navbar>
      <div className='card-container'>
          {this.state.engineers.map((_,idx)=> <Cards nama={this.state.engineers[idx]} 
          skills={this.state.skills[idx]} description={this.state.description[idx]} />)
          }
      </div>
    </div>
    );
  }
  
}

export default Home;
