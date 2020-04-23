import React, { Component, Fragment } from 'react';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {connect} from 'react-redux';
import {getScream} from '../../redux/actions/dataActions';

import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import MyButton from '../../util/MyButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from  '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
import {postScream,clearErrors} from '../../redux/actions/dataActions';
import { TextField, Button, Divider } from '@material-ui/core';
import LikeButton from './LikeButton';
import CommentForm from './CommentForm'
import Comments from './Comments';


const styles =(theme)=> ({
    ...theme.spreadThis,

    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
      },
      dialogContent: {
        padding: 20
      },
      closeButton: {
        position: 'absolute',
        left: '90%'
      },
      expandButton: {
        position: 'absolute',
        left: '90%'
      },
      spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
      }
    
})

class ScreamDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
           open:false
        };  
    }

    handleOpen =()=>{
        this.setState({open:true});
        this.props.getScream(this.props.screamId);
    }
    handleClose =()=>{
        this.props.clearErrors();
        this.setState({open:false});
    }



    render() {
    
        const {classes,scream:{screamId,body,createdAt,likeCount,commentCount,userImage,userHandle,comments}, UI:{loading},likes,commentsCount}= this.props;

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2}/>

            </div>
        ) : (
         
            <Grid container spacing={16}>
        <Grid item sm={5}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">{body}</Typography>

          <LikeButton  screamId={screamId} />

          <span>{likes} likes</span>
          <MyButton tip='comments'>
            <ChatIcon color='primary' />
          </MyButton>
          <span>{commentsCount} comments</span>
        </Grid>
        <hr className={classes.visibleSeparator} />

          <CommentForm screamId={screamId}/>

        <Comments comments={comments}/>
       
      </Grid>
        );

        return (


            <Fragment>
                <MyButton onClick={this.handleOpen} tip='Expand Scream' tipClassName={classes.expandButton}>
                    <UnfoldMore color='primary'/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>
                <MyButton tip='close' onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>
                    <DialogContent className={classes.DialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

ScreamDialog.propTypes = {
    clearErrors: PropTypes.func.isRequired,
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle:PropTypes.string.isRequired,
    scream:PropTypes.object.isRequired,
    UI:PropTypes.object.isRequired,
    likes:PropTypes.number.isRequired,
    commentsCount:PropTypes.number.isRequired
    
    
  };

  const mapStateToProps = (state)=>({
    scream:state.data.scream,
    UI:state.UI,
    likes:state.data.scream.likeCount,
    commentsCount:state.data.scream.commentCount
  });
  const mapActionsToProps = {
      getScream,
      clearErrors
  };

  export default connect(mapStateToProps,mapActionsToProps) (withStyles(styles)(ScreamDialog));
 