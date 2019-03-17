import React from 'react';
// import {Link} from 'react-router-dom';
import './footer-bar.css';

export default function FooterBar (){
    return (
        <footer className="bg-blk bd" role="contentinfo">
            <div className="ft-div">
                <div className="ft">

                    <div>
                        <a target="_blank" href="https://www.linkedin.com/in/myanthony">
                            <img className="ft-spc" src="/img/icon_linkedin.png" alt="linkedin icon" />
                        </a>
                        <a target="_blank" href="https://www.facebook.com/myanthony">
                            <img className="ft-spc" src="/img/icon_facebook.png" alt="facebook icon" />
                        </a>
                        <a target="_blank" href="https://twitter.com/anthony_usa">
                            <img className="ft-spc" src="/img/icon_twitter.png" alt="twitter icon" />
                        </a>
                        <a target="_blank" href="mailto:anthony011@gmail.com">
                            <img className="ft-spc" src="/img/icon_mail.png" alt="twitter icon" />
                        </a>
                    </div>
                    <div className="al-r"><span className="ft-ltr-spc">215-347-0245</span><br />
                    PHILADELPHIA, PA
                    </div>
                </div>
            </div>
        </footer>
    );
    
}

