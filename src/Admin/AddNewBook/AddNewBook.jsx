import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Login from '../../Public/Login/Login';
import {auth, db}  from '../../firebase/config'
import PageTitle from '../../Components/Admin/PageTitle'
import NavBar from '../NavBar'
import save from '../../assets/icons/save.png'
import './AddNewBook.css'
import { collection, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
const AddNewBook = () => {
    const [bookCredentials, setBookCredentials] = useState([])
    const [location, setLocation] = useState([])
    const [bucket, setBucket] = useState([])
    const [pageTitle, setPageTitle] = useState('Add New Book')
    const [journalBook, setJournalBook] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)

    const bucketNum = Array.from({ length: 71 }, (_, i) => ({
        value: i + 1,
        item: i + 1,
    }));

    const HandleBookCredentials = (e) => {
        setBookCredentials({...bookCredentials, [e.target.name]: e.target.value})
    }

    const HandleAddNewBook = async() => {
        setIsLoading(true)
       try {
            const dataBaseRef = collection(db, 'books')
            const newDocRef = doc(dataBaseRef)

            await setDoc(newDocRef, {
                documentID: newDocRef.id,
                title: bookCredentials.title,
                author: bookCredentials.author,
                tag: bookCredentials.tag,
                publisher: bookCredentials.publisher,
                volume: bookCredentials.volume || '',
                journalBook: journalBook,
                location: location,
                bucketNumber: bucket,
                cretedAt: serverTimestamp()
            })
            toast.success('Book added successfully', {
                toastId: 'book'
            })
        }catch(error){
           toast.error('Failed to add book. Please try again', {
                toastId: 'book'
            })
        }finally{
            setIsLoading(false)
        }
    }

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
  {currentUser? <div className='new-book-container'>
     <NavBar setPageTitle = {setPageTitle} />

     <div className='new-book'>
        <PageTitle pageTitle = {pageTitle} />

        <div className='form-container'>
            <div className='form-field'>
                <label htmlFor="">Book title</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='title' placeholder='Enter book title' />
            </div>
            <div className='form-field'>
                <label htmlFor="">Author</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='author' placeholder='Name of the Author' />
            </div>
            <div className='form-field'>
                <label htmlFor="">Book tag</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='tag' placeholder='e.g HC, HB, JC, DT' />
            </div>
            <div className='form-field'>
                <label htmlFor="">Volume/Edition</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='volume' placeholder='Enter the Volume or Edition of the book' />
            </div>
            <div className='form-field'>
                <label htmlFor="">Publisher</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='publisher' placeholder='Book publisher' />
            </div>
            <div className='select-field'>
                <label htmlFor="">Journal/Book/panflet/newpaper</label>
                <select onChange={(e) => setJournalBook(e.target.value)} name="JournalBook" id="">
                    <option disabled selected>Select one</option>
                    <option value="book">Book</option>
                    <option value="journal">Journal</option>
                    <option value="panflet">Pan-flet</option>
                    <option value="newspaper">newspaper</option>
                </select>
            </div>
            <div className='select-field'>
                <label htmlFor="">Location</label>
                <select onChange={(e) => setLocation(e.target.value)} name="location" id="">
                    <option disabled selected>Select book location</option>
                    <option value="upstairs">Upstairs</option>
                    <option value="downstairs">DownStairs</option>
                    <option value="director">Director's Office</option>
                    <option value="manager">Manager's Office</option>
                </select>
            <div className='select-field'>
                <label htmlFor="">Bucket</label>
                <select  onChange={(e) => setBucket(e.target.value)} name="bucket" id="">
                    <option disabled selected>Choose bucket number</option>
                    {bucketNum.map((bucket, idx) => (
                        <option value={bucket.value}>{bucket.item}</option>
                    ))}
                </select>
            </div>
            <button disabled={isLoading} onClick={HandleAddNewBook} className='save-container'>
                <img src={save} alt="" />
                <div className='save'>{isLoading? 'Loading...' : 'Save'}</div>
            </button>
            </div>
        </div>
     </div>
  </div>
    :
  <Login />}
</>}

export default AddNewBook