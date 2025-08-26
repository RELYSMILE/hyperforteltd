import React, { useEffect, useState, useContext } from 'react'
import {auth, db}  from '../../firebase/config'
import { toast } from 'react-toastify';
import NavBar from '../NavBar'
import visibilityOff from '../../assets/icons/visibilityoff.png'
import lock from '../../assets/icons/lock.png'
import mail from '../../assets/icons/mail.png'
import piarrowfoward from '../../assets/icons/piarrowfoward.png'
import visibilityOn from '../../assets/icons/visibility.png'
import user from '../../assets/icons/user.png'
import shield from '../../assets/icons/shield.png'
import PageTitle from '../../Components/Admin/PageTitle'
import { AppContext } from '../Context/Context';
import './ManageAdmin.css'
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';
import { collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import Spinner from '../../Components/Spinner'

const ManageAdmin = () => {
    const {currentLightDarkMode} = useContext(AppContext)
    const[userCredential, setUserCredential] = useState({})
    const [passwordVisibility, setPasswordVisibility] = useState(true)
    const [pageTitle, setPageTitle] = useState('Admin Management')
    const [formPanel, setFormPanel] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [adminRole, setAdminRole] = useState([])
    const [admins, setAdmins] = useState([])
    const [adminDetail, setAdminDetail] = useState([])
    const [adminsUpdateComponent, setAdminsUpdateComponent] = useState(false)
    const [adminsPasswordResetComponent, setAdminsPasswordResetComponent] = useState(false)
    const [resetEmail, setResetEmail] = useState([])
    const [appearancesettingData, setAppearancesettingsData] = useState([])
    const [settingsTogglefetch, setSettingsToggleFetch] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    const [isPageDimmed, setIsPageDimmed] = useState(false)
    const [state, setState] = useState(false)

    const handleCloseForm = () => {
        setFormPanel(false)
    }
    const handleOpenForm = () => {
        setFormPanel(true)
    }
    const handleAdminCredentials = (e) => {
        setUserCredential({...userCredential, [e.target.name] : e.target.value})
    }
    const creatAdmin = async() => {
        setIsLoading(true)
        try{
            const admin = await createUserWithEmailAndPassword(auth, userCredential.email, userCredential.password)
            await setDoc(doc(db, 'admin', admin.user.uid ), {
                adminID: admin.user.uid,
                username: userCredential?.username,
                adminRole: adminRole,
                email: admin.user.email,
                createdAt: serverTimestamp()
            })
            toast.success('New admin has been created successfully.', {
                toastId: 1,
            })
        }catch(error){
                  if(error.message == "Cannot read properties of null (reading 'name')"){
                    toast.error('You did not select a profile image!', {
                        toastId: 'unique-toast-id'
                    })
                }
                  if(error.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
                    toast.error('Password should be at least 6 characters (weak-password).', {
                        toastId: 'unique-toast-id'
                    })
                }
                  if(error.message == 'Firebase: Error (auth/missing-password).'){
                    toast.error('Please Fill Password Field!', {
                        toastId: 'unique-toast-id'
                    })
                }
                  if(error.message == 'Firebase: Error (auth/missing-email).'){
                      toast.error('Please Fill Email Field!', {
                        toastId: 'unique-toast-id'
                    })
                }
                  if(error.message == 'Firebase: Error (auth/invalid-email).'){
                      toast.error('Invalid email adress!', {
                        toastId: 'unique-toast-id'
                    })
                }
                if(error.message == 'Firebase: Error (auth/email-already-in-use).'){
                  toast.error('This Email is already registered, Login instead', {
                        toastId: 'unique-toast-id'
                    })
                }
                if(error.message == 'Firebase: Error (auth/internal-error).'){
                  toast.error('Check your internet connection, (authenticaton/internal-error).', {
                        toastId: 'unique-toast-id'
                    });
                }
                if(error.message == 'Firebase: Error (auth/network-request-failed).'){
                    toast.error('It looks like you are not connected to internet', {
                        toastId: 'unique-toast-id'
                    })
                }
                if(error.message == 'Firebase: Error (auth/admin-restricted-operation).'){
                    toast.error('Restricted-operation, Filling the fields', {
                        toastId: 'unique-toast-id'
                    })
                }
              }finally{
                setIsLoading(false)
              }
    }
    const handleUpdateAdmin = async(adminID) => {
      const admin_ID = adminID
      if(admin_ID === adminID) {
        setAdminsUpdateComponent(true)
            try{
                const admin =  await getDoc(doc(db, 'admin', adminID))
                if(admin.exists()){
                setAdminDetail(admin.data())
            }
            }catch(error){
                console.log(error)
            }
      }else{
        setAdminsUpdateComponent(false)
      }
    }
    const handleResetPassword = async(adminID) => {
      const admin_ID = adminID
      if(admin_ID === adminID) {
        setAdminsPasswordResetComponent(true)
            try{
                const admin =  await getDoc(doc(db, 'admin', adminID))
                if(admin.exists()){
                setAdminDetail(admin.data())
            }
            }catch(error){
                console.log(error)
            }
      }else{
        setAdminsPasswordResetComponent(false)
      }
    }

    const handleDeleteBook = async(adminID)=> {
        try{
            const confirmDelete = window.confirm('Are you sure you want to delete this Admin?')
            if(confirmDelete){
                await deleteDoc(doc(db, 'admin', adminID))
                toast.success('Admin deleted successfully', {
                toastId: 1
                })
            }
        }catch(error){
            console.log(error)
            toast.error('Error delecting Admin', {
                toastId: 1
            })
        }
    }

    const resetPassword = async() => {
      setIsLoading(true)

      try{
        await sendPasswordResetEmail(auth, adminDetail.email)
        toast.success('Password reset email sent successfully. Please check your inbox!', {
          toastId: 'reset',
        })
      }catch(error){
        console.log(error)
      }finally{
        setIsLoading(false)
      }
    }

    const updateAdmin = async() => {
      setIsLoading(true)

      try{
        await updateDoc(doc(db, 'admin', adminDetail.adminID), {
          adminRole: adminRole,
        })
        toast.success('Admin has been updated successfully.', {
          toastId: 1,
        })
      }catch(error){
        toast.error('Something went wrong. Please try again later.', {
          toastId: 2,
        })
      }finally{
        setIsLoading(false)
      }
    }

    const handleCloseAdminsUpdateComponent = ()=> {
      setAdminsUpdateComponent(false)
    }
    const handleCloseAdminsPasswordResetComponent = ()=> {
      setAdminsPasswordResetComponent(false)
    }
    useEffect(() => {
        const fetchAllAdmin = async() =>{
                      try {
            const databaseRef = collection(db, 'admin');
            const adminRef = await getDocs(databaseRef);
            const filteredAdminData = adminRef.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            setAdmins(filteredAdminData);
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        };


        const fetchSettings = async() => {
          try{
              const appearanceSettingsData = await getDoc(doc(db, 'settings', '4hmGZ3GjgfK7bDbyC14g'))
              if(appearanceSettingsData.exists()){
                  setAppearancesettingsData(appearanceSettingsData.data())
              }
            }catch(error){
              console.log(error)
          }
      }

      setTimeout(() => {
        setState(true)
      }, 2000)

      fetchAllAdmin()
      fetchSettings()
    }, [])


    useEffect(() => {
              const fetchSettings = async() => {
                  try{
                      const SettingsData = await getDoc(doc(db, 'settings', 'QnD2IfVSNvBI7kY4xEtI'))
                      if(SettingsData.exists()){
                          setSettingsToggleFetch(SettingsData.data())
                      }
                  }catch(error){
                      console.log(error)
                  }
              }
              fetchSettings()
    })
  return <>
  <div className={isPageDimmed? 'admin-management-container page-dimmed' : currentLightDarkMode.lightMode === false? 'admin-management-container admin-management-container-dark-mode': 'admin-management-container'}>
        <NavBar setPageTitle = {setPageTitle} setIsPageDimmed = {setIsPageDimmed} />

        <div className='admin-management'>
            <PageTitle pageTitle = {pageTitle} />

      {!adminsUpdateComponent &&
      <>
      {!adminsPasswordResetComponent &&
      <>
            {!formPanel &&
            <div className='btn-add-admin'>
            {settingsTogglefetch.toggleAddAdminSettings &&
                <div onClick={handleOpenForm} className='btn'>Add Admin</div>}
            </div>}

            {formPanel &&
            <div className={currentLightDarkMode.lightMode === false? 'form-container form-container-dark-mode':'form-container' }>
                <div className='nav'>
                    <img onClick={handleCloseForm} src={piarrowfoward} alt="" />
                    <div className='label'>Create Admin Here</div>
                </div>
                <div className='form-field'>
                    <label htmlFor="">Username</label>
                    <div className={currentLightDarkMode.lightMode === false? 'form-input form-input-dark-mode' : 'form-input'}>
                        <img src={user} alt="" />
                        <input onChange={(e) => handleAdminCredentials(e)} type="text" name="username" id="" placeholder='Enter your username' />
                    </div>
                </div>
                <div className='form-field'>
                    <label htmlFor="">Role</label>
                    <div className={currentLightDarkMode.lightMode === false? 'form-input form-input-dark-mode' : 'form-input'}>
                        <img src={shield} alt="" />
                        <select onChange={(e) => setAdminRole(e.target.value)} name="" id="">
                            <option disabled selected>Select admin role</option>
                            <option value="super admin">Super Admin</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>
                <div className='form-field'>
                    <label htmlFor="">Email</label>
                    <div className={currentLightDarkMode.lightMode === false? 'form-input form-input-dark-mode' : 'form-input'}>
                        <img src={mail} alt="" />
                        <input onChange={(e) => handleAdminCredentials(e)} type="text" name="email" id="" placeholder='Enter your email address' />
                    </div>
                </div>
                <div className='form-field'>
                    <label htmlFor="">Password</label>
                    <div className={currentLightDarkMode.lightMode === false? 'form-input form-input-dark-mode' : 'form-input'}>
                        <img src={lock} alt="" />
                        <input onChange={(e) => handleAdminCredentials(e)} type={passwordVisibility? 'password':'text'} name="password" id="" placeholder='Enter your passcode' />
                        {passwordVisibility?
                        <img onClick={(e) => setPasswordVisibility((prev) => !prev)} src={visibilityOff} alt="icon" />
                        :
                        <img onClick={(e) => setPasswordVisibility((prev) => !prev)} src={visibilityOn} alt="icon" />}
                    </div>
                </div>
                <div onClick={creatAdmin} className={currentLightDarkMode.lightMode === false? 'btn-add-admin btn-add-admin-dark-mode' : 'btn-add-admin'}>
                    <div div className='btn'>{isLoading? 'Processing...' : 'Create'}</div>
                </div>
            </div>}

            <div className='admin'>
  <table className={currentLightDarkMode.lightMode === false? 'admin-table admin-table-dark-mode' : 'admin-table'}>
    <thead>
      <tr>
        <th>Username</th>
        <th>Email</th>
        <th>Role</th>
        <th>Added On</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody style={{color: appearancesettingData.primaryColor}}>
      {admins.map((admin, idx) => (
        <tr key={idx}>
          <td style={{textTransform: 'capitalize'}}>{admin.username === 'vadetula@gmail.com'? 'Adetula Victor' : admin.username === 'Theprophet'? 'Promise Oba': admin.username ==='ometere'? 'Ometere Favour Ajayi' : admin.username ==='Godwin'? 'Godwin Daberechi' : admin.username ==='Dotun'? 'Adedotun Adetula': admin?.username}</td>
          <td style={{textTransform: 'lowercase'}}>{admin.email}</td>
          <td style={{textTransform: 'capitalize'}}>{admin.adminRole}</td>
          <td>{admin?.createdAt?.toDate()?.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</td>
          <td>
            {settingsTogglefetch.toggleUpdateAdminSettings &&
            <button onClick={(e) => handleUpdateAdmin(admin.adminID)} className="action-btn update">Update</button>}
            <button onClick={(e) => handleResetPassword(admin.adminID)} className="action-btn Reset">Reset</button>
            {settingsTogglefetch.toggleDeleteAdminSettings &&
            <button onClick={(e) => handleDeleteBook(admin.adminID)} className="action-btn Delete">Delete</button>}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</>}
</>}

{adminsUpdateComponent &&
  <div className={currentLightDarkMode.lightMode === false? 'form-container form-container-dark-mode':'form-container' }>
                <div className='nav'>
                    <img onClick={handleCloseAdminsUpdateComponent} src={piarrowfoward} alt="" />
                    <div className='label'>{`${adminDetail.username}'s Information`}</div>
                </div>
                <div className='form-field'>
                    <label htmlFor="">Username</label>
                    <div className={currentLightDarkMode.lightMode === false? 'form-input form-input-dark-mode' : 'form-input'}>
                        <img src={user} alt="" />
                        <input disabled type="text" name="username" id="" value={adminDetail.username} />
                    </div>
                </div>
                <div className='form-field'>
                    <label htmlFor="">Role</label>
                    <div className={currentLightDarkMode.lightMode === false? 'form-input form-input-dark-mode' : 'form-input'}>
                        <img src={shield} alt="" />
                        <select onChange={(e) => setAdminRole(e.target.value)} name="" id="">
                            <option disabled selected>Select admin role</option>
                            <option value="super admin">Super Admin</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>
                <div className='form-field'>
                    <label htmlFor="">Email</label>
                    <div className={currentLightDarkMode.lightMode === false? 'form-input form-input-dark-mode' : 'form-input'}>
                        <img src={mail} alt="" />
                        <input disabled type="text" name="email" id="" value={adminDetail.email} />
                    </div>
                </div>
                <div onClick={updateAdmin} className={currentLightDarkMode.lightMode === false? 'btn-add-admin btn-add-admin-dark-mode' : 'btn-add-admin'}>
                    <div div className='btn'>{isLoading? 'Processing...' : 'Update'}</div>
                </div>
  </div>}

  {adminsPasswordResetComponent &&

  <div className={currentLightDarkMode.lightMode === false? 'form-container form-container-dark-mode':'form-container' }>
                <div className='nav'>
                    <img onClick={handleCloseAdminsPasswordResetComponent} src={piarrowfoward} alt="" />
                    <div className='label'>{`${adminDetail.username}'s Email`}</div>
                </div>
                <div className='form-field'>
                    <label htmlFor="">Email</label>
                    <div  className={currentLightDarkMode.lightMode === false? 'form-input form-input-dark-mode' : 'form-input'}>
                        <img src={mail} alt="" />
                        <input onChange={(e) => setResetEmail(e.target.value)} type="text" name="email" id="" value={adminDetail.email} />
                    </div>
                </div>
                <div onClick={resetPassword} className={currentLightDarkMode.lightMode === false? 'btn-add-admin btn-add-admin-dark-mode' : 'btn-add-admin'}>
                    <div div className='btn'>{isLoading? 'Sending...' : 'Send link'}</div>
                </div>
  </div>}

      </div>
</div>

{!state &&
    <div className='spinner-x'>
        <div className='loading'><Spinner /></div>
    </div>}
</>}

export default ManageAdmin