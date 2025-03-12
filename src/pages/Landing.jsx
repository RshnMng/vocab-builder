import React from 'react';
import {Link} from 'react-router-dom';


export default function Landing(){
    return <>
        <div className='container-fluid landing-container landing-div'>
            <div className='row landing-row d-flex justify-content-center'>
                <Link to='/dictionary' className='col-sm-11 col-md-5 landing-section mb-2 mr-2 landing-dictionary'>word search</Link>
                <Link to='/study-deck' className='col-sm-11 col-md-5   landing-section landing-study mb-2 mr-2'>study deck</Link>
                <Link to='/struggle-deck' className='col-sm-11 col-md-5 landing-section landing-struggle mb-2 mr-2'>struggle deck</Link>
                <Link to='/dojo-landing' className='col-sm-11 col-md-5  landing-section landing-dojo mb-2 mr-2'>vocab dojo</Link>
            </div>
        </div>
          </>
}