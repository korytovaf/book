const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const router = Router();

const createToken = (id) => {
  return jwt.sign(
    {userId: id},
    config.get('jwtSecret')
  )
};

// /api/auth/register
router.post(
  '/register',
  [
    check('nameUser', 'Введите имя').exists(),
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })
  ],
  async (request, response) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при авторизации'
        })
      }
      const { nameUser, email, password } = request.body
      const candidate = await User.findOne({ email })
      if (candidate) {
        return response.status(400).json({ message: 'Такой пользователь уже существует'})
      }
      const hashPassword = await bcrypt.hash(password, 12);
      const user = new User({ nameUser, email, password: hashPassword });
      await user.save();

      const token = createToken(user.id);
      response.status(201).json({ token, userId: user.id, nameUser: user.nameUser, message: 'Пользователь создан'})

    } catch (e) {
      console.log(e)
      response.status(500).json({ message: 'Ошибка регистрации! Что-то пошло не так', error: e })
    }
  }
);

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Введите email').exists(),
    check('password', 'Введите пароль').exists()
  ],
  async (request, response) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе'
        })
      }

      const { email, password } = request.body
      const user = await User.findOne({ email })
      if (!user) {
        return response.status(400).json({ message: 'Не правильные имя пользователя или пароль'})
      }

      const isMath = await bcrypt.compare(password, user.password);
      if (!isMath) {
        return response.status(400).json({ message: 'Не правильные имя пользователя или пароль'})
      }
      const token = createToken(user.id);
      response.status(200).json({ token, userId: user.id});

    } catch (e) {
      console.log(e)
      response.status(500).json({ message: 'Ошибка входа! Что-то пошло не так'})
    }
})

module.exports = router
