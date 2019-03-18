import React from 'react';
import {shallow} from 'enzyme';

import {SideSec} from '../schedule/side-sec';

describe('<SideSec/>', () => {
    const dispatch = jest.fn();

    it('Renders without crashing', () => {
        shallow(<SideSec dispatch={dispatch} />);
    });

});


