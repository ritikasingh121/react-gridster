import React from 'react'
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  root: {
    background: 'linear-gradient(45deg, #42275a 30%, #734b6d 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

const About = (props) => (
  <div>
    <h1 className={props.classes.root}>About Page</h1>
    <p>
    This code sample is intended to give you a good idea of my technical skills in Front End Development and React / Redux and
to review your code style, structure and techniques.</p>

<h3>Requirements Gridster Project</h3>
<p>Please use the React and Redux JavaScript libraries to create a UI consisting of:</p>
<ul>
<li>An input labelled 'Rows' which only allows integers and max value is 20</li>
<li>An input labelled 'Column' which only allows integers and max value is 20</li>
<li>A button labelled ‘Generate’</li>
<li>An X by Y grid of squares each of which is large enough to be clicked with the mouse.</li>
</ul>
  </div>
)

export default withStyles(styles, { withTheme: true })(About);


