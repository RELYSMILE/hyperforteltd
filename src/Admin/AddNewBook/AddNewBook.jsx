import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Login from '../../Public/Login/Login';
import {auth, db}  from '../../firebase/config'
import PageTitle from '../../Components/Admin/PageTitle'
import NavBar from '../NavBar'
import save from '../../assets/icons/save.png'
import './AddNewBook.css'
import { collection, doc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { AppContext } from '../Context/Context';
import Spinner from '../../Components/Spinner';
import Loading from '../../Components/Admin/Loading';
const AddNewBook = () => {
    const {currentAdmin, publicationLocation, currentLightDarkMode, newSubject, newPublicationType} = useContext(AppContext)
    const [bookCredentials, setBookCredentials] = useState([])
    const [location, setLocation] = useState([])
    const [bucket, setBucket] = useState([])
    const [pageTitle, setPageTitle] = useState('Add New Publication')
    const [typeOfPublication, setTypeOfPublication] = useState([])
    const [publicationBySubject, setPublicationBySubject] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isPageDimmed, setIsPageDimmed] = useState(false)
    const [authorWarning, setAuthorWarning] = useState(false)
    const [isBookPresent, setIsBookPresent] = useState(false)
    const [isBookLoan, setIsBookLoan] = useState(false)
    const [state, setState] = useState(false)

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
        {subject: 'Science/Technology'},
        {subject: 'Autobiography/Biography'},
    ]


    const HandleAddNewBook = async() => {
        setIsLoading(true)
        const bookNormalize = bookCredentials.title
        const bookTitleTolowerCase = bookCredentials.title?.trim().toLowerCase(); //cover the title to lower case for uniformity and easy search
       try {
            const dataBaseRef = collection(db, 'books')
            const newDocRef = doc(dataBaseRef)

            const Query = query(dataBaseRef, where('title', '==', bookTitleTolowerCase));
            const BookSnap = await getDocs(Query)
            if(BookSnap.empty){
                await setDoc(newDocRef, {
                documentID: newDocRef.id,
                title: bookTitleTolowerCase,
                bookNormalize: bookNormalize,
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
                bucketNumber: 'bucket '+bucket,
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
            }else{
                toast.warning('This publication is already in the database. Kindly update its copies and re-shelve accordingly.', {
                    toastId: 'bookerror',
                })
            }
        }catch(error){
           toast.error('Failed to add book. Please try again', {
                toastId: 'book'
            })
        }finally{
            setIsLoading(false)
        }
    }
    useEffect(() => {
        setTimeout(() => {
            setState(true)
        }, 2000)
    }, []);
  return <>
    <div className={isPageDimmed? 'new-book-container page-dimmed' : currentLightDarkMode.lightMode === false? 'new-book-container new-book-container-dark-mode' : 'new-book-container'}>
     <NavBar setPageTitle = {setPageTitle} setIsPageDimmed = {setIsPageDimmed} />

     <div className='new-book'>
        <PageTitle pageTitle = {pageTitle} />

        <div className={currentLightDarkMode.lightMode === false? 'form-container form-container-dark-mode': 'form-container'}>
            <div className='form-field'>
                <label className={currentLightDarkMode.lightMode === false? 'label label-dark-mode' : 'label'} htmlFor="">Publication title</label>
                <input style={{textTransform: 'capitalize'}} onChange={(e) => HandleBookCredentials(e)} type="text" name='title' placeholder='Enter book title' />
            </div>
            <div onClick={handleAuthorWarning} className='form-field'>
                <label className={currentLightDarkMode.lightMode === false? 'label label-dark-mode' : 'label'} htmlFor="">Author/Editor</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='author' placeholder='Name of the Author or Editor' />
                {authorWarning &&
                <marquee><small><span>*</span> Authors'/Editors' names should begin with the lastname in capital letter, followed by the other names — for example: BELL, Judith.</small></marquee>}
            </div>
            <div className='form-field'>
                <label className={currentLightDarkMode.lightMode === false? 'label label-dark-mode' : 'label'} htmlFor="">Publication tag/Call mark/Call tag</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='tag' placeholder='e.g HC, HB, JC, DT' />
            </div>
            <div className='form-field'>
                <label className={currentLightDarkMode.lightMode === false? 'label label-dark-mode' : 'label'} htmlFor="">Number of copies</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='bookCopy' placeholder='How many copy of this book is avaliable?' />
            </div>
            <div className='form-field'>
                <label className={currentLightDarkMode.lightMode === false? 'label label-dark-mode' : 'label'} htmlFor="">Volume/Edition</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='volume' placeholder='Enter the Volume or Edition of the book' />
            </div>
            <div className='form-field'>
                <label className={currentLightDarkMode.lightMode === false? 'label label-dark-mode' : 'label'} htmlFor="">Publisher</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='publisher' placeholder='Book publisher' />
            </div>
            <div className='form-field'>
                <label className={currentLightDarkMode.lightMode === false? 'label label-dark-mode' : 'label'} htmlFor="">Year of Publication</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='yearOfPublication' placeholder='Enter the year of publication' />
            </div>
            <div className='form-field'>
                <label className={currentLightDarkMode.lightMode === false? 'label label-dark-mode' : 'label'} htmlFor="">Location of the Publisher</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='publisherLocation' placeholder='Enter the publisher location' />
            </div>
            <div className='select-field'>
                <label className={currentLightDarkMode.lightMode === false? 'label label-dark-mode' : 'label'} htmlFor="">Publication by Subject</label>
                <select onChange={(e) => setPublicationBySubject(e.target.value)} name="" id="">
                    <option disabled selected>Select one</option>
                    {bookSubject.map((subject, idx) => (
                        <option key={idx} value={subject.subject}>{subject.subject}</option>
                    ))} 
                    {newSubject?.subjects?.map((subject, idx) => (
                        <>{subject?.newSubject && <option key={idx} value={subject?.newSubject}>{subject?.newSubject}</option>}</> //coming from database
                    ))}
                </select>
            </div>
            <div className='select-field'>
                <label className={currentLightDarkMode.lightMode === false? 'label label-dark-mode' : 'label'} htmlFor="">Type of Publication</label>
                <select onChange={(e) => setTypeOfPublication(e.target.value)} name="JournalBook" id="">
                    <option disabled selected>Select one</option>
                    {newPublicationType?.publicationTypes?.map((publicationType, idx) => (
                        <>{publicationType?.newPublicationType && <option style={{textTransform: 'capitalize'}} key={idx} value={publicationType?.newPublicationType}>{publicationType?.newPublicationType}</option>}</> //coming from database
                    ))}
                </select>
            </div>
            <div className='select-field'>
                <label className={currentLightDarkMode.lightMode === false? 'label label-dark-mode' : 'label'} htmlFor="">Location</label>
                <select onChange={(e) => setLocation(e.target.value)} name="location" id="">
                    <option disabled selected>Select book location</option>
                    {publicationLocation?.locations?.map((location, idx) => (
                        <>{location.location && <option key={idx} value={location.location}>{location.location}</option>}</>
                    ))}
                </select>
            <div className='select-field'>
                <label className={currentLightDarkMode.lightMode === false? 'label label-dark-mode' : 'label'} htmlFor="">Bucket</label>
                <select  onChange={(e) => setBucket(e.target.value)} name="bucket" id="">
                    <option disabled selected>Choose bucket number</option>
                    {bucketNum.map((bucket, idx) => (
                        <option key={idx} value={bucket.value}>{bucket.item}</option>
                    ))}
                </select>
            </div>
            <div className={currentLightDarkMode.lightMode === false? 'book-status book-status-dark-mode' : 'book-status'}>
                <div className='title'>Status of Publication (In or Out of Library)</div>
                <div className='query'>Is the publication avaliable in the library?</div>
                <div className='radio-selector'>
                    <div onClick={handlePresent} className={isBookPresent? 'radio radio-active': 'radio'}>Yes</div>
                    <div onClick={handleLoan} className={isBookLoan? 'radio radio-active': 'radio'}>No</div>
                </div>
                {isBookLoan &&
                    
                    <div className={currentLightDarkMode.lightMode === false?'form-field form-book-status form-book-status-dark-mode' : 'form-field form-book-status'}>
                        <div className='label'>Enter the details of the person who collected or borrowed the Publication</div>
                        <label className={currentLightDarkMode.lightMode === false? 'label label-dark-mode' : 'label'} htmlFor="">Full Name</label>
                        <input onChange={(e) => HandleBookCredentials(e)} type="text" name='collectorName' placeholder='Enter full name here' /> <br />
                        <label className={currentLightDarkMode.lightMode === false? 'label label-dark-mode' : 'label'} htmlFor="">Phone Number</label>
                        <input onChange={(e) => HandleBookCredentials(e)} type="number" name='collectorPhone' placeholder='07012345678' /> <br />
                        <label className={currentLightDarkMode.lightMode === false? 'label label-dark-mode' : 'label'} htmlFor="">Date of collection</label>
                        <input onChange={(e) => HandleBookCredentials(e)} type="date" name='collectedDate' /> <br />
                        <label className={currentLightDarkMode.lightMode === false? 'label label-dark-mode' : 'label'} htmlFor="">Date of return</label>
                        <input onChange={(e) => HandleBookCredentials(e)} type="date" name='returnDate' /> <br />
                    </div>
                }
                
            </div>
            <button disabled={isLoading} onClick={HandleAddNewBook} className={isLoading? 'disabled':'save-container'}>
                <img src={save} alt="" />
                <div className='save'>{isLoading? 'Saving...' : 'Save'}</div>
            </button>
            </div>
            {isLoading && <Loading />}
        </div>
     </div>
  </div>

  {!state &&
    <div className='spinner-x'>
        <div className='loading'><Spinner /></div>
    </div>}
</>}

export default AddNewBook