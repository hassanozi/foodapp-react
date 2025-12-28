import React, { useContext, useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logosidebar.png'
import { AuthContext } from '../../../Context/AuthContext';

export default function SideBar() {

  let {loginData} = useContext(AuthContext);
  let {logOut} = useContext(AuthContext);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <>
      <div className="sidebar-component">
          <Sidebar collapsed={isCollapsed}>
          <Menu>
            <div className='text-center py-4'>
              <img className='w-100' onClick={toggleCollapse} src={logo} alt="" />
            </div>
            
            <MenuItem component={<Link to="/dashboard" />} icon={<i className='fa fa-home'></i>}> Home </MenuItem>
            <MenuItem component={<Link to="/dashboard/recipes" />} icon={<i className='fa fa-bowl-food'></i>}> Recipes </MenuItem>
            
            {loginData?.userGroup != 'SystemUser' ? 
            <MenuItem component={<Link to="/dashboard/categories" />} icon={<i className='fa-sharp fa-solid fa-layer-group'></i>}> Categories 
            </MenuItem>:''
            }

            {loginData?.userGroup != 'SystemUser' ? 
            <MenuItem component={<Link to="/dashboard/users" />} icon={<i className='fa fa-users'></i>}> Users 
            </MenuItem> :''
            }

            {loginData?.userGroup == 'SystemUser' ? 
            <MenuItem component={<Link to="/dashboard/favs" />} icon={<i className='fa fa-heart'></i>}> Favorites 
            </MenuItem> :''
            }


            <MenuItem component={<Link to="/dashboard" />} icon={<i className='fa fa-key'></i>}> Change Password </MenuItem>
            <MenuItem onClick={logOut} icon={<i className='fa-solid fa-arrow-right-from-bracket'></i>}> Logout </MenuItem>
          </Menu>
        </Sidebar>
      </div>
      
    </>
  )
}
