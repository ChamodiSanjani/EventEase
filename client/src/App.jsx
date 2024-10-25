import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Events from './Components/Events';
import Category from './Components/Category';
import Profile from './Components/Profile';
import AddCategory from './Components/AddCategory';
import AddEvents from './Components/AddEvents';
import EditEvents from './Components/EditEvents';
import Start from './Components/Start';
import UserLogin from './Components/UserLogin';
import EventDetails from './Components/EventDetails';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/adminlogin' element={<Login />} />
        <Route path='/user_login' element={<UserLogin />} />
        <Route path='/events_details/:id' element={<EventDetails />} />
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path='' element={<Home />} />
          <Route path='events' element={<Events />} />
          <Route path='category' element={<Category />} />
          <Route path='profile' element={<Profile />} />
          <Route path='add_category' element={<AddCategory />} />
          <Route path='add_event' element={<AddEvents />} />
          <Route path='edit_events/:id' element={<EditEvents />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
