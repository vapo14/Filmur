import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Reviews from "./Reviews";
import SavedReviews from "./SavedReviews";

export default function MainContainer() {
  return (
    <div>
      <NavBar></NavBar>
      <Routes>
        <Route path="/home" element={<Reviews></Reviews>}></Route>
        <Route path="/saved" element={<SavedReviews></SavedReviews>}></Route>
      </Routes>
    </div>
  );
}
