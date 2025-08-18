import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar'
import totalbooks from '../../assets/icons/totalbooks.png'
import security from '../../assets/icons/security.png'
import PageTitle from '../../Components/Admin/PageTitle'
import './Dashboard.css'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { auth, db } from '../../firebase/config'
import Spinner from '../../Components/Spinner'

const Dashboard = () => {
    const [totalBooksNum, setTotalBooksNum] = useState(0)
    const [totalAdmin, setTotalAdmin] = useState(0)
    const [isPageDimmed, setIsPageDimmed] = useState(false)
    const [state, setState] = useState(false)
    const dashboard = [
        {title: 'Total Publication', num: totalBooksNum, icon: totalbooks},
        {title: 'Total Admin', num: totalAdmin, icon: security},
    ]
    const [pageTitle, setPageTitle] = useState('Dashboard')


    useEffect(() =>{
      const fetchBooks = async() => {
            try{
                const databaseRef = collection(db, 'books')
                 const totalBooks = await getDocs(databaseRef)
                setTotalBooksNum(totalBooks.size)
            }catch(error){
                console.log(error)
            }
      }

      const fetchAdmin = async() => {
        try{
                const databaseRef = collection(db, 'admin')
                 const totalAdmin = await getDocs(databaseRef)
                setTotalAdmin(totalAdmin.size)
            }catch(error){
                console.log(error)
            }
      }

      setTimeout(() => {
        setState(true)
      }, 2000)

      
      fetchAdmin()
      fetchBooks()
    }, [])

  return <>
  <div className={isPageDimmed? 'dashboard-container page-dimmed' : 'dashboard-container'}>
    <NavBar setPageTitle = {setPageTitle} setIsPageDimmed = {setIsPageDimmed} />
    <div className='dashboard'>
        <PageTitle pageTitle = {pageTitle} />
        <div className='dashboard-items'>
            {dashboard.map((item, idx) => (
            <div key={idx} className='dashboard-items-main'>
                <div className='dashboard-items-flex'>
                    <img src={item?.icon} alt="" />
                    <div>{item.title}</div>
                </div>
                <div className='dashboard-items-num'>{item?.num<10 ? '0'+item?.num : item?.num}</div>
            </div>
            ))}
        </div>
    </div>
  </div>

  {!state &&
    <div className='spinner-x'>
        <div className='loading'><Spinner /></div>
    </div>
  }
  </>
}

export default Dashboard