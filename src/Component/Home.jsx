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
        id:'',
        nama:'',
        engineersBeta: [],
        toggleProfile:false,
        description:'',
        skills:'',
        location:'',
        token:'',
        valueName:'',
        valueSkills:'',
        searchType:'searchName=',
        searchSkills:'searchSkills=',
        sorting:'&sorting=ASC&',
        limit:'&Limit=',
        valueLimit:'6',
        page:'&Page=',
        currentPage:'',
        valuePage:'1',
        totalPage:'',
        link:''       
    }
 }

  logout = e => {
    localStorage.removeItem('token :')
    this.setState({
    engineersBeta: []});
    this.props.history.push ('/login');

    }
  toggleProfileFun = e => {
    this.setState({
      toggleProfile:false
    })
  }
  getAllengineer(){
    let usernameLocal = localStorage.getItem('username :');
    let token = localStorage.getItem('token :')
    let role = localStorage.getItem('role :')
    let Page = this.state.totalPage || 1;
    if (!token){
      this.props.history.push('/login')
    }
    
    const url = ['http://localhost:8000/api/' + role + '/get/' + usernameLocal ,
                `http://localhost:8000/api/engineer/search?${this.state.searchType}${this.state.valueName}${this.state.sorting}${this.state.searchSkills}${this.state.valueSkills}${this.state.limit}${this.state.valueLimit}${this.state.page}${Page}`]
    
    const config = {
      headers: {'Authorization': "Bearer " + token,
                'username': usernameLocal}
    };
    console.log(url[1])
    // console.log("Constructor")
    axios.get(url[0],config)
    // .then(item => console.log(item.data.response))
    .then(res =>  {
      // console.log(res.data[0].Skills)
      // console.log(token)
      this.setState({
        id:res.data[0].id,
        nama:res.data[0].Name,
        description:res.data[0].Description,
        location:res.data[0].Location,
        skills:res.data[0].Skills,
        role:role,
        currentPage:res.data[0].currentPage
      })
      console.log("Ini State id: " + this.state.id)
    })
    
    .catch(err => console.log(err));
    
    axios.get(url[1],config)
    // .then(item => console.log(item.data.response))
    .then(res =>  {
      this.setState({engineersBeta : res.data.data.response,
        totalPage: res.data.data.totalpage,
        currentPage: res.data.data.currentPage})
        console.log(this.state)
        console.log(this.state.totalPage)
    })
    .catch(err => console.log(err));

    
  }
  searching(Name,Skill){
    let usernameLocal = localStorage.getItem('username :');
    let token = localStorage.getItem('token :')
    // let role = localStorage.getItem('role :')
    let searchName = Name || '';
    let searchSkill = Skill || '';
    // console.log('searchName : ' + searchName + ' searchSkill : ' + searchSkill)
    console.log(`http://localhost:8000/api/engineer/search?${this.state.searchType}${searchName}${this.state.sorting}${this.state.searchSkills}${searchSkill}${this.state.limit}${this.state.valueLimit}${this.state.page}${this.state.valuePage}`)
    const url = [`http://localhost:8000/api/engineer/search?${this.state.searchType}${searchName}${this.state.sorting}${this.state.searchSkills}${searchSkill}${this.state.limit}${this.state.valueLimit}${this.state.page}${this.state.valuePage}`]
    this.setState({valueName:searchName, valueSkills:searchSkill, link:url[0]})
    const config = {
      headers: {'Authorization': "Bearer " + token,
                'username': usernameLocal}
    };
    // console.log(config)
    // console.log("Constructor")
    
    axios.get(url[0],config)
    // .then(item => console.log(item.data.response))
    .then(res =>  {
      // console.log(res.data.data)
      console.log(res.data.data.totalPage)
      this.setState({engineersBeta : res.data.data.response, 
        totalPage : res.data.data.totalpage,
        currentPage: res.data.data.currentPage})
      console.log(res.data.data.totalPage)
      //console.log(res.data.data.response)
      // console.log(this.state.engineersBeta)
    })
    .catch(err => console.log(err));
    // console.log('constructor')
    // console.log(this.state.engineersBeta)
  }

  pagination(textPage){
    let usernameLocal = localStorage.getItem('username :');
    let token = localStorage.getItem('token :')
    let Page = 1;
    if (textPage === 'Left'){
      Page = parseInt(this.state.currentPage) - 1
    }
    else if (textPage === 'Right'){
      Page = parseInt(this.state.currentPage) + 1
    }

    if (Page > this.state.totalPage){
      Page = parseInt(this.state.totalPage)
    }
    if (Page <= 0){
      Page = 1;
    }
    const url = [`http://localhost:8000/api/engineer/search?${this.state.searchType}${this.state.valueName}${this.state.sorting}${this.state.searchSkills}${this.state.valueSkills}${this.state.limit}${this.state.valueLimit}${this.state.page}${Page}`]
    const config = {
      headers: {'Authorization': "Bearer " + token,
                'username': usernameLocal}
    };
    // console.log(config)
    // console.log("Constructor")
    
    axios.get(url[0],config)
    // .then(item => console.log(item.data.response))
    .then(res =>  {
      // console.log(res.data.data)
      // console.log(res.data.data.response)
      this.setState({engineersBeta : res.data.data.response,
      currentPage: res.data.data.currentPage})
      console.log(res.data.data.arrayPage)
      //console.log(res.data.data.response)
      // console.log(this.state.engineersBeta)
    })
    .catch(err => console.log(err));
  }

  componentDidMount() {
    console.log('Did Mount')
    this.getAllengineer();
  }

  
  render() {
    const {nama,description,skills,role,location} = this.state
    console.log('Render')

    return (
    <div className='container-home'>
      <Navbar className='navbar-style'>
          <Navbar.Brand>
            <img
              alt="Arka"
              src={Arka}
            />
          </Navbar.Brand>
          <input className='navbar-search' type="text" name="search" placeholder="Search.."
                      onKeyPress={({key, target}) => {
                        if (key === 'Enter') {
                          this.searching(target.value);
                        }
                      }}></input>
          <Link to = '/home'>
            <Navbar.Text id='nav-text' onClick={e => this.toggleProfileFun(e)}>
              Home
            </Navbar.Text>
            </Link>
          <img src={Avatar} alt="Avatar" className="nav-avatar"/>
          
          <NavDropdown title={nama}id="nav-dropdown">
              <NavDropdown.Item onClick={e => {
                      this.setState({
                        toggleProfile:true
                      });
                    }}>Profile</NavDropdown.Item>
          <NavDropdown.Divider/>
              <NavDropdown.Item onClick={e => {this.logout(e)
                    }}>Logout
              </NavDropdown.Item>
         </NavDropdown>
          
            <div className='border-vertical'>
            </div>
            <img src={Chat} alt="Chat" className="nav-chat"/>
            <img src={Bell} alt="Bell" className="nav-bell"/>

      </Navbar>
      {!this.state.toggleProfile ?
      <div className='searching-type'>
          <input className='navbar-search-skill' type="text" name="search" placeholder="Search Skills"
              onKeyPress={({key, target}) => {
                let _ = '';
                if (key === 'Enter') {
                  this.searching(_,target.value);
                }
              }}></input>
              <Form.Control className='select-page' as="select" 
                    onChange ={ (e) => this.setState({valueLimit:e.target.value})}>
                        <option>6</option>
                        <option>12</option>
                        <option>18</option>
              </Form.Control>
      <Button variant="outline-secondary" className='button-apply1'size="sm" 
                  onClick={e => {this.setState({sorting:'&sorting=ASC&'})}}>
        Asc
      </Button>
      <Button variant="outline-secondary" className='button-apply2'size="sm" 
                  onClick={e => {this.setState({sorting:'&sorting=DESC&'})}}>
        Desc
      </Button>
      <Button variant="outline-secondary" className='button-apply3'size="sm" active
                  onClick={e => {this.searching(this.state.valueName,this.state.valueSkills)}}>
        Apply
      </Button>
      </div>
      : <div className='searching-type'>
      </div> }
      <div className='card-container'>
          {!this.state.toggleProfile ? this.state.engineersBeta.map((_,idx)=> <Cards key={idx} nama={this.state.engineersBeta[idx].Name} 
          skills={this.state.engineersBeta[idx].Skills} description={this.state.engineersBeta[idx].Description} />)
          : <Profile nama={nama} description={description} skills={skills} role={role} location={location}/>}
        {this.state.toggleProfile ?           
        <div className='crud-engineer'> 
            <Form.Label className='update-name-text'>Name</Form.Label>
            <Form.Control className='update-name-control' type="text" placeholder={this.state.nama} />
            <Form.Label className='update-description-text'>Description</Form.Label>
            <Form.Control className='update-description-control' type="text" placeholder={this.state.description} />
            <Form.Label className='update-location-text'>Location</Form.Label>
            <Form.Control className='update-location-control' type="text" placeholder={this.state.location} />
            {this.state.role === 'engineer' ?
          <div>
            <Form.Label className='update-skills-text'>Skills</Form.Label>
            <Form.Control className='update-skills-control' type="text" placeholder='skills' />
          </div>
              : null}
              <Button variant="outline-secondary" active >Update</Button>
        </div>
          : null}
       </div> 
       {!this.state.toggleProfile ?  
       <div className='page-section'>
         <Button className='button-page'  
         onClick={e => {this.pagination('Left')}}>&laquo;</Button>
          <p className='text-page'>{this.state.currentPage} of {this.state.totalPage}</p>    
         <Button className='button-page'  
         onClick={e => {this.pagination('Right')}}>&raquo;</Button>    
       </div> : null}
    </div>
    );
  }
  
}

export default Home;
