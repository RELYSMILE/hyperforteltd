import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, {createContext, useEffect, useState} from "react";
import { auth, db } from "../../firebase/config";

export const  AppContext = createContext()

export const AppContextProvider = (props) => {
    const [bookDatas, setBookDatas] = useState(null)
    const [overDueBooksLen, setOverDueBooksLen] = useState(0)
    const [currentAdmin, setCurrentAdmin] = useState(null)
    const [publicationLocation, setPublicationLocation] = useState({})
    useEffect(() => {
        const fetchBooksData = async() => {
            try{
                const dataBaseRef = collection(db, 'books')
                const dataSnap = await getDocs(dataBaseRef)

                const booksRef = dataSnap.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setBookDatas(booksRef)
                const overDueBooks = booksRef.filter(books => new Date(books.returnDate) <= new Date())

                    setOverDueBooksLen(overDueBooks.length)
                
            }catch(error){
                console.log(error)
            }
        }

        fetchBooksData()
    })

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async(user) => {
            if(user){
                const {email, emailVerified, uid} = user;

                const adminData = await getDoc(doc(db, 'admin', uid))
                if(adminData.exists()){
                    setCurrentAdmin(adminData.data())
                }else{
                    console.log('No data')
                }
            }
            else{
                console.log('No user')
            }
        })
        const fetchPublicationLocation = async() => {
            try{
                const publicationLocationSnap = doc(db, 'settings', 'locations-array')
                const publicationLocation = await getDoc(publicationLocationSnap)

                if(publicationLocation.exists()){
                    const publicationLocationInfo = publicationLocation.data()
                    setPublicationLocation(publicationLocationInfo)
                }
            }catch(error){
                console.log(error)
            }
        }
        fetchPublicationLocation()
        return () => unsubscribe()
    }, [])

    return (
        <AppContext.Provider value = {{bookDatas, setBookDatas, overDueBooksLen, setOverDueBooksLen, currentAdmin, publicationLocation}}>
            {props.children}
        </AppContext.Provider>
    )
}