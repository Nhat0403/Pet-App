"use strict";

// Toggle class active when click on navbar
const sidebarTitleEl = document.getElementById("sidebar-title");
const sidebarEl = document.getElementById("sidebar");
sidebarTitleEl.addEventListener("click", function () {
  sidebarEl.classList.toggle("active");
});

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");

const submitBtn = document.getElementById("submit-btn");
const healthyBtn = document.getElementById("healthy-btn");
const showAllBtn = document.getElementById("showall-btn");
const calcBMIBtn = document.getElementById("calcBMI-btn");

const d = new Date();
const formatDate =
  ("0" + d.getDate()).slice(-2) +
  "/" +
  ("0" + (d.getMonth() + 1)).slice(-2) +
  "/" +
  d.getFullYear();

// hàm xoá các dữ liệu trên form
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

// hàm lưu dữ liệu
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// hàm lấy dữ liệu
function getFromStorage(key) {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
}

// hàm xoá dữ liệu
function removeFromStorage(key) {
  localStorage.removeItem(key);
}

const DUMMY_BREED = [
  { breed: "Tabby", type: "Cat" },
  { breed: "Domestic Medium Hair", type: "Cat" },
  { breed: "Mixed Breed", type: "Cat" },
  { breed: "Mixed Breed", type: "Dog" },
  { breed: "Domestic Short Hair", type: "Cat" },
  { breed: "Terrier", type: "Dog" },
  { breed: "Greyhound", type: "Dog" },
  { breed: "Persian", type: "Dog" },
  { breed: "Persian", type: "Cat" },
  { breed: "Rottweiler", type: "Dog" },
];

// lưu arr vào storage
const petArr = getFromStorage("petArr");
let breedArr = [...DUMMY_BREED];
saveToStorage("breedArr", breedArr);
breedArr = getFromStorage("breedArr");

// hàm kiểm tra type là Dog hay Cat
function isType() {
  if (typeInput.value === "Dog") renderBreed("Dog");
  // type là Dog thì in ra breed là breedTypeArr của Dog
  else if (typeInput.value === "Cat") renderBreed("Cat");
  // type là Cat thì in ra breed là breedTypeArr của Cat
}

// hàm tạo mảng chứa breed của type là Dog hay Cat
function breedType(whichtype) {
  // không gọi breedTypeArr ở ngoài vì sẽ nhận toàn bộ dữ liệu của breedArr
  let breedTypeArr = [];
  // công thức tìm breed với type và thêm vào mảng
  if (whichtype === "Dog") {
    for (let i = 0; i < breedArr.length; i++)
      // thêm breed với type là Dog vào breedTypeArr
      if (breedArr[i].type === "Dog") breedTypeArr.push(breedArr[i].breed);
  } else {
    for (let i = 0; i < breedArr.length; i++)
      // thêm breed với type là Cat vào breedTypeArr
      if (breedArr[i].type === "Cat") breedTypeArr.push(breedArr[i].breed);
  }
  return breedTypeArr;
}

// hàm thêm breed vào breedInput
function renderBreed(type) {
  breedInput.innerHTML = `<option>Select Breed</option>`;
  const typeArr = breedType(type);
  for (let i = 0; i < typeArr.length; i++) {
    // in thông tin breed từ breedArr
    const html = `
            <option>${typeArr[i]}</option>
                `;
    breedInput.insertAdjacentHTML("beforeend", html);
  }
}
