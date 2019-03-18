import React from 'react';
import './error-sec.css';


export default function LoadingSec (props) {
    return (
        <div className='bg-peach bd'>

        <div className="hr-line"></div>
            <div className="row mgt-6">
                <div className="loading-sec">
                    <div>
                        <img src="/img/loading-6.gif" alt="loading" />
                    </div>
                    <div className="loading-h2">
                        Loading...
                    </div>
                </div>
                <div className="mgb-20">&nbsp; </div>

            </div>
        </div>
    )
}

