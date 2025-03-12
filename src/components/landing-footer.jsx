import React from 'react';
import {Link} from 'react-router-dom';

export default function LandingFooter(){
    return <>
        <div className='container-fluid footer-container'>
           <div className='row footer-row d-flex justify-content-around'>
                <div className='col-'>
                    <Link to='/landing' className='footer-link'>go home</Link>
                </div>
                 <div className='col-auto'>
                    <Link to='/dictionary' className='footer-link'>word search</Link>
                </div>
                 <div className='col-auto'>
                    <Link to='/study-deck' className='footer-link'>study deck</Link>
                </div>
                 <div className='col-auto'>
                    <Link to='/struggle-deck' className='footer-link'>struggle deck</Link>
                </div>
                 <div className='col-auto'>
                    <Link to='/dojo-landing' className='footer-link'>vocab dojo</Link>
                </div>
            </div>
        </div>
     </>
}