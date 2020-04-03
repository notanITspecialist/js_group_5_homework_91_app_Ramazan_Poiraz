import React from 'react';
import {NavItem, NavLink} from "reactstrap";
import {NavLink as ToLink} from "react-router-dom";

const AnonimusBar = () => (
        <>
            <NavItem>
                <NavLink tag={ToLink} to='/registration' >registration</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={ToLink} to='/login' >login</NavLink>
            </NavItem>
        </>
    );

export default AnonimusBar;