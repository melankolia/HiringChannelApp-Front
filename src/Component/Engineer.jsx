import {Navbar, NavDropdown,Form, Button, InputGroup, FormControl} from 'react-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import React, { Component } from 'react';
import '../Styles/Engineer.css';
import Arka from '../Images/arka.png';
import Avatar from '../Images/Avatar.png';
import Chat from '../Images/chat.png'
import Bell from '../Images/bell.png'
import {Link} from 'react-router-dom';
import Profile from './Profile.jsx';
import axios from 'axios';

class Engineer extends Component {
  constructor(){
    super()
      this.state = {
        id:'',
        nama:'',
        toggleProfile:true,
        toggleUpdate:'1',
        description:'',
        skills:'',
        location:'',
        token:'',
        link:'',
        dateofbirth:'',
        response:[],
        skilldelete:'',
        skillupdate:''       
    }
 }

  logout = e => {
    localStorage.removeItem('token :')
    this.setState({
    engineersBeta: []});
    this.props.history.push ('/login');

    }
  toggleUpdateFun = e => {
    this.setState({
      toggleProfile:false
    })
  }
  toggleProfileFun = e => {
    this.setState({
      toggleProfile:true
    })
  }
  getAllengineer(){
    let usernameLocal = localStorage.getItem('username :');
    let token = localStorage.getItem('token :')
    let role = localStorage.getItem('role :')
    if (!token){
      this.props.history.push('/login')
    }
    
    const url = 'http://localhost:8000/api/' + role + '/get/' + usernameLocal
    
    const config = {
      headers: {'Authorization': "Bearer " + token,
                'username': usernameLocal}
    };
    // console.log("Constructor")
    axios.get(url,config)
    // .then(item => console.log(item.data.response))
    .then(res =>  {
      // console.log(res.data[0].Skills)
      // console.log(token)
          let dateTemporary
          let Skills
      if (res.data[0].DateofBirth){
          dateTemporary = res.data[0].DateofBirth.slice(0, 10)
      }
      else {
          dateTemporary = '2000-01-01';
      }
      if (res.data[0].Skills){
          Skills = res.data[0].Skills.split(',');
      }
      else {
          Skills = [' '];
      }
       
      this.setState({
        id:res.data[0].id,
        nama:res.data[0].Name,
        description:res.data[0].Description,
        location:res.data[0].Location,
        skills:Skills,
        role:role,
        currentPage:res.data[0].currentPage,
        dateofbirth:dateTemporary,
        response:res.data[0]
      })
      console.log("Ini State id: " + this.state.id)
      console.log('Date of Birth: ' + this.state.dateofbirth)
      console.log(this.state.response)
    })
    
    .catch(err => console.log(err));
  }
  patchUser(){
    let usernameLocal = localStorage.getItem('username :');
    let token = localStorage.getItem('token :');
    const url = 'http://localhost:8000/api/engineer/'+ parseInt(this.state.id)
    let data = {
      Name: this.state.nama,
      Description: this.state.description,
      DateofBirth: this.state.dateofbirth,
    }
    let headers =  {'Authorization': "Bearer " + token,
                      'username': usernameLocal};
    axios.patch(url, null, {
      headers:headers,
      params:data
    })
    .then(res => {Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Profile Updated',
    })
    this.getAllengineer()})
    .catch( err => Swal.fire({
      icon: 'error',
      title: 'error',
      text: 'Update Failed',
    })
    )
  }
  postSkill(){
    let usernameLocal = localStorage.getItem('username :');
    let token = localStorage.getItem('token :');
    const url = 'http://localhost:8000/api/engineer/skills'
    let headers =  {'Authorization': "Bearer " + token,
                      'username': usernameLocal};
    let data = {id_Engineer:this.state.id,
                SkillsName:this.state.skillupdate}
    if (data.SkillsName){
      axios.post(url, data, {
        headers:headers,
      })
      .then(res => {Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Skill Added',
      })
      this.getAllengineer()})
      .catch( err => Swal.fire({
        icon: 'error',
        title: 'error',
        text: 'Insert Skill Failed',
      })
      )
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: 'Insert Skill Failed',
      })
    }

  }
  deleteSkills(){
    let usernameLocal = localStorage.getItem('username :');
    let token = localStorage.getItem('token :');
    const url = `http://localhost:8000/api/engineer/skills/${this.state.id}`
    let headers =  {'Authorization': "Bearer " + token,
                      'username': usernameLocal};
    if (this.state.skillupdate || this.state.skilldelete){
      axios.delete(url,  {
        headers:headers,
        params:this.state.skilldelete || this.state.skillupdate
      })
      .then(res => {Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Skill Deleted',
      })
      this.getAllengineer()})
      .catch( err => Swal.fire({
        icon: 'error',
        title: 'error',
        text:'Delete Failed',
      })
      )
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text:'Delete Failed',
      })
    }

  }

  componentDidMount() {
    console.log('Did Mount')
    this.getAllengineer();
  }
  
  render() {
    const {role} = this.state
    const {Name, Description, Location, Skills} = this.state.response
    console.log('THIS IS ENGINEEER')
    console.log(role)
    return (
    <div className='container-home-engineer'>
      <Navbar className='navbar-style-engineer'>
          <Navbar.Brand>
            <img
              alt="Arka"
              src={Arka}
            />
          </Navbar.Brand>
          <input className='navbar-search-engineer' type="text" name="search" placeholder="Search..">
          </input>
          <Link to = '/engineer'>
            <Navbar.Text id='nav-text' onClick={e => this.toggleProfileFun(e)}>
              Home
            </Navbar.Text>
            </Link>
          <img src={Avatar} alt="Avatar" className="nav-avatar-engineer"/>
          
          <NavDropdown title={Name || 'Nama'} id="nav-dropdown">
              <NavDropdown.Item onClick={e => {
                          this.setState({
                            toggleUpdate:'1'
                          });
                        }}>Project</NavDropdown.Item>
              <NavDropdown.Item onClick={e => {
                      this.setState({
                        toggleUpdate:'2'
                      });
                    }}>Update Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={e => {
                      this.setState({
                        toggleUpdate:'3'
                      });
                    }}>Update Skills</NavDropdown.Item>
          <NavDropdown.Divider/>
              <NavDropdown.Item onClick={e => {this.logout(e)
                    }}>Logout
              </NavDropdown.Item>
         </NavDropdown>
          
            <div className='border-vertical-engineer'>
            </div>
            <img src={Chat} alt="Chat" className="nav-chat-engineer"/>
            <img src={Bell} alt="Bell" className="nav-bell-engineer"/>

      </Navbar>
      <div className='card-container-engineer'>
          {!this.state.toggleProfile ? <Profile nama={Name} description={Description} skills={Skills} role={role} location={Location}/>
          : <Profile nama={Name} description={Description} skills={Skills} role={role} location={Location}/>}
        {this.state.toggleProfile ?           
        <div className='crud-engineer-engineer'> 
            {this.state.toggleUpdate === '1'? 
              <p className='project-list'> Project List </p> 
              :this.state.toggleUpdate === '2' ? 
              <div>
              <p className='project-list'> Update Profile </p> 
              <Form.Label className='update-name-text-engineer'>Name</Form.Label>
              <Form.Control className='update-name-control-engineer' type="text" defaultValue={this.state.nama} 
                  onChange={ e => {this.setState({nama:e.target.value})
                                  console.log(e.target.value)}}/>
              <Form.Label className='update-description-text-engineer'>Description</Form.Label>
              <Form.Control className='update-description-control-engineer' type="text" defaultValue={this.state.description} 
                  onChange={ e => {this.setState({description:e.target.value})
                                    console.log(e.target.value)}}/>
              <Form.Label className='update-birthdate-text-engineer'>Date of Birth</Form.Label>
              <div>
              <input type="date" name="bday" value={this.state.dateofbirth}
                onChange={ e => {this.setState({
                  dateofbirth:e.target.value
                })}}>
              </input>
              </div>
              <Button className='button-update-engineer'variant="outline-secondary" active 
                  onClick={e => this.patchUser(e)}>Update</Button>

              </div> 
              :this.state.toggleUpdate === '3' ? 
              <>
              <p className ='update-name-skills-engineer'> Update skills </p>
              <Form.Control className='skill-list' as="select" multiple onChange={ e => this.setState({skilldelete:e.target.value})}>
                {this.state.skills.map((value,idx)=> 
                      <option key={idx}>
                          {value}
                      </option> )}
              </Form.Control>
              <br/>
              <InputGroup className='input-group'>
                <FormControl
                  placeholder="Insert skill"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  onChange={ e => this.setState({skillupdate:e.target.value})}
                />
                <InputGroup.Append>
                    <Button className='insert-button' variant='success' size='sm' onClick={e => this.postSkill()}>Insert</Button>
                    <Button className='delete-button' variant='danger' size='sm' onClick={e => this.deleteSkills()}>Delete</Button>
                </InputGroup.Append>
              </InputGroup>


              </>
              : null
            }
            
        </div>
          : null}
       </div> 

    </div>
    );
  }
  
}

export default Engineer;