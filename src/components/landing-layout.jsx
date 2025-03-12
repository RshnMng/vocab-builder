import React from 'react';
import LandingFooter from './landing-footer';
import {Outlet} from 'react-router-dom';

export default function LandingLayout(){
    return <> 
            <Outlet />
            <LandingFooter />
          </>
}