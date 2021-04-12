import React from 'react'
import Home from './core/Home'
import {BrowserRouter,Route, Switch} from 'react-router-dom'
import Signin from './patient/Signin'
import Signup from './patient/Signup'
import Menu from './core/Menu'
import NurseDashboard  from './nurse/NurseDashboard'
import CreateSigns from './nurse/CreateSigns'
import DisplaySigns from './nurse/DisplaySigns'
import DisplayUsers from './nurse/DisplayUsers'
import  NurseRoutes from './auth/NurseRoutes'
import PrivateRoutes from './auth/PrivateRoutes'
import UserDashboard from './patient/UserDashboard'
import {isAuthenticated} from './auth/index'
import  CreateAlert from './patient/CreateAlert'
import DisplayAlerts from './nurse/DisplayAlerts'
import UpdateProfile from './patient/UpdateProfile'


const MainRouter = () => {

    return ( 

        <div>
              <BrowserRouter>
            <Menu/>
         
            <Switch>
                
            <Route path='/' exact component={Home}/>
            <PrivateRoutes path='/addsings' exact component={CreateSigns}/>
            <PrivateRoutes path='/createalert' exact component={CreateAlert}/>
            <PrivateRoutes path='/update/:userId' exact component={UpdateProfile}/>
            <NurseRoutes path='/displayalerts' exact component={DisplayAlerts}/>
            <Route path='/signin' exact component={Signin}/>
            <Route path='/signup' exact component={Signup}/>
            <NurseRoutes path='/nurse/dashboard' exact component={NurseDashboard}/>
            <PrivateRoutes path='/user/dashboard' exact component={UserDashboard}/>
            <NurseRoutes path='/displaysigns' exact component={DisplaySigns}/>
            <NurseRoutes path='/allusers' exact component={DisplayUsers}/>
           
            </Switch>
            </BrowserRouter>
        </div>
     );
}
 
export default MainRouter;