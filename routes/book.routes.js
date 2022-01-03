const { Router } = require('express');
const config = require('config');
const auth = require("../middleware/auth.middleware")
const Book = require('../models/Book');
const router = Router();


// /api/book/create
router.post('/create', auth, async (request, response) => {
  try {
    const { text } = request.body
    let book = await Book.findOne()

    if (!book) {
      book = new Book({ text });
    }

    book.text = text
    await book.save();

    response.status(200).json({ message: 'Книга сохранена'})
  } catch (e) {
    console.log(e)
    response.status(500).json({ message: 'Ошибка сохранения книги! Что-то пошло не так', error: e })
  }
})

// /api/book
router.get('/', async (request, response) => {
  try {
    const book = await Book.findOne()
    response.status(200).json({ book })
  } catch (e) {
    console.log(e)
    response.status(500).json({ message: 'Что-то пошло не так', error: e })
  }
})

// // /api/book:id
// router.get('/:id', async (request, response) => {
//   try {
//     const book = await Book.findById(request.params.id) //???
//     response.status(200).json({ book })
//   } catch (e) {
//     console.log(e)
//     response.status(500).json({ message: 'Что-то пошло не так', error: e })
//   }
// })

module.exports = router
