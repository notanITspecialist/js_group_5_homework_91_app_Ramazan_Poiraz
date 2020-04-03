import React from 'react';
import { Navbar, Nav} from 'reactstrap';
import Container from "reactstrap/lib/Container";
import UserBar from "./UserBar";
import AnonimusBar from "./AnonimusBar";
import {useSelector} from "react-redux";

const NavBar = () => {
    const user = useSelector(state => state.authorization.user);

    return (
        <div>
            <Navbar color="light" light expand="md">
                <Container>
                    <Nav>
                        {user.token ? (
                            <UserBar/>
                        ) : (
                            <AnonimusBar/>
                        )}
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavBar;