import {Navbar, NavDropdown,Form, Button} from 'react-bootstrap';
import React, { Component } from 'react';
import '../Styles/Home.css';
import Arka from '../Images/arka.png';
import Avatar from '../Images/Avatar.png';
import Chat from '../Images/chat.png'
import Bell from '../Images/bell.png'
import {Link} from 'react-router-dom';
import Cards from './Card.jsx';
import Profile from './Profile.jsx';
import axios from 'axios';

class Home extends Component {
  constructor(){
    super()
      this.state = {
        nama:'',
        engineersBeta: [],
        toogleProfile:false,
        description:'',
        skills:'',
        location:''
        
    }
    const url = ['http://localhost:8000/api/engineer/AidilFY',
                'http://localhost:8000/api/engineer']
    let usernameLocal = localStorage.getItem('username :');
    
    // console.log("Constructor")
    // axios.get(url[0])
    // // .then(item => console.log(item.data.response))
    // .then(res =>  {
    //   this.setState({
    //     nama:res.data[0].Name,
    //     description:res.data[0].Description
    //   })
    // })
    // .catch(err => console.log(err));
    
    axios.get(url[1])
    // .then(item => console.log(item.data.response))
    .then(res =>  {
      console.log(res.data.data.response)
      for (let i = 0; i < res.data.data.response.length; i++){
        // console.log(res.data.data.response[i].Skills)
        if (res.data.data.response[i].username === usernameLocal){
          this.setState({
            nama:res.data.data.response[i].Name,
            description:res.data.data.response[i].Description,
            skills:res.data.data.response[i].Skills,
            location:res.data.data.response[i].Location
          })
        }
      }
      this.setState({engineersBeta : res.data.data.response})
      // console.log(res.data.data.response)
      // console.log(this.state.engineersBeta)
    })
    .catch(err => console.log(err));

  }

  // componentDidMount = () => {
  //   //dijalankan setelah ada data (state dan/atau props) yang berubah
  //   axios.get('http://localhost:8000/api/engineer')
  //   // .then(item => console.log(item.data.response))
  //   .then(res =>  {
  //     this.setState({engineersBeta : res.data.data.response})
  //     // console.log(res.data.data.response)
  //     // console.log(this.state.engineersBeta)
  //   })
  //   .catch(err => console.log(err));
  // };

  render() {
    // console.log('Render')
    const {nama,description,skills} = this.state
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
            <Navbar.Text id='nav-text' onClick={e => {
                      this.setState({
                        toogleProfile:false
                      });
                    }}>
              Home
            </Navbar.Text>
            </Link>
          <img src={Avatar} alt="Avatar" className="nav-avatar"/>
          
          <NavDropdown title={nama}id="nav-dropdown">
              <NavDropdown.Item onClick={e => {
                      this.setState({
                        toogleProfile:true
                      });
                    }}>Profile</NavDropdown.Item>
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
          {!this.state.toogleProfile ? this.state.engineersBeta.map((_,idx)=> <Cards key={idx} nama={this.state.engineersBeta[idx].Name} 
          skills={this.state.engineersBeta[idx].Skills} description={this.state.engineersBeta[idx].Description} />)
          : <Profile nama={nama} description={description} skills={skills}/>
          }
          {this.state.toogleProfile ?           
          <div className='crud-engineer'> 
            <Form.Label className='update-name-text'>Name</Form.Label>
            <Form.Control className='update-name-control' type="text" placeholder={this.state.nama} />
            <Form.Label className='update-description-text'>Description</Form.Label>
            <Form.Control className='update-description-control' type="text" placeholder={this.state.description} />
            <Form.Label className='update-location-text'>Location</Form.Label>
            <Form.Control className='update-location-control' type="text" placeholder={this.state.location} />
            <Button variant="primary">Update</Button>
            </div>
          : null  
          }
            

      </div>

    </div>
    );
  }
  
}

export default Home;
