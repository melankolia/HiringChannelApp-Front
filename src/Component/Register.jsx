import {Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import arkWhite from '../Images/ark-white1.png';
import piclogin from '../Images/imageleftlogin.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import '../Styles/Register.css';

class Register extends Component {

  state = {
      
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={12} sm={7}>
          <div className='left'>
              <img className='arkawhite' src={arkWhite} alt='arkwhite'/>
              <img className='piclogin'  src={piclogin} alt='piclogin'/>
              <div className="description">
                <p className="description-header">
                  Hire expert freelancers for any job, online
                </p>
                <p className="description-footer">
                  Millions of small businesses use Freelancer to turn their ideas into reality.
                </p>
              </div>
          </div>
        </Grid>

        <Grid item xs={12} sm={5}>
          <div className='right'>
            <p className='textregister'>
                Register
            </p>
              <div className='form'>
                <Form>
                  <Form.Group> 
                    <Form.Label className='label-username'>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" />
                        <br/>
                    <Form.Label className='label-name'>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" />
                        <br/>
                    <Form.Label className='label-password'>Password</Form.Label>
                    <Form.Control type="text" placeholder="Enter password" />
                        <br/>
                    <Form.Label className='label-role'>Role</Form.Label>
                    <Form.Control as="select">
                        <option>Engineer</option>
                        <option>Company</option>
                    </Form.Control>

                  </Form.Group> 
                  <br/>
                  <button className='button-register' size="lg">
                    Create an Account
                  </button>
                  <br/>
                  <Link to = '/login'>
                  <p className="already">Already Have an Account ?
                    </p>
                    </Link>
                </Form>
              </div>
          </div>
        </Grid>
      </Grid>
    );
  }
  
}

export default Register;
