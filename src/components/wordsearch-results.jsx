import React from 'react';

export default function WordSearchResults(props){
    const loading = props.props.loading;
    const notFound = props.props.notFound;
    const notFoundDisplay = props.props.notFoundDisplay;
    const searchWordHeader = props.props.searchWordHeader;
    const display = props.props.display;
    
    const loadingDiv = <div className='loading-div'>
                             <h1 className='loading-text-one'>Your AI Logophile is gathering your word data</h1>
                             <h3 className='loading-text-two '>Thank You for your patience.</h3>
                         </div>
                         
  
 
    
    return <> 
            <div className='col-6 search-results-section'>
                    {loading && loadingDiv}
                    {notFound === true ? notFoundDisplay :
                            <div>
                                 {loading ? null : searchWordHeader}
                                 {display}
                            </div>}
            </div>
    
    
        </>
}
