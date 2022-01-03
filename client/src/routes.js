import React from "react";
import { Routes, Route } from "react-router-dom";
import BookPage from "./pages/BookPage";
import CreateBookPage from "./pages/CreateBookPage";
import AuthPage from "./pages/AuthPage";
import Error from "./pages/404";

export const useRoutes = (isAuth) => {
  if (isAuth) {
    return (
      <Routes>
        <Route path="/" element={<BookPage />} />
        <Route path="/create" element={<CreateBookPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<BookPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="*" element={<Error />} />
    </Routes>
  )
}
