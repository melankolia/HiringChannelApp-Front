import React, { Component } from 'react';
import '../Styles/Cards.css'
import check from '../Images/check.png';
import star from '../Images/star.png';

class Cards extends Component {

    state ={
        nama:'Budi Setyawan',
        description:'Frontend Developer',
        skills:'NodeJS, React, ReactNative, ExpressJs',
        totalProject:'47',
        totalSuccessRate:'100%'
    }

render(){
    return(
        <div className='card-style'>
            
            <div className='overlay-card'>
                <p className="text-card">
                    {this.props.nama}
                </p>
                <div className="text-card-description">
                    <p className='text-description'>{this.props.description}
                            </p>
                    <div className = 'project-success'>
                        <img src={check}/>
                        <p className ='text-project'>
                            {this.state.totalProject} Project
                        </p>
                        <img src={star} className='img-project'/>
                        <p className ='text-success'>
                            {this.state.totalSuccessRate} Success Rate
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