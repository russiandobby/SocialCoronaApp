import React, { Component,useState } from "react";
import Grid from "@material-ui/core/Grid";

import Scream from '../componenets/scream/Scream';
import Profile from '../componenets/profile/Profile';
import ScreamSkeleton from '../util/ScreamSkeleton';
import InfiniteScroll from "react-infinite-scroll-component";
import {selectDataScreams,selectDataLoading} from '../redux/data.selector';
import handleViewport from 'react-in-viewport';
import PropTypes  from 'prop-types';
import {connect} from  'react-redux';
import {getScreams,updateSliceData} from '../redux/actions/dataActions';


export class home extends Component {





    componentDidMount(){
      console.log('HomePage Mount!');
      this.props.getScreams();
      
    }


    fetchMoreData = () => {
      const {renderScreams,start,end} = this.props.data;
      const {screams} = this.props;


      console.log('FETCHING MORE DATA');
     
      
      let tempSliceData = renderScreams.concat(screams.slice(start, end));

      this.props.updateSliceData(tempSliceData);
      

      // this.setState({
      //   initData: tempSliceData,
      //   start: this.state.start + 7,
      //   end: this.state.end + 7,
      // });

      
    };
   




 

  render() {
    
    // const {screams,loading} = this.props.data;
    const {renderScreams} = this.props.data;
    const {screams,loading} = this.props;
    console.log(renderScreams);
  
   


//let recentScreamsMarkup = !loading && screams!==null ? 
    let recentScreamsMarkup = !loading && renderScreams!==null ? 
  (renderScreams.map(scream => <Scream key={scream.screamId} scream={scream}/>)) : (<ScreamSkeleton/>);


    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
        <InfiniteScroll
          dataLength={renderScreams.length}
          next={this.fetchMoreData}
          hasMore={true}
          scrollThreshold={1}
          
          loader={<h4>Loading...!</h4>}
        >

          {recentScreamsMarkup}

        </InfiniteScroll>
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

// const mapStateToProps = (state) =>({
//   data:state.data
// });

const mapStateToProps = (state) =>({
  data:state.data,
  
  screams:selectDataScreams(state),
  loading:selectDataLoading(state)
});







export default connect(mapStateToProps,{getScreams,updateSliceData})(home);
