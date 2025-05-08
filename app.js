"use strict";
const form = document.querySelector("form");
const submitButton = document.querySelector("button[type='submit']");
const editButton = document.getElementById("edit");
const deleteButton = document.getElementById("delete");
const nameInput = form.elements.namedItem("name");
const ageInput = form.elements.namedItem("age");
const paragraphs = document.querySelectorAll("ul li p");
// Sahifa yuklanganda - localStorage dan qiymat olib ko'rsatish
window.addEventListener("DOMContentLoaded", () => {
    const storedName = localStorage.getItem("name");
    const storedAge = localStorage.getItem("age");
    if (storedName && storedAge && paragraphs.length >= 2) {
        paragraphs[0].textContent = storedName;
        paragraphs[1].textContent = storedAge;
    }
});
// Submit - inputdan qiymat olib, p ga yozish, inputni va localStorage ni tozalash
submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const nameValue = nameInput.value.trim();
    const ageValue = ageInput.value.trim();
    if (paragraphs.length >= 2) {
        paragraphs[0].textContent = nameValue;
        paragraphs[1].textContent = ageValue;
    }
    // localStorage ga saqlash
    localStorage.setItem("name", nameValue);
    localStorage.setItem("age", ageValue);
    // Inputlarni tozalash
    nameInput.value = "";
    ageInput.value = "";
});
// Edit - p dagi qiymatlarni inputga qaytarish
editButton.addEventListener("click", () => {
    if (paragraphs.length >= 2) {
        nameInput.value = paragraphs[0].textContent || "";
        ageInput.value = paragraphs[1].textContent || "";
    }
});
// Delete - p, input va localStorage ni tozalash
deleteButton.addEventListener("click", () => {
    if (paragraphs.length >= 2) {
        paragraphs[0].textContent = "";
        paragraphs[1].textContent = "";
    }
    nameInput.value = "";
    ageInput.value = "";
    // localStorage dan o'chirish
    localStorage.removeItem("name");
    localStorage.removeItem("age");
});
