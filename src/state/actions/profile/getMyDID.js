import {
  store,
} from '../../store';

const getMyDID = () => async (dispatch) => {
  try {
    const did = await store.getState().myData.box.verified.DID();

    dispatch({
      type: 'MY_DID_UPDATE',
      did,
    });
  } catch (error) {
    console.error(error);
  }
};

export default getMyDID;