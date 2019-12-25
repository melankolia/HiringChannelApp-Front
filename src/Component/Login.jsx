import {Form} from 'react-bootstrap';
import arkWhite from '../Images/ark-white1.png';
import piclogin from '../Images/imageleftlogin.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import '../Styles/Login.css';

class Login extends Component {

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
            <p className='textlogin'>
                Login
            </p>
              <div className='form'>
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label className='inputUsername'>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label className='inputPassword'>Password</Form.Label>
                    <Form.Control type="text" placeholder="Enter password" />
                  </Form.Group> 
                    <p className="forget">
                      Forgot Password ?
                    </p>
                  <button className='button-login' size="lg">
                    Login
                  </button>
                  <button className='button-register-form-login' size="lg" 
                    onClick={() => {
                      //login dulu trus navigasi
                      console.log(this.props)
                      this.props.history.push ('/register');
                    }}>
                    Register
                  </button>
                </Form>
              </div>
          </div>
        </Grid>
      </Grid>
    );
  }
  
}

export default Login;
