import React from 'react';
import {Link} from 'react-router-dom';


export default function Welcome(){
    return <>
     <div className='welcome-page'>
        <div className='container welcome-container'>
          <div className='row'>
                <div className='col-12'>
                    <h1 className='welcome-header'>Welcome to Vocab Builder</h1>
                </div>
                <div className='col-12 welcome-img-div'></div>
                <div className='col-12'>
                    <Link to='/landing' className='welcome-link'><button className='welcome-button'>Enter</button></Link>
                </div>
          </div>
        </div>
        </div>
          </>
}