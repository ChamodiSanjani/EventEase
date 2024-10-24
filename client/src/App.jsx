import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Home from './Components/Home'
import Events from './Components/Events'
import Category from './Components/Category'
import Profile from './Components/Profile'
import AddCategory from './Components/AddCategory'
import AddEvents from './Components/AddEvents'
import EditEvents from './Components/EditEvents'
import Start from './Components/Start'
import UserLogin from './Components/UserLogin'
import EventDetails from './Components/EventDetails'
import PrivateRoute from './Components/PrivateRoute'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Start />}></Route>
      <Route path='/adminlogin' element={<Login />}></Route>
      <Route path='/user_login' element={<UserLogin />}></Route>
      <Route path='/events_details/:id' element={<EventDetails />}></Route>
      <Route path='/dashboard' element={
        <PrivateRoute >
          <Dashboard />
        </PrivateRoute>
      }>
        <Route path='' element={<Home />}></Route>
        <Route path='/dashboard/events' element={<Events />}></Route>
        <Route path='/dashboard/category' element={<Category />}></Route>
        <Route path='/dashboard/profile' element={<Profile />}></Route>
        <Route path='/dashboard/add_category' element={<AddCategory />}></Route>
        <Route path='/dashboard/add_event' element={<AddEvents />}></Route>
        <Route path='/dashboard/edit_events/:id' element={<EditEvents />}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App