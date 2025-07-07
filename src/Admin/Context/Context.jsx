import { collection, getDocs } from "firebase/firestore";
import React, {createContext, useEffect, useState} from "react";
import { db } from "../../firebase/config";

export const  AppContext = createContext()

export const AppContextProvider = (props) => {
    const [bookDatas, setBookDatas] = useState(null)
    const [overDueBooksLen, setOverDueBooksLen] = useState(0)
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
                const LoanedBook = booksRef.filter(booksRef => booksRef.isBookLoan === true)

                    setOverDueBooksLen(overDueBooks.length)
                
            }catch(error){
                console.log(error)
            }
        }

        fetchBooksData()
    })


    return (
        <AppContext.Provider value = {{bookDatas, setBookDatas, overDueBooksLen, setOverDueBooksLen}}>
            {props.children}
        </AppContext.Provider>
    )
}