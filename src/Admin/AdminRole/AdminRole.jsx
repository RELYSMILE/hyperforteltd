import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar'
import PageTitle from '../../Components/Admin/PageTitle'
import './AdminRole.css'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../../firebase/config'
import Login from '../../Public/Login/Login'
import { doc, getDoc } from 'firebase/firestore'

const AdminRole = () => {
    const [pageTitle, setPageTitle] = useState('🔐 User Roles & Permissions')
    const [currentUser, setCurrentUser] = useState(null)
    const [isPageDimmed, setIsPageDimmed] = useState(false)

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'admin', user.uid));
        if (userDoc.exists()) {
          setCurrentUser(userDoc.data());
        } else {
          console.log('No such user data!');
        }
      } else {
        setCurrentUser(null); // user signed out
      }
});

    return () => unsubscribe();
  }, []);

    return <>
  {currentUser? <div className={isPageDimmed? 'admin-role-container page-dimmed' : 'admin-role-container'}>
    <NavBar setPageTitle = {setPageTitle} setIsPageDimmed = {setIsPageDimmed} />
    <div className='admin-role'>
        <PageTitle pageTitle = {pageTitle} />
        <div className='admin'>
            <div className='super-admin'>👑 Super Admin</div>
            <i className='info'>The Super Admin has full access and control over the entire system. This role includes:</i>
            <ol>
                <li>Managing all users (including other Admins)</li>
                <li>Creating and deleting Admins</li>
                <li>Resetting any user’s password</li>
                <li>Viewing and editing all system data</li>
                <li>Access to all settings and configurations</li>
                <li>Full monitoring privileges</li>
            </ol>
            <i className='info'>Super Admin is the highest-level role with unrestricted access.</i>


            <div className='super-admin admin-x'>🛠️ Admin</div>
            <i className='info'>Admins have limited control and responsibilities. This role includes:</i>
            <ol>
                <li>Adding and updating regular records (e.g., books)</li>
                <li>Viewing and editing all system data</li>
                <li>Access to some settings and configurations</li>
                <li>Full monitoring privileges</li>
            </ol>
            <i className='info'>Admins are responsible for day-to-day operations but with restrictions to protect system integrity.</i>
        </div>
    </div>
  </div>
  :
  <Login />}
  </>
}

export default AdminRole