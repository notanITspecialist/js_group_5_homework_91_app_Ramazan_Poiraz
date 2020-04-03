import React from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, NavItem, NavLink, UncontrolledDropdown} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {NavLink as ToLink} from "react-router-dom";
import {logoutUser} from "../../actions/user";

const UserBar = () => {
    const userName = useSelector(state => state.authorization.user.username);

    const dispatch = useDispatch();

    return (
        <>
            <NavItem>
                <NavLink className='font-weight-bold' tag={ToLink} to='/chat' >CHAT</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    Hello, {userName}!
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem onClick={() => dispatch(logoutUser())} >
                        Logout
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </>
    );
};

export default UserBar;