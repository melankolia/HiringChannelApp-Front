import {Navbar, NavDropdown} from 'react-bootstrap';
import React, { Component } from 'react';
import '../Styles/Home.css';
import Arka from '../Images/arka.png';
import Avatar from '../Images/Avatar.png';
import Chat from '../Images/chat.png'
import Bell from '../Images/bell.png'
import {Link} from 'react-router-dom';
import Cards from './Card.jsx';
import axios from 'axios';

class Home extends Component {

  state = {
      nama:'Ageng Setyo',
      engineersBeta: [],
  }
  componentDidMount = () => {
    //dijalankan setelah ada data (state dan/atau props) yang berubah
    axios.get('http://localhost:8000/api/engineer')
    // .then(item => console.log(item.data.response))
    .then(res =>  {
      this.setState({engineersBeta : res.data.data.response})
      // console.log(res.data.data.response)
      // console.log(this.state.engineersBeta)
    })
    .catch(err => console.log(err));
  };

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
          {this.state.engineersBeta.map((_,idx)=> <Cards key={idx} nama={this.state.engineersBeta[idx].Name} 
          skills={this.state.engineersBeta[idx].Skills} description={this.state.engineersBeta[idx].Description} />)
          }
      </div>
    </div>
    );
  }
  
}

export default Home;
