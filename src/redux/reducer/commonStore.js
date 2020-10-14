import { CommonActionType } from 'redux/actionType';

const initialState = {
  getAPIResponse: {},
};

export default (state = Object.assign({}, initialState), { type, payload }) => {
  switch (type) {
    case CommonActionType.getAPIResponse:
      return {
        ...state,
        APIResponse: payload,
      };
    default:
      return state;
  }
};
