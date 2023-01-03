// navigator stack
import { RootStack } from './app/navigators/RootStack'

// provider and reducer
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import user from './app/reducers/user'
const reducer = combineReducers({
  user: user.reducer,
})

const store = configureStore({ reducer })

const App = () => {
  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  )
}

export default App
