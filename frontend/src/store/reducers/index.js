import {combineReducers} from 'redux'
import currentUser from './currentuser';
import houses from './houses';
import currentStatus from './currentStatus';


const reducer = combineReducers({
    currentUser,
    houses,
    currentStatus,
});

export default reducer;
