import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import Scream from '../componenets/scream/Scream';
import Profile from '../componenets/profile/Profile';

import PropTypes  from 'prop-types';
import {connect} from  'react-redux';
import {getScreams} from '../redux/actions/dataActions';


export class home extends Component {
 



    componentDidMount(){
      console.log('i am being called from HOME MOUNT!');
      this.props.getScreams();
    }

  render() {
    const {screams,loading} = this.props.data;

      let recentScreamsMarkup = !loading && screams!==null ? 
  (screams.map(scream => <Scream key={scream.screamId} scream={scream}/>)) : (<p>Loading...</p>);


    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
         <Profile/>
        </Grid>
      </Grid>
    );
  }
}


home.propTypes = {
  getScreams:PropTypes.func.isRequired,
  data:PropTypes.object.isRequired
};

const mapStateToProps = (state) =>({
  data:state.data
});




export default connect(mapStateToProps,{getScreams})(home);
