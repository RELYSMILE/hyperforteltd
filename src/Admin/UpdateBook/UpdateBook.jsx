import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import {auth, db}  from '../../firebase/config'
import PageTitle from '../../Components/Admin/PageTitle'
import NavBar from '../NavBar'
import Login from '../../Public/Login/Login';
import save from '../../assets/icons/save.png'
import '../AddNewBook/AddNewBook.css'
import { useParams } from 'react-router-dom';
import { collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const UpdateBook = () => {
    const [currentUser, setCurrentUser] = useState(null)
    const [bookCredentials, setBookCredentials] = useState([])
    const [location, setLocation] = useState([])
    const [bucket, setBucket] = useState([])
    const [pageTitle, setPageTitle] = useState('Update Book Here')
    const [journalBook, setJournalBook] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const[bookData, setBookData] = useState([])
    const {bookID} = useParams()

    const HandleBookCredentials = (e) => {
        setBookCredentials({...bookCredentials, [e.target.name]: e.target.value})
    }

    const HandleUpdateBook = async() => {
        setIsLoading(true)
       try {
            await updateDoc(doc(db, 'books', bookID), {
                title: bookCredentials.title || bookData?.title,
                author: bookCredentials.author || bookData?.author,
                tag: bookCredentials.tag || bookData?.tag,
                publisher: bookCredentials.publisher || bookData?.publisher,
                volume: bookCredentials.volume || bookData?.volume,
                journalBook: journalBook || bookData?.journalBook,
                location: location || bookData?.location,
                bucketNumber: bucket || bookData?.bucketNumber,
                updatedAt: serverTimestamp()
            })
            toast.success('Book updated successfully', {
                toastId: 'book'
            })
        }catch(error){
           toast.error('Failed to update book. Please try again', {
                toastId: 'book'
            })
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
         const fetchBookData = async() => {
                    try{
                        const book =  await getDoc(doc(db, 'books', bookID))
                        if(book.exists()){
                        setBookData(book.data())
                    }
                    }catch(error){
                        console.log(error)
                    }
                }
                fetchBookData()
    }, [])

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
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='title' placeholder={bookData.title} />
            </div>
            <div className='form-field'>
                <label htmlFor="">Author</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='author' placeholder={bookData.author} />
            </div>
            <div className='form-field'>
                <label htmlFor="">Book tag</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='tag' placeholder={bookData.tag} />
            </div>
            <div className='form-field'>
                <label htmlFor="">Volume/Edition</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='volume' placeholder={bookData.volume} />
            </div>
            <div className='form-field'>
                <label htmlFor="">Publisher</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='publisher' placeholder={bookData.publisher} />
            </div>
            <div className='select-field'>
                <label htmlFor="">Journal/Book/panflet/newpaper</label>
                <select onChange={(e) => setJournalBook(e.target.value)} name="JournalBook" id="">
                    <option disabled selected>{bookData?.journalBook}</option>
                    <option value="book">Book</option>
                    <option value="journal">Journal</option>
                    <option value="panflet">Pan-flet</option>
                    <option value="newspaper">newspaper</option>
                </select>
            </div>
            <div className='select-field'>
                <label htmlFor="">Location</label>
                <select onChange={(e) => setLocation(e.target.value)} name="location" id="">
                    <option disabled selected>{bookData?.location}</option>
                    <option value="upstairs">Upstairs</option>
                    <option value="downstairs">DownStairs</option>
                </select>
            <div className='select-field'>
                <label htmlFor="">Bucket</label>
                <select  onChange={(e) => setBucket(e.target.value)} name="bucket" id="">
                    <option disabled selected>{bookData?.bucket}</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>
            <button disabled={isLoading} onClick={HandleUpdateBook} className='save-container'>
                <img src={save} alt="" />
                <div className='save'>{isLoading? 'Loading...' : 'Update'}</div>
            </button>
            </div>
        </div>
     </div>
  </div>
  :
  <Login />}
  
</>}

export default UpdateBook