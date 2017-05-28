import React from "react";
import Base from "./../../../client/src/components/Base";
import {MemoryRouter} from "react-router-dom";
import {shallow} from "enzyme";
import expect from "expect";


describe('>>>Base top navigation menu', () => {
  it('should render without exploding', () => {
    const wrapper = shallow(<MemoryRouter><Base /></MemoryRouter>);
    expect(wrapper.length).toEqual(1);
  });
});
