import React, {useCallback, useContext, useEffect, useState} from 'react';
import ReactQuill from 'react-quill';
import {createUseStyles} from "react-jss";
import 'react-quill/dist/quill.snow.css';
import {useHttp} from "../hooks/http.hook";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import Spinner from "./ui/Spinner";
import MyButton from "./ui/MyButton";

const useStyles = createUseStyles({
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  containerEditor: {
    width: '80%',
    '& .quill ': {
      backgroundColor: '#efefef',
      borderRadius: 4,
    },
    '& a': {
      color: 'red',
    },
    '& iframe': {
      width: '100%',
      height: 306,
    },
    '& .ql-toolbar.ql-snow': {
      border: 'none',
    },
    '& .ql-container.ql-snow': {
      border: 'none',
      borderRadius: 4,
      color: '#000',
    },
    '& .ql-editor': {
      width: '100%',
      minHeight: 300,
      '& em': {
        fontStyle: 'italic',
      },
    },
    '& .ql-editor, .ql-blank': {
      borderRadius: 4,
    },
    '& .ql-tooltip': {
      borderRadius: 4,
      border: `1px solid #000`,
      boxShadow: '0px 0px 5px #0a0d1c',
    },
    '& .ql-snow .ql-fill, .ql-snow .ql-stroke.ql-fill': {
      fill: 'red',
    },
    '& .ql-snow .ql-stroke': {
      stroke: 'red',
    },
    '& .ql-snow .ql-picker': {
      color: 'red',
    },
    '& .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options': {
      borderColor: 'none',
      border: `1px solid #000`,
      borderRadius: '0 0 4px 4px',
    },
    '& .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label': {
      borderColor: 'none',
      border: `1px solid #000`,
      borderRadius: '4px 4px 0 0',
      '&:focus': {
        outline: 'none',
      },
    },
    '@media (max-width: 425px)': {
      width: '100%',
    },
  },
  save: {
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "end",
    gap: 20,
    width: '80%',
    margin: '20px 20px 40px',
    '@media (max-width: 425px)': {
      width: '100%',
    },
  }
})

const CreateBook = () => {
  const { containerEditor, save } = useStyles()
  const { token } = useContext(AuthContext)
  const navigate = useNavigate()
  const { loading, request } = useHttp()
  const [text, setText] = useState('')

  const onHandlerChange = (event) => {
    setText(event)
  }

  const getBook = useCallback(async () => {
    try {
      const { book } = await request('/api/book', 'GET', null, { Authorization: `Bearer ${token}`})
      setText(book.text)
    } catch (e) {
      alert(e.message)
    }
  }, [token, request])

  useEffect(() => {
    getBook()
  }, [getBook])

  const onSaveBook = async () => {
    try {
      await request('/api/book/create', 'POST', { text }, { Authorization: `Bearer ${token}`})
      navigate('/', { replace: true })
    } catch (e) {
      alert(e.message)
    }
  }

  if (loading) return <Spinner />

  return (
    <>
      <div className={containerEditor}>
        <ReactQuill
          modules={CreateBook.modules}
          formats={CreateBook.formats}
          value={text}
          onChange={onHandlerChange}
        />
      </div>
      <div className={save}>
        <MyButton onClick={() => navigate('/', { replace: true })} type="button">Отменить</MyButton>
        <MyButton onClick={onSaveBook} type="button">Сохранить</MyButton>
      </div>
    </>

  );
};

export default CreateBook;

CreateBook.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }],
    // [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    // [{ font: [] }],
    [{ align: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video'],
    ['clean'], // очистить от форматирования
    // ['code-block'],
  ],
};

CreateBook.formats = [
  'header',
  'fonts',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'video',
  'color',
  'background',
  'font',
  'align',
  'ordered',
  'bullet',
  // 'code-block',
];
