import React, { Component } from 'react';
import '../Styles/Cards.css'
import check from '../Images/check.png';
import star from '../Images/star.png';

class Cards extends Component {

    state ={
        totalProject:'47',
        totalSuccessRate:'100%'
    }

render(){
    let totalSuccessRate = 70 + (Math.floor(Math.random() * 30))
    let totalProject = Math.floor(Math.random() * 100)
    let Background = [require('../Images/yucel.png'), require('../Images/luis.png'), require('../Images/alina.png'),require('../Images/craig.png'),
                      require('../Images/lucas.png'),require('../Images/jonathan.png')]
    let randomBack = Math.floor(Math.random() * 6)

    return(
        <div className='card-style' style={{ backgroundImage: `url(${Background[randomBack]})` }} > 
            
            <div className='overlay-card'>
                <p className="text-card">
                    {this.props.nama}
                </p>
                <div className="text-card-description">
                    <p className='text-description'>
                        {this.props.description}
                    </p>
                    <div className = 'project-success'>
                        <img src={check} alt='check-ico'/>
                        <p className ='text-project'>
                            {totalProject} Project
                        </p>
                        <img src={star} alt='star-ico' className='img-project'/>
                        <p className ='text-success'>
                            {totalSuccessRate}% Success Rate
                        </p>
                    </div>
                </div>
                
                <p  className='text-card-skills'>
                        Skills: {this.props.skills}
                    </p> 
            </div>
        </div>
    )
    }
}

export default Cards;