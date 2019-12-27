import React, { Component } from 'react';
import '../Styles/CardCompany.css'
import check from '../Images/check.png';
import star from '../Images/star.png';

class CardCompany extends Component {

    state ={
        totalProject:'47',
        totalSuccessRate:'100%'
    }

render(){
    return(
        <div className='card-style-company'>
            
            <div className='overlay-card-company'>
                <p className="text-card-company">
                    {this.props.nama}
                </p>
                <div className="text-card-description-company">
                    <p className='text-description-company'>{this.props.description}
                            </p>
                    <div className = 'project-success-company'>
                        <img src={check} alt='check-ico'/>
                        <p className ='text-project-company'>
                            Location : {this.props.location}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
    }
}

export default CardCompany;