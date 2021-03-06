import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ActivityHeader from './ActivityHeader';
import ActivityTiles from './ActivityTiles';
import Loading from '../../../assets/Loading.svg';
import '../styles/Feed.css';
import '../styles/Profile.css';
import '../../../components/styles/NetworkArray.css';

const Activity = ({
  isFetchingActivity,
  feedByAddress,
  otherProfileActivity,
  isActive,
}) => (
    <div id="myFeed" className={`profileTab ${isActive ? 'viewTab' : ''}`}>
      <div>
        <p className="header" id="feed__header">
          Activity
        </p>

        <div className="feed__activity__header">
          {(feedByAddress.length > 0)
            ? feedByAddress.map((feedAddress, i) => (
              <div key={i} className="feed__activity__tile">
                <ActivityHeader feedAddress={feedAddress} />
                <ActivityTiles feedAddress={feedAddress} />
              </div>
            ))
            : (!isFetchingActivity && !otherProfileActivity.length)
            && (
              <div className="feed_activity_empty">
                <p className="feed_activity_empty_text">
                  No activity at this address yet
                </p>
              </div>
            )}

          {(!feedByAddress.length && isFetchingActivity) && (
            <div className="feed_activity_empty">
              <img src={Loading} alt="loading" id="activityLoad" />
            </div>
          )}
        </div>
      </div>
      <div className="feed__footer">
        <div className="logo__icon--footer">
          <h2>3</h2>
        </div>
      </div>
    </div>
  );

Activity.propTypes = {
  feedByAddress: PropTypes.array,
  isFetchingActivity: PropTypes.bool,
  isActive: PropTypes.bool,
  otherProfileActivity: PropTypes.array,
};

Activity.defaultProps = {
  feedByAddress: [],
  isFetchingActivity: false,
  isActive: false,
  otherProfileActivity: [],
};

const mapState = (state) => ({
  feedByAddress: state.myData.feedByAddress,
  isFetchingActivity: state.uiState.isFetchingActivity,
  otherProfileActivity: state.otherProfile.otherProfileActivity,
  currentAddress: state.userState.currentAddress,

  otherProfileAddress: state.otherProfile.otherProfileAddress,
  name: state.myData.name,
  otherName: state.otherProfile.otherName,
});

export default connect(mapState)(Activity);
