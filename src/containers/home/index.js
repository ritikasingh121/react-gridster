import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { Button, TextField, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import {appName} from '../../actions'
import {Responsive, WidthProvider} from 'react-grid-layout';
import _ from "lodash";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
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
  AlignForm: {
    marginTop:27
  },
  Node: {
    backgroundColor: '#CCCCCC',
    border:'2px solid #4a424236',
    textAlign: 'center'
  },
  layout: {
    background: '#EEEEEE'
  },
  Button: {
    '&:hover': {
      background: '#2196F3'
    }
  },
  BtnSelected : { 
    background: '#303F9F'
  },
  BtnDefault: {
    background: '#005999'
  },
  isSelectedCell: {
    background: '#ffffff'
  },
  isShortestPathCell: {
    background: '##EAB806'
  },
  isStart: {
    background: '#A4DE02'
  },
  isEnd: {
    background: '#1E5631'
  }
});

class Home extends Component<Props, State> {  

  static defaultProps = {
    
  };
  
  constructor(props: Props) {
    super(props);
    this.state = {
      items: [],
      newCounter: 0,
      colNum: 0,
      rowNum: 0,
      isGenerated: false,
      breakpoint:'',
      shortestPathAchieved: false
    };
  }

  componentDidMount() {
    this.props.setAppName();
    debugger;
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange = (breakpoint, cols) => {
    //on break point chnage
  }

  onLayoutChange = (layout) => {
   //On layout change
  }

  //update row and col
  handleChange = (e) => {
    let field = e.target.name;
    let value = e.target.value;
    if(parseInt(value) > 20){
      alert('Maximum value can be 20 only');
      return;
    }
    this.setState({[field]: value});
  }

  //Handle cell click
  handleCellClick= (i) => {
      let items = [...this.state.items];
      items[i].isClicked = true;
      debugger;
      this.setState({items});
  }

  //Serve default 
  getDefaultCellConfig = () => {
    return {i:'0', x: 0, y: 0, w: 1, h: 1, isClicked: false, isShortestPathCell: false, start:false, end:false};
  }

  //Generate grid cell
  generateGrid = () => { 
    const { colNum, rowNum, isGenerated } = this.state;
    let items = [];
    if(!colNum || !rowNum) return; 
    if(isGenerated){
      alert('Please reset the gridster..')
      return
    }
    //Note:- rowNum == y && colNum == x
    //Random start and end index
    let randomStartIndex = Math.floor(Math.random() * (rowNum-1));
    let randomEndIndex = Math.floor(Math.random() * (rowNum-1));
    for(let i = 0; i<rowNum; i++){
      for(let j = 0; j<rowNum; j++){
        // get default object of a cell
        let defaultCellConfig = this.getDefaultCellConfig();
        defaultCellConfig.i = i.toString();
        defaultCellConfig.x = i;
        defaultCellConfig.y = j;
       //select random start and end cell based on condition
        if(i==0 && randomStartIndex == defaultCellConfig.y){
          defaultCellConfig.start = true;
        }
        if(j==rowNum-1 && randomEndIndex == defaultCellConfig.x){
          defaultCellConfig.end = true;
        }
        //Push each cell into array
        items.push(defaultCellConfig);
      }
    }
    //Set cordinates of each cell
    this.setState({items, isGenerated: true});
  }

  render() {

      const { classes } = this.props;
      const { colNum, rowNum, isGenerated, shortestPathAchieved } = this.state;
      let xCell = rowNum ? rowNum : 1;
      return (
        <div>
          <h1  className={classes.root}>{this.props.appName}</h1>
          <div>
            <Grid container alignItems='center' spacing={3}>
              <Grid xs={2}>
                <TextField
                    error={rowNum ? false: true}
                    type='number'
                    label='Rows'
                    placeholder='Number of rows'
                    required
                    name="rowNum"
                    value={rowNum}
                    onChange={e => this.handleChange(e)}
                    margin="normal"
                    disabled={isGenerated}
                  />
              </Grid>
              <Grid className={classes.AlignForm} xs={1}>
               <span>X</span>
              </Grid>
              <Grid xs={2}>
                <TextField
                    error={colNum ? false: true}
                    type='number'
                    label='Colmuns'
                    placeholder='Number of columns'
                    required
                    name="colNum"
                    value={colNum}
                    onChange={e => this.handleChange(e)}
                    margin="normal"
                    disabled={isGenerated}
                  />
              </Grid>
              <Grid className={classes.AlignForm}  xs={3}>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={this.generateGrid}
                  className={classNames(classes.Button, isGenerated ? classes.BtnSelected : classes.BtnDefault)}
                >
                 Generate Gridster
                </Button>
              </Grid>
              <Grid className={classes.AlignForm}  xs={3}>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={e=>window.location.reload()}
                  disabled={!isGenerated}
                >
                  Reset Gridster                
                </Button>
              </Grid>
             { isGenerated && <Grid item xs={12}>
                <ResponsiveReactGridLayout
                    onLayoutChange={this.onLayoutChange}
                    onBreakpointChange={this.onBreakpointChange}
                    // {...this.props}
                    style= {{ background: '#EEEEEE'}}
                    cols= {{lg: xCell, md: xCell, sm: xCell, xs: xCell, xxs: xCell}}
                    isDraggable={false}
                    isRearrangeable={false}
                    isResizable={false}
                    margin={[0,0]}
                    rowHeight={82}
                    className="layout"
                    breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                    compactType={'horizontal'}
                    padding={10}
                    containerPadding={[10,10]}
                  >
                    {_.map(this.state.items, (item, i) => 
                      <div 
                        onClick={e=> (item.start || item.end)? '' : this.handleCellClick(i)} 
                        className={ 
                          classNames(
                            classes.Node, 
                            shortestPathAchieved && item.isShortestPathCell ? classes.isShortestPathCell 
                            : (item.start || item.end) ? item.start ? classes.isStart : classes.isEnd : item.isClicked ? classes.isSelectedCell : ''
                          )
                        }  
                        key={i} data-grid={item}
                      >
                        <span className="text">{`${item.start? 'Start':item.end? 'End':''} Cell  ${item.i} (${item.x} ${item.y})`}</span>
                      </div>
                      )}
                </ResponsiveReactGridLayout>
              </Grid>}
            </Grid>
          </div>
        </div>
      )
  }
 
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ gridster }) => ({
  appName: gridster.appName
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setAppName: appName,
      changePage: () => push('/about-us'),
      refresh: () => push('/')
    },
    dispatch
  )

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Home));

