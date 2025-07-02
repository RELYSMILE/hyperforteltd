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
    const [isLoading, setIsLoading] = useState(false)
    const[bookData, setBookData] = useState([])
    const [authorWarning, setAuthorWarning] = useState(false)
    const [bookSubTitleQuery, setBookSubTitleQuery] = useState(false)
    const [bookSubTitle, setBookSubTitle] = useState('')
    const [typeOfPublication, setTypeOfPublication] = useState([])
    const [isSubTitlePresent, setIsSubTitlePresent] = useState('')
    const {bookID} = useParams()

    const HandleBookCredentials = (e) => {
        setBookCredentials({...bookCredentials, [e.target.name]: e.target.value})
    }
    const handleAuthorWarning = () => {
        setAuthorWarning(true)
    }
    const handleBookSubTitleQuery = () => {
        setBookSubTitleQuery(true)
    }
    const bucketNum = Array.from({ length: 100 }, (_, i) => ({
        value: i + 1,
        item: i + 1,
    }));

    const HandleUpdateBook = async() => {
        setIsLoading(true)
       try {
            await updateDoc(doc(db, 'books', bookID), {
                title: bookCredentials.title || bookData?.title,
                bookSubTitle: bookCredentials.bookSubTitle || bookData.bookSubTitle,
                author: bookCredentials.author || bookData?.author,
                tag: bookCredentials.tag || bookData?.tag,
                bookCopy: bookCredentials.bookCopy ||  bookData.bookCopy,
                publisher: bookCredentials.publisher || bookData?.publisher,
                yearOfPublication: bookCredentials.yearOfPublication || bookData?.yearOfPublication,
                publisherLocation: bookCredentials.publisherLocation || bookData?.publisherLocation,
                volume: bookCredentials.volume || bookData?.volume,
                typeOfPublication: typeOfPublication || bookData?.typeOfPublication,
                location: location || bookData?.location,
                bucketNumber: 'bucket'+bucket || bookData?.bucketNumber,
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
            <div onClick={handleBookSubTitleQuery} className='form-field'>
                <label htmlFor="">Book title</label>
                <input style={{textTransform: 'capitalize'}} onChange={(e) => HandleBookCredentials(e)} type="text" name='title' placeholder={bookData.title} />
                {bookData.bookSubTitle && <input className='sub-title' onChange={(e) => setBookSubTitle(e.target.value)} type="text"  placeholder={bookData.bookSubTitle} />}
            </div>
            <div onClick={handleAuthorWarning} className='form-field'>
                <label htmlFor="">Author/Editor</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='author' placeholder={bookData.author} />
                {authorWarning &&
                <small><span>*</span> Authors'/Editors' names should begin with the surname, followed by the other names — for example: Bell, Judith.</small>}
            </div>
            <div className='form-field'>
                <label htmlFor="">Book tag</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='tag' placeholder={bookData.tag} />
            </div>
            <div className='form-field'>
                <label htmlFor="">Number of copies</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='bookCopy' placeholder={bookData.bookCopy} />
            </div>
            <div className='form-field'>
                <label htmlFor="">Volume/Edition</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='volume' placeholder={bookData.volume} />
            </div>
            <div className='form-field'>
                <label htmlFor="">Publisher</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='publisher' placeholder={bookData.publisher} />
            </div>
            <div className='form-field'>
                <label htmlFor="">Year of Publication</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='yearOfPublication' placeholder={bookData.yearOfPublication} />
            </div>
            <div className='form-field'>
                <label htmlFor="">Location of the Publisher</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='publisherLocation' placeholder={bookData.publisherLocation} />
            </div>
            <div className='select-field'>
                <label htmlFor="">Type of Publication</label>
                <select onChange={(e) => setTypeOfPublication(e.target.value)}>
                    <option disabled selected>{bookData?.typeOfPublication}</option>
                    <option value="book">Book</option>
                    <option value="journal">Journal</option>
                    <option value="panflet">Pan-flet</option>
                    <option value="newspaper">Newspaper</option>
                    <option value="magazine">Magazine</option>
                    <option value="report">Report</option>
                    <option value="document">Document</option>
                    <option value="monograph">Monograph</option>
                </select>
            </div>
            <div className='select-field'>
                <label htmlFor="">Location</label>
                <select onChange={(e) => setLocation(e.target.value)} name="location" id="">
                    <option disabled selected>{bookData?.location}</option>
                    <option value="library1">Library 1</option>
                    <option value="library2">Library 2</option>
                    <option value="director">Director's Office</option>
                    <option value="manager">Manager's Office</option>
                </select>
            <div className='select-field'>
                <label htmlFor="">Bucket</label>
                <select  onChange={(e) => setBucket(e.target.value)} name="bucket" id="">
                    <option disabled selected>{bookData?.bucketNumber}</option>
                    {bucketNum.map((bucket, idx) => (
                        <option key={idx} value={bucket.value}>{bucket.item}</option>
                    ))}
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