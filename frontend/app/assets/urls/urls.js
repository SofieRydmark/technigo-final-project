import { BASE_URL} from '@env';

// User and admin
export const SIGN_IN_URL = `${BASE_URL}/signIn`
export const SIGN_UP_URL = `${BASE_URL}/signUp`
export const RESET_URL = `${BASE_URL}/forgotPassword`
export const ADMIN_DELETE_URL = (userId) => `${BASE_URL}/${userId}/admin/delete`
export const ADMIN_PASSWORD_URL = (userId) => `${BASE_URL}/${userId}/admin/change`

// Projectboard
export const PROJECTS_URL = (userId) => `${BASE_URL}/${userId}/project-board/projects`
export const PROJECTS_ADD_URL = (userId) =>
  `${BASE_URL}/${userId}/project-board/projects/addProject`

// Single projects
export const ONEPROJECT_URL = (userId, projectId) =>
  `${BASE_URL}/${userId}/project-board/projects/${projectId}`
export const ONEPROJECT_DELETE_URL = (userId, projectId) =>
  `${BASE_URL}/${userId}/project-board/projects/delete/${projectId}`
export const ONEPROJECT_CHANGE_URL = (userId, projectId) =>
  `${BASE_URL}/${userId}/project-board/projects/change/${projectId}`

// Single projects toggle complete
export const DRINK_COMPLETE_URL = (userId, projectId, drinksId) =>
  `${BASE_URL}/${userId}/project-board/projects/${projectId}/completed/drink/${drinksId}`
export const THEME_COMPLETE_URL = (userId, projectId, themeId) =>
  `${BASE_URL}/${userId}/project-board/projects/${projectId}/completed/theme/${themeId}`
export const FOOD_COMPLETE_URL = (userId, projectId, foodId) =>
  `${BASE_URL}/${userId}/project-board/projects/${projectId}/completed/food/${foodId}`
export const ACTIVITY_COMPLETE_URL = (userId, projectId, activityId) =>
  `${BASE_URL}/${userId}/project-board/projects/${projectId}/completed/activity/${activityId}`
export const DECOR_COMPLETE_URL = (userId, projectId, decorationId) =>
  `${BASE_URL}/${userId}/project-board/projects/${projectId}/completed/decoration/${decorationId}`

// Single projects delete
export const DRINK_DELETE_URL = (userId, projectId, drinksId) =>
  `${BASE_URL}/${userId}/project-board/projects/${projectId}/deleteDrink/${drinksId}`
export const THEME_DELETE_URL = (userId, projectId, themeId) =>
  `${BASE_URL}/${userId}/project-board/projects/${projectId}/deleteTheme/${themeId}`
export const FOOD_DELETE_URL = (userId, projectId, foodId) =>
  `${BASE_URL}/${userId}/project-board/projects/${projectId}/deleteFood/${foodId}`
export const ACTIVITY_DELETE_URL = (userId, projectId, activityId) =>
  `${BASE_URL}/${userId}/project-board/projects/${projectId}/deleteActivity/${activityId}`
export const DECOR_DELETE_URL = (userId, projectId, decorationId) =>
  `${BASE_URL}/${userId}/project-board/projects/${projectId}/deleteDecoration/${decorationId}`

// Add category
export const ACTIVITY_ADD_URL = (userId, projectId) =>
  `${BASE_URL}/${userId}/project-board/projects/addActivity/${projectId}`
export const DRINK_ADD_URL = (userId, projectId) =>
  `${BASE_URL}/${userId}/project-board/projects/addDrinks/${projectId}`
export const FOOD_ADD_URL = (userId, projectId) =>
  `${BASE_URL}/${userId}/project-board/projects/addFood/${projectId}`
export const THEME_ADD_URL = (userId, projectId) =>
  `${BASE_URL}/${userId}/project-board/projects/addTheme/${projectId}`
export const DECOR_ADD_URL = (userId, projectId) =>
  `${BASE_URL}/${userId}/project-board/projects/addDecoration/${projectId}`

// Budget
export const ADD_BUDGET_URL = (userId, projectId) =>
  `${BASE_URL}/${userId}/project-board/projects/${projectId}/addItem`

export const DELETE_BUDGET_OBJECT_URL = (userId, projectId, itemId) =>
  `${BASE_URL}/${userId}/project-board/projects/${projectId}/deleteItem/${itemId}`
