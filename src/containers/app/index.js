import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import { Container, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  root: {
    padding: '30px',
  },
});

const App = (props) => (
  <Container className={props.classes.root}>
    <header>
      <Link to="/"><span style={{marginRight:30}}>Gridster</span></Link>
      <Link to="/about-us">About App</Link>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
    </main>
  </Container>
)

export default withStyles(styles, { withtheme: true })(App);

