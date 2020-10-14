import { CommonActionType } from 'redux/actionType';
import { commonApi } from 'services/apiVariables';
import { addQuery } from 'services/helperFunctions';
import { history } from 'helpers';


export const getCommonAPIPOST = (body) => (dispatch, getState, { api, Toast }) => {

  return new Promise((resolve, reject) => {

    api({ ...commonApi.getCommonAPIPOST, body }).then(({ status, message, data }) => {

      if (status == 'success') {
        resolve(Toast({ type: "success", message: message }))
        dispatch({ type: CommonActionType.getCommonAPIPOST, payload: data })
      }

    }).catch(({ message }) => {
      let content = message ? message : 'Sorry, we are unable to process your request at this point. Please try again later.'
      reject(Toast({ type: "error", message: content }))
    })

  })
}

export const getCommonAPIGET = (query) => (dispatch, getState, { api, Toast }) => {

  return new Promise((resolve, reject) => {

    addQuery(query, commonApi.getCommonAPIGET);

    api(commonApi.getCommonAPIGET).then(({ status, message, data }) => {

      if (status == 'success') {
        resolve(Toast({ type: "success", message: message }))
        dispatch({ type: CommonActionType.getCommonAPIGET, payload: data })
      }

    }).catch(({ message }) => {
      let content = message ? message : 'Sorry, we are unable to process your request at this point. Please try again later.'
      reject(Toast({ type: "error", message: content }))
    });

  });
};