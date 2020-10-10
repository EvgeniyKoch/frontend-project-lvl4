import { combineReducers } from '@reduxjs/toolkit';

import modal, { actions as modalActions } from './modal';
import toast, { actions as toastActions } from './toast';
import messagesData, { actions as messagesActions } from './messages';
import channelsData, { actions as channelsActions } from './channels';

const actions = {
  ...modalActions,
  ...messagesActions,
  ...channelsActions,
  ...toastActions,
};

export { actions };
export default combineReducers({
  modal,
  toast,
  messagesData,
  channelsData,
});
