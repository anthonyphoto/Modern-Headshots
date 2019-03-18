import React from 'react';
import {shallow} from 'enzyme';

import IntroPage from '../info/intro-page';

describe('<IntroPage/>', () => {

    it('Renders without crashing', () => {
        shallow(<IntroPage />);
    });

});


