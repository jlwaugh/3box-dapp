import React from 'react';
import { Helmet } from 'react-helmet';

import { shortenEthAddr } from '../../../utils/funcs';

const MyProfileHeaders = ({
  image,
  name,
  currentAddress,
}) => (
    <Helmet>
      <title>{name ? `${name} on 3Box` : '3Box | Ethereum Profiles'}</title>
      <meta name="description" content={`Profile for ${shortenEthAddr(currentAddress)}`} />

      <meta property="og:description" content={`Profile for ${shortenEthAddr(currentAddress)}`} />
      <meta property="og:url" content={`https://3box.io/${currentAddress}`} />
      <meta property="og:title" content={name ? `${name} on 3Box` : '3Box | Ethereum Profiles'} />
      <meta property="og:image" content={`${(image && image[0] && image[0].contentUrl) ? `https://ipfs.infura.io/ipfs/${image[0].contentUrl['/']}` : 'https://i.imgur.com/RXJO8FD.png'}`} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@3boxdb" />
      <meta name="twitter:title" content={name ? `${name} on 3Box` : '3Box | Ethereum Profiles'} />
      <meta name="twitter:description" content={`3Box Profile for ${currentAddress}`} />
      <meta property="twitter:image" content={`${(image && image[0] && image[0].contentUrl) ? `https://ipfs.infura.io/ipfs/${image[0].contentUrl['/']}` : 'https://i.imgur.com/RXJO8FD.png'}`} />
    </Helmet>
  );

export default MyProfileHeaders;
