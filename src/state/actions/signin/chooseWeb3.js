import Box from '3box';
import Web3Connect from 'web3connect';

import {
  store,
} from '../../store';
import * as routes from '../../../utils/routes';
import history from '../../../utils/history';
import accountsPromise from './accountsPromise';

const chooseWeb3 = directLogin => async (dispatch) => {
  let accounts = [];

  if (directLogin) {
    dispatch({
      type: 'UI_HANDLE_PICK_PROVIDER_SCREEN',
      showPickProviderScreen: true,
    });
  }

  const web3Connect = new Web3Connect.Core({
    providerOptions: {
      portis: {
        id: '8f5cf962-ad62-4861-ab0c-7b234b6e6cff', // required
        network: 'mainnet', // optional
      },
      fortmatic: {
        key: 'pk_live_EC842EEAC7F08995', // required
        network: 'mainnet', // optional
      },
    },
  });

  // subscibe to connect
  const web3Promise = new Promise((resolve, reject) => {
    web3Connect.on('connect', async (provider) => {
      try {
        const {
          getProviderInfo,
        } = Web3Connect;
        const {
          name,
        } = getProviderInfo(provider);
        const prevWeb3Provider = window.localStorage.getItem('web3Provider'); // eslint-disable-line no-undef
        window.localStorage.setItem('web3Provider', name); // eslint-disable-line no-undef
        if (prevWeb3Provider !== name) {
          window.localStorage.setItem('userEthAddress', undefined);
        }
        // set provider to localstorage
        // if provider now does not equal previous provider, reset web3 details
        const web3 = new Web3(provider); // eslint-disable-line no-undef
        // if no provider throw error
        window.web3 = web3;

        dispatch({
          type: 'UI_HANDLE_ACCESS_MODAL',
          allowAccessModal: true,
          directLogin,
        });
        accounts = await web3.currentProvider.enable(); // eslint-disable-line no-undef
        accounts = !accounts ? await accountsPromise : accounts;
        window.localStorage.setItem('userEthAddress', accounts[0]);

        dispatch({
          type: 'USER_ADDRESSES_UPDATE',
          isSignedIntoWallet: accounts && (accounts.length > 0 || store.getState().userState.currentWallet === 'isToshi'),
          isLoggedIn: accounts && Box.isLoggedIn(accounts[0]), // eslint-disable-line no-undef
          accountAddress: accounts[0],
          currentAddress: accounts[0],
        });
        dispatch({
          type: 'UI_HANDLE_ACCESS_MODAL',
          allowAccessModal: false,
          directLogin,
        });

        if (directLogin) {
          dispatch({
            type: 'UI_HANDLE_PICK_PROVIDER_SCREEN',
            showPickProviderScreen: false,
          });
        }

        resolve();
      } catch (error) {
        console.error(error);
        history.push(routes.LANDING);
        dispatch({
          type: 'UI_HANDLE_DENIED_ACCESS_MODAL',
          accessDeniedModal: true,
          allowAccessModal: false,
          isSignedIntoWallet: accounts && (accounts.length > 0 || store.getState().userState.currentWallet === 'isToshi'),
        });
        if (directLogin) {
          dispatch({
            type: 'UI_HANDLE_PICK_PROVIDER_SCREEN',
            showPickProviderScreen: false,
          });
        }
        reject();
      }
    });
  });

  // subscibe to close
  web3Connect.on('close', () => {
    if (directLogin) web3Connect.toggleModal(); // open modal on button click
  });

  web3Connect.toggleModal(); // open modal on button click

  try {
    await web3Promise;
  } catch (error) {
    console.log(error);
  }
};

export default chooseWeb3;