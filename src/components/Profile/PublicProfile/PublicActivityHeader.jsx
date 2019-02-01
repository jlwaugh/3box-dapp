import React from 'react';
import PropTypes from 'prop-types';

import networkArray from '../../../utils/networkArray';
import '../../styles/Feed.css';
import '../../../views/styles/Profile.css';
import '../../styles/NetworkArray.css';

const PublicActivityContext = ({
  feedAddress,
}) => (
    <div className="feed__activity__context">
      {console.log(feedAddress)}
      {(feedAddress.metaData && feedAddress.metaData.image)
        ? <img src={`https://ipfs.infura.io/ipfs/${feedAddress.metaData.image}`} className="feed__activity__user clear" alt="profile" />
        : (feedAddress.metaData && feedAddress.metaData.contractImg)
          ? <img src={feedAddress.metaData.contractImg.src} className="feed__activity__user clear" alt="profile" />
          : (
            <div className={`feed__activity__context__network ${networkArray[Math.floor(Math.random() * networkArray.length)]}`}>
              0x
            </div>)}
      <React.Fragment>
        {(feedAddress.metaData && feedAddress.metaData.name)
          && (
            <div>
              <a href={`https://3box.io/${Object.keys(feedAddress)[0]}`}>
                <h4>
                  {feedAddress.metaData.name}
                </h4>
              </a>
              <p className="feed__activity__address__type">
                Address
              </p>
            </div>
          )}
        {(feedAddress.metaData && feedAddress.metaData.contractDetails && feedAddress.metaData.contractDetails.name)
          && (
            <div>
              <a href={`https://etherscan.io/tx/${Object.keys(feedAddress)[0]}`} target="_blank" rel="noopener noreferrer">
                <h4>
                  {feedAddress.metaData.contractDetails.name}
                </h4>
              </a>
              <p className="feed__activity__address__type">
                Contract
              </p>
            </div>
          )}
        {(!feedAddress.metaData || (!feedAddress.metaData.contractDetails && !feedAddress.metaData.name))
          && (
            <div>
              <a href={`https://ethstats.io/account/${Object.keys(feedAddress)[0]}`} target="_blank" rel="noopener noreferrer">
                <h4>
                  {Object.keys(feedAddress)[0]}
                </h4>
              </a>
              <p className="feed__activity__address__type">
                Address
              </p>
            </div>
          )}
      </React.Fragment>
    </div>
  );

PublicActivityContext.propTypes = {
  feedAddress: PropTypes.object,
};

PublicActivityContext.defaultProps = {
  feedAddress: {},
};

export default PublicActivityContext;
