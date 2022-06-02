
export const CHANGE_THEM_BACKGROUND   = 'CHANGE_THEM_BACKGROUND'
export const INSERT_CATEGORY_DATA     = 'INSERT_CATEGORY_DATA'
export const INSERT_NETWORK_STATE     = 'INSERT_NETWORK_STATE'
export const UPDATE_BOOKMARK_IDS      = 'UPDATE_BOOKMARK_IDS'
export const GET_SECTION_DATA         = 'GET_SECTION_DATA'
export const SET_NOTIFICATION_PERMISSION = 'SET_NOTIFICATION_PERMISSION'

export function changeStyle(themState) {
  return {
    type: CHANGE_THEM_BACKGROUND,
    themState: themState
  }
}

export function insertCategoryData(categoryData) {
  return {
    type: INSERT_CATEGORY_DATA,
    categoryData: categoryData
  }
}

export function networkState(netState) {
  return {
    type: INSERT_NETWORK_STATE,
    netState: netState
  }
}

export function updateBookMarkIds(bookmark) {
  return {
    type: UPDATE_BOOKMARK_IDS,
    bookmark: bookmark
  }
}

export function getSectionData(sections) {
  return {
    type: GET_SECTION_DATA,
    sections: sections
  }
}

export function setNotificationPermission(permission) {
  return {
    type: SET_NOTIFICATION_PERMISSION,
    permission: permission
  }
}