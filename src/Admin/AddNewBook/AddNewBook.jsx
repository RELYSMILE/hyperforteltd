import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Login from '../../Public/Login/Login';
import {auth, db}  from '../../firebase/config'
import PageTitle from '../../Components/Admin/PageTitle'
import NavBar from '../NavBar'
import save from '../../assets/icons/save.png'
import './AddNewBook.css'
import { collection, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { AppContext } from '../Context/Context';
const AddNewBook = () => {
    const {currentAdmin, publicationLocation} = useContext(AppContext)
    const [bookCredentials, setBookCredentials] = useState([])
    const [location, setLocation] = useState([])
    const [bucket, setBucket] = useState([])
    const [pageTitle, setPageTitle] = useState('Add New Publication')
    const [typeOfPublication, setTypeOfPublication] = useState([])
    const [publicationBySubject, setPublicationBySubject] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const [isPageDimmed, setIsPageDimmed] = useState(false)
    const [authorWarning, setAuthorWarning] = useState(false)
    // const [bookSubTitleQuery, setBookSubTitleQuery] = useState(false)
    // const [bookSubTitle, setBookSubTitle] = useState('')
    const [isSubTitlePresent, setIsSubTitlePresent] = useState('')
    const [isBookPresent, setIsBookPresent] = useState(false)
    const [isBookLoan, setIsBookLoan] = useState(false)

    const bucketNum = Array.from({ length: 100 }, (_, i) => ({
        value: i + 1,
        item: i + 1,
    }));

    const handlePresent = () => {
        setIsBookPresent(true)
        setIsBookLoan(false)
    }
    const handleLoan = () => {
        setIsBookLoan(true)
        setIsBookPresent(false)
    }

    const HandleBookCredentials = (e) => {
        setBookCredentials({...bookCredentials, [e.target.name]: e.target.value})
    }
    const handleAuthorWarning = () => {
        setAuthorWarning(true)
    }
    // const handleBookSubTitleQuery = () => {
    //     setBookSubTitleQuery(true)
    // }

    const bookSubject = [
        {subject: 'Psychology, Economics, Commerce, Finance, Management'},
        {subject: 'Statistics, Research Methods'},
        {subject: 'Sociology, Gender Inequality'},
        {subject: 'Rural and Urban Planning'},
        {subject: 'Political Theory'},
        {subject: 'Political Sciences'},
        {subject: 'Public Institutions, Public Administrations'},
        {subject: 'International Migration'},
        {subject: 'International Relations, Peace and Conflict Management'},
        {subject: 'Religion'},
        {subject: 'Economy'},
        {subject: 'Religion, Philosophy'},
        {subject: 'Journal'},
        {subject: 'African History'},
        {subject: 'American History'},
        {subject: 'Geography, Anthropology, Architecture'},
        {subject: 'Education'},
        {subject: 'Medical Sciences'},
        {subject: 'Engineering Sciences'},
        {subject: 'Law'},
        {subject: 'Agricultural Sciences'},
        {subject: 'Natural Science, Maths, Statistics'},
    ]

    const HandleAddNewBook = async() => {
        setIsLoading(true)
       try {
            const dataBaseRef = collection(db, 'books')
            const newDocRef = doc(dataBaseRef)

            await setDoc(newDocRef, {
                documentID: newDocRef.id,
                title: bookCredentials.title,
                // bookSubTitle: bookSubTitle,
                author: bookCredentials.author,
                tag: bookCredentials.tag,
                bookCopy: bookCredentials.bookCopy,
                publisher: bookCredentials.publisher,
                yearOfPublication: bookCredentials.yearOfPublication,
                publisherLocation: bookCredentials.publisherLocation || '',
                volume: bookCredentials.volume || '',
                typeOfPublication: typeOfPublication,
                publicationBySubject: publicationBySubject,
                location: location,
                bucketNumber: 'bucket'+bucket,
                isBookLoan: isBookLoan? true : false,
                collectorName: bookCredentials.collectorName || '',
                collectorPhone: bookCredentials.collectorPhone || '',
                collectedDate: bookCredentials.collectedDate || '',
                returnDate: bookCredentials.returnDate || '',
                addedBy: currentAdmin?.username,
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
  {currentUser? <div className={isPageDimmed? 'new-book-container page-dimmed' : 'new-book-container'}>
     <NavBar setPageTitle = {setPageTitle} setIsPageDimmed = {setIsPageDimmed} />

     <div className='new-book'>
        <PageTitle pageTitle = {pageTitle} />

        <div className='form-container'>
            <div className='form-field'>
                <label htmlFor="">Publication title</label>
                <input style={{textTransform: 'capitalize'}} onChange={(e) => HandleBookCredentials(e)} type="text" name='title' placeholder='Enter book title' />
                {/* {isSubTitlePresent && <input className='sub-title' onChange={(e) => setBookSubTitle(e.target.value)} type="text"  placeholder='Subtitle' />}
                <div className='subtitle-Container'>
                    {bookSubTitleQuery && 
                    <>
                        <small className='query'>Does this book have subtitle?</small>
                        <div className='checkbox-container'>{isSubTitlePresent? 'Yes' : 'No'} <input onChange={(e) => setIsSubTitlePresent(e.target.checked)} type="checkbox"  /></div>
                    </>}
                </div> */}
            </div>
            <div onClick={handleAuthorWarning} className='form-field'>
                <label htmlFor="">Author/Editor</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='author' placeholder='Name of the Author or Editor' />
                {authorWarning &&
                <small><span>*</span> Authors'/Editors' names should begin with the lastname in capital letter, followed by the other names — for example: BELL, Judith.</small>}
            </div>
            <div className='form-field'>
                <label htmlFor="">Publication tag/Call mark/Call tag</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='tag' placeholder='e.g HC, HB, JC, DT' />
            </div>
            <div className='form-field'>
                <label htmlFor="">Number of copies</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='bookCopy' placeholder='How many copy of this book is avaliable?' />
            </div>
            <div className='form-field'>
                <label htmlFor="">Volume/Edition</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='volume' placeholder='Enter the Volume or Edition of the book' />
            </div>
            <div className='form-field'>
                <label htmlFor="">Publisher</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='publisher' placeholder='Book publisher' />
            </div>
            <div className='form-field'>
                <label htmlFor="">Year of Publication</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='yearOfPublication' placeholder='Enter the year of publication' />
            </div>
            <div className='form-field'>
                <label htmlFor="">Location of the Publisher</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='publisherLocation' placeholder='Enter the publisher location' />
            </div>
            <div className='select-field'>
                <label htmlFor="">Publication by Subject</label>
                <select onChange={(e) => setPublicationBySubject(e.target.value)} name="" id="">
                    <option disabled selected>Select one</option>
                    {bookSubject.map((subject, idx) => (
                        <option key={idx} value={subject.subject}>{subject.subject}</option>
                    ))} 
                </select>
            </div>
            <div className='select-field'>
                <label htmlFor="">Type of Publication</label>
                <select onChange={(e) => setTypeOfPublication(e.target.value)} name="JournalBook" id="">
                    <option disabled selected>Select one</option>
                    <option value="book">Book</option>
                    <option value="journal">Journal</option>
                    <option value="panflet">Pan-flet</option>
                    <option value="newspaper">Newspaper</option>
                    <option value="magazine">Magazine</option>
                    <option value="report">Report</option>
                    <option value="document">Document</option>
                    <option value="monograph">Monograph</option>
                    <option value="autograph">Autograph</option>
                </select>
            </div>
            <div className='select-field'>
                <label htmlFor="">Location</label>
                <select onChange={(e) => setLocation(e.target.value)} name="location" id="">
                    <option disabled selected>Select book location</option>
                    {publicationLocation?.locations?.map((location, idx) => (
                        <>{location.location && <option key={idx} value={location.location}>{location.location}</option>}</>
                    ))}
                </select>
            <div className='select-field'>
                <label htmlFor="">Bucket</label>
                <select  onChange={(e) => setBucket(e.target.value)} name="bucket" id="">
                    <option disabled selected>Choose bucket number</option>
                    {bucketNum.map((bucket, idx) => (
                        <option key={idx} value={bucket.value}>{bucket.item}</option>
                    ))}
                </select>
            </div>
            <div className='book-status'>
                <div className='title'>Status of Publication (In or Out of Library)</div>
                <div className='query'>Is the publication avaliable in the library?</div>
                <div className='radio-selector'>
                    <div onClick={handlePresent} className={isBookPresent? 'radio radio-active': 'radio'}>Yes</div>
                    <div onClick={handleLoan} className={isBookLoan? 'radio radio-active': 'radio'}>No</div>
                </div>
                {isBookLoan &&
                    
                    <div className='form-field form-book-status'>
                        <div className='label'>Enter the details of the person who collected or borrowed the Publication</div>
                        <label htmlFor="">Full Name</label>
                        <input onChange={(e) => HandleBookCredentials(e)} type="text" name='collectorName' placeholder='Enter full name here' /> <br />
                        <label htmlFor="">Phone Number</label>
                        <input onChange={(e) => HandleBookCredentials(e)} type="number" name='collectorPhone' placeholder='07012345678' /> <br />
                        <label htmlFor="">Date of collection</label>
                        <input onChange={(e) => HandleBookCredentials(e)} type="date" name='collectedDate' /> <br />
                        <label htmlFor="">Date of return</label>
                        <input onChange={(e) => HandleBookCredentials(e)} type="date" name='returnDate' /> <br />
                    </div>
                }
                
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