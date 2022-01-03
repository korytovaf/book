import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import {createUseStyles} from "react-jss";
import Main from "../components/layout/Main";

const useStyles = createUseStyles({
  wrapperBook: {
    marginTop: 20,
    width: "80%",
    lineHeight: '1.6em',
    fontSize: '14px',
    fontWeight: '300',
    color: "#000",
    '& img': {
      width: '100%',
    },
    '& em': {
      fontStyle: 'italic',
    },
    '& iframe': {
      width: '100%',
      height: 306,
    },
    '& .ql-align-justify': {
      textAlign: 'justify',
    },
    '& .ql-align-right': {
      textAlign: 'right',
    },
    '& .ql-align-center': {
      textAlign: 'center',
    },
    '& a': {
      color: '#fff',
      textDecoration: 'underline',
    },
    '& p': {
      overflowWrap: 'break-word',
    },
    '& ul': {
      marginLeft: 30,
    },
    '& ol': {
      marginLeft: 30,
    },
    '@media (max-width: 425px)': {
      width: '100%',
    },
  },
})

const BookPage = () => {
  const { wrapperBook } = useStyles()
  const { loading, request } = useHttp()
  const { token } = useContext(AuthContext)
  const [book, setBook] = useState('')

  const getBook = useCallback(async () => {
    try {
      const { book } = await request('/api/book', 'GET', null, { Authorization: `Bearer ${token}`})
      setBook(book.text)
    } catch (e) {
      alert(e.message)
    }
  }, [token, request])

  useEffect(() => {
    getBook()
  }, [getBook])

  if (loading) return <p>Загрузка...</p>

  return (
    <Main>
      <div className={wrapperBook} dangerouslySetInnerHTML={{ __html: book }} />
    </Main>
  );
};

export default BookPage;
