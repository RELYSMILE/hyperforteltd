import React, { useContext, useEffect, useState } from 'react'
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
import Spinner from '../../Components/Spinner'
import { AppContext } from '../Context/Context';
import Loading from '../../Components/Admin/Loading';

const UpdateBook = () => {
    const {publicationLocation, currentLightDarkMode} = useContext(AppContext)
    const [currentUser, setCurrentUser] = useState(null)
    const [bookCredentials, setBookCredentials] = useState([])
    const [location, setLocation] = useState([])
    const [bucket, setBucket] = useState([])
    const [pageTitle, setPageTitle] = useState('Update Publication')
    const [isLoading, setIsLoading] = useState(false)
    const[bookData, setBookData] = useState([])
    const [authorWarning, setAuthorWarning] = useState(false)
    const [bookSubTitleQuery, setBookSubTitleQuery] = useState(false)
    const [typeOfPublication, setTypeOfPublication] = useState([])
    const [publicationBySubject, setPublicationBySubject] = useState([])
    const [state, setState] = useState(false)
    const {bookID} = useParams()

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
        {subject: 'Autobiography/Biography'},
    ]

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
                // bookSubTitle: bookCredentials.bookSubTitle || bookData.bookSubTitle,
                author: bookCredentials.author || bookData?.author,
                tag: bookCredentials.tag || bookData?.tag,
                bookCopy: bookCredentials.bookCopy ||  bookData.bookCopy,
                publisher: bookCredentials.publisher || bookData?.publisher,
                yearOfPublication: bookCredentials.yearOfPublication || bookData?.yearOfPublication,
                publicationBySubject: publicationBySubject || bookData?.publicationBySubject,
                publisherLocation: bookCredentials.publisherLocation || bookData?.publisherLocation,
                volume: bookCredentials.volume || bookData?.volume,
                typeOfPublication: typeOfPublication || bookData?.typeOfPublication,
                location: location || bookData?.location,
                bucketNumber: 'bucket '+bucket || bookData?.bucketNumber,
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
    setTimeout(() => {
      setState(true)
    }, 2000)
    fetchBookData()
    }, [])

  return <>
    <div className={currentLightDarkMode.lightMode === false? 'new-book-container new-book-container-dark-mode' : 'new-book-container'}>
     <NavBar setPageTitle = {setPageTitle} />

     <div className='new-book'>
        <PageTitle pageTitle = {pageTitle} />

        <div className={currentLightDarkMode.lightMode === false? 'form-container form-container-dark-mode': 'form-container'}>
            <div onClick={handleBookSubTitleQuery} className='form-field'>
                <label className={currentLightDarkMode.lightMode === false? 'label label-dark-mode' : 'label'} htmlFor="">Book title</label>
                <input style={{textTransform: 'capitalize'}} onChange={(e) => HandleBookCredentials(e)} type="text" name='title' placeholder={bookData?.bookNormalize || bookData.title} />
                {/* {bookData.bookSubTitle && <input className='sub-title' onChange={(e) => setBookSubTitle(e.target.value)} type="text"  placeholder={bookData.bookSubTitle} />} */}
            </div>
            <div onClick={handleAuthorWarning} className='form-field'>
                <label className={currentLightDarkMode.lightMode === false? 'label label-dark-mode' : 'label'} htmlFor="">Author/Editor</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='author' placeholder={bookData.author} />
                {authorWarning &&
                <marquee><small><span>*</span> Authors'/Editors' names should begin with the surname, followed by the other names — for example: Bell, Judith.</small></marquee>}
            </div>
            <div className='form-field'>
                <label className={currentLightDarkMode.lightMode === false? 'label label-dark-mode' : 'label'} htmlFor="">Publication tag/Call mark/Call tag</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='tag' placeholder={bookData.tag} />
            </div>
            <div className='form-field'>
                <label className={currentLightDarkMode.lightMode === false? 'label label-dark-mode' : 'label'} htmlFor="">Number of copies</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='bookCopy' placeholder={bookData.bookCopy} />
            </div>
            <div className='form-field'>
                <label className={currentLightDarkMode.lightMode === false? 'label label-dark-mode' : 'label'} htmlFor="">Volume/Edition</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='volume' placeholder={bookData.volume} />
            </div>
            <div className='form-field'>
                <label className={currentLightDarkMode.lightMode === false? 'label label-dark-mode' : 'label'} htmlFor="">Publisher</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='publisher' placeholder={bookData.publisher} />
            </div>
            <div className='form-field'>
                <label className={currentLightDarkMode.lightMode === false? 'label label-dark-mode' : 'label'} htmlFor="">Year of Publication</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='yearOfPublication' placeholder={bookData.yearOfPublication} />
            </div>
            <div className='form-field'>
                <label className={currentLightDarkMode.lightMode === false? 'label label-dark-mode' : 'label'} htmlFor="">Location of the Publisher</label>
                <input onChange={(e) => HandleBookCredentials(e)} type="text" name='publisherLocation' placeholder={bookData.publisherLocation} />
            </div>
            <div className='select-field'>
                <label className={currentLightDarkMode.lightMode === false? 'label label-dark-mode' : 'label'} htmlFor="">Publication by Subject</label>
                <select onChange={(e) => setPublicationBySubject(e.target.value)} name="" id="">
                    <option disabled selected>{bookData?.publicationBySubject}</option>
                    {bookSubject.map((subject, idx) => (
                        <option key={idx} value={subject.subject}>{subject.subject}</option>
                    ))} 
                </select>
            </div>
            <div className='select-field'>
                <label className={currentLightDarkMode.lightMode === false? 'label label-dark-mode' : 'label'} htmlFor="">Type of Publication</label>
                <select onChange={(e) => setTypeOfPublication(e.target.value)}>
                    <option disabled selected>{bookData?.typeOfPublication}</option>
                    <option value="book">Book</option>
                    <option value="journal">Journal</option>
                    <option value="working paper/pamflet/news letter">Working Paper/Pamflet/News Letter</option>
                    <option value="conference/workshop proceedings">Conference/Workshop Proceedings</option>
                    <option value="newspaper/magazine">Newspaper/Magazine</option>
                    <option value="project/research/report/thesis">Project/Research/Report/Thesis</option>
                    <option value="monograph">Monograph</option>
                    <option value="autobiography/biography">Autobiography/Biography</option>
                </select>
            </div>
            <div className='select-field'>
                <label className={currentLightDarkMode.lightMode === false? 'label label-dark-mode' : 'label'} htmlFor="">Location</label>
                <select onChange={(e) => setLocation(e.target.value)} name="location" id="">
                    <option disabled selected>{bookData?.location}</option>
                    {publicationLocation.locations.map((location, idx) => (
                        <>{location.location && <option value={location.location}>{location.location}</option>}</>
                    ))}
                </select>
            <div className='select-field'>
                <label className={currentLightDarkMode.lightMode === false? 'label label-dark-mode' : 'label'} htmlFor="">Bucket</label>
                <select  onChange={(e) => setBucket(e.target.value)} name="bucket" id="">
                    <option disabled selected>{bookData?.bucketNumber}</option>
                    {bucketNum.map((bucket, idx) => (
                        <option key={idx} value={bucket.value}>{bucket.item}</option>
                    ))}
                </select>
            </div>
            <button disabled={isLoading} onClick={HandleUpdateBook} className={isLoading? 'disabled':'save-container'}>
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

export default UpdateBook