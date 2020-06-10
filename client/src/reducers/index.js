import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import ui from './ui';

export default combineReducers({ auth, alert, ui });
