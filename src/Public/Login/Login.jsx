import React, { useEffect, useState } from 'react'
import { auth, db, provider } from '../../firebase/config'
import { toast } from 'react-toastify';
import spinner from '../../assets/spinner/spinner.gif'
import Navbar from '../Navbar/Navbar'
import './Login.css'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [state, setState] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const[userCredential, setUserCredential] = useState({})
    const navigate = useNavigate()


    const handleUserCredentials = (e) => {
        setUserCredential({...userCredential, [e.target.name] : e.target.value})
      }

    const HandleSinin = async(e) => {
        e.preventDefault()
        setisLoading(true)
        try{
            await signInWithEmailAndPassword(auth, userCredential.email, userCredential.password)
            navigate('/dashboard')
        }catch(error){
            if(error.message == 'Firebase: Error (auth/invalid-credential).'){
                toast.error('Authentication failed: invalid email/password', {
                    toastId: 2,
                })
            }
            if(error.message == 'Firebase: Error (auth/missing-password).'){
                toast.error('Please Fill Password Field!', {
                    toastId: 2,
                })
            }
            if(error.message == 'Firebase: Error (auth/missing-email).'){
                toast.error('Please Fill Email Field!', {
                    toastId: 2,
                })
            }
            if(error.message == 'Firebase: Error (auth/internal-error).'){
                toast.error('Check your internet connection, (authenticaton/internal-error).', {
                    toastId: 2,
                })
            }
            if(error.message == 'Firebase: Error (auth/network-request-failed).'){
                toast.error('It looks like you are not connected to internet', {
                    toastId: 2,
                })
            }
            if(error.message == 'Firebase: Error (auth/admin-restricted-operation).'){
                toast.error('Restricted-operation, Filling the fields', {
                    toastId: 2,
                })
            }
          }finally{
            setisLoading(false)
          }
    }
        useEffect(() => {
                  const timeOut =  setTimeout(() => {
                      setState(true)
              }, 2000)
          
              return ()=>{
                  clearTimeout(timeOut)
              }
            }, [])
  return (<>
  {state?
  <div className='app-login-container'>
    <Navbar />

    <div className='login-container'>
        <form action="">
            <div className='heading'>Eur-Africa Research Associates Ltd</div>

            <label htmlFor="">Email Address</label>
            <input style={{fontSize: '16px'}} onChange={(e) => handleUserCredentials(e)} type="text" name="email" id="" placeholder='Enter your email address'/>
            <label htmlFor="">Password</label>
            <input style={{fontSize: '16px'}} onChange={(e) => handleUserCredentials(e)} type="password" name="password" id="" placeholder='Enter your password' />
            <div onClick={HandleSinin}>{isLoading? 'Processing...' : 'Login'}</div>
        </form>
    </div>
  </div>
  :
      <div className='spinner'>
          <img src={spinner} />
          <div className='name'>EUR-AFRICA</div>
      </div>}
  </>)
}

export default Login