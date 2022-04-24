import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import ApplyLeave from './pages/ApplyLeave'
import './App.css'
import CreateProfile from './pages/CreateProfile'
import PrivateRoute from './components/PrivateRoute'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode'
import { signOutUser } from './redux/authSlice'
const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  
  typography: {
    fontFamily: "Quicksand",
    h3: {
      fontFamily: "Syne"
    },
    h6: {
      fontFamily: "Syne"
    }
  },
  palette: {
    danger: createColor('#F40B27'),
    success: createColor('#5DBA40'),
  },
  
  
})


function App() {

  
const dispatch = useDispatch()
  
const {publicKey, jwt_token, isLoggedIn} = useSelector((state) => state.auth)
//check auth token
if(jwt_token){
  
  //decode token and get user info
  const decoded = jwt_decode(jwt_token)
  console.log({decoded})

  const currentTime = Date.now() / 1000
  //check for expiration
  if(decoded.exp < currentTime){
   console.log('expired')
   dispatch(signOutUser())
   window.location.href= '/'
  } else {
    console.log('not expired')
  }

}

  return (
    <ThemeProvider theme={theme}>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route
              exact
              path="/create-profile"
              element={
                <PrivateRoute>
                  <CreateProfile />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/apply"
              element={
                <PrivateRoute>
                  <ApplyLeave />
                </PrivateRoute>
              }
            />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
