import { combineReducers } from 'redux';
 
import 
    {   
        CHANGE_THEM_BACKGROUND,
        INSERT_CATEGORY_DATA, 
        INSERT_NETWORK_STATE, 
        UPDATE_BOOKMARK_IDS, 
        GET_SECTION_DATA,
        SET_NOTIFICATION_PERMISSION 
    }   from "../action/index" //Import the actions types constant we defined in our actions

const initialState = {
  themState: true,
  categoryData: [],
  netState: false,
  bookmark: [],
  sections: [],
  permission: '1'
}
 
const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_THEM_BACKGROUND:
            return {
                      ...state,
                      themState: action.themState,
                  };
        case INSERT_CATEGORY_DATA:
        return {
                    ...state,
                    categoryData: action.categoryData,
                };
        case INSERT_NETWORK_STATE:
            return {
                        ...state,
                        netState: action.netState,
                    };
        case UPDATE_BOOKMARK_IDS:
            return {
                        ...state,
                        bookmark: action.bookmark,
                    };
        case GET_SECTION_DATA:
            return {
                        ...state,
                        sections: action.sections,
                    };
        case SET_NOTIFICATION_PERMISSION:
            return {
                        ...state,
                        permission: action.permission,
                    };
        default:
            return state;
    }
};
const rootReducer = combineReducers({
    dataReducer
})
 
export default rootReducer;