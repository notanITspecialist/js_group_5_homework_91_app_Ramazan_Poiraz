import React from 'react';
import {Route, Switch} from "react-router";
import NavBar from "./components/NavBar/NavBar";
import Container from "reactstrap/lib/Container";
import Registration from "./components/registration/registration";
import Login from "./components/Login/login";
import Chat from "./components/Chat/Chat";

function App() {
  return (
      <div>
          <NavBar/>
        <Container>
            <Switch>
                <Route path="/chat" exact component={Chat}/>
                <Route path="/registration" exact component={Registration}/>
                <Route path="/login" exact component={Login}/>
            </Switch>
        </Container>
      </div>
  );
}

export default App;
