const petArr = getFromStorage("petArr");
const editPetForm = document.getElementById("edit-pet-form");

editPetForm.style.display = "none";

// hàm hiển thị danh sách thú cưng
function renderEditData(petArr) {
  tableBodyEl.innerHTML = "";
  // công thức in thú cưng
  for (let i = 0; i < petArr.length; i++) {
    // in thông tin thú cưng từ petArr
    const html = `
            <tr id="pet-${petArr[i].id}">
							<th scope="row">${petArr[i].id}</th>
							<td>${petArr[i].name}</td>
							<td>${petArr[i].age}</td>
							<td>${petArr[i].type}</td>
							<td>${petArr[i].weight} kg</td>
							<td>${petArr[i].lengthPet} cm</td>
							<td>${petArr[i].breed}</td>
							<td>
								<i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
							</td>
							<td><i class="${
                petArr[i].vaccinated
                  ? "bi bi-check-circle-fill"
                  : "bi bi-x-circle-fill"
              }"></i></td>
							<td><i class="${
                petArr[i].dewormed
                  ? "bi bi-check-circle-fill"
                  : "bi bi-x-circle-fill"
              }"></i></td>
							<td><i class="${
                petArr[i].sterilized
                  ? "bi bi-check-circle-fill"
                  : "bi bi-x-circle-fill"
              }"></i></td>
							<td>${petArr[i].date}</td>
							<td><button type="button" class="btn btn-warning" id="${petArr[i].id}"
              onclick="editPet(this.id)"
              >Edit</button>
							</td>
				    </tr>
  `;
    // in thông tin thú cưng vào table
    tableBodyEl.insertAdjacentHTML("afterbegin", html);
  }
}

// render petArr khi load trang
window.addEventListener("load", function () {
  renderEditData(petArr);
});

// hàm lấy dữ liệu từ petArr truyền vào input editPet
function startEditPet(e) {
  for (let i = 0; i < petArr.length; i++) {
    // kiểm tra thú cưng hợp lệ
    if (petArr[i].id === e) {
      idInput.value = petArr[i].age;
      nameInput.value = petArr[i].name;
      ageInput.value = petArr[i].age;
      typeInput.value = petArr[i].type;
      weightInput.value = petArr[i].weight;
      lengthInput.value = petArr[i].lengthPet;
      colorInput.value = petArr[i].color;
      isType();
      vaccinatedInput.checked = petArr[i].vaccinated;
      dewormedInput.checked = petArr[i].dewormed;
      sterilizedInput.checked = petArr[i].sterilized;
      // gán giá trị j để sử dụng sau
      j = i;
      console.log(e);
    }
  }
}

// hiển thị input editPet
function editPet(e) {
  editPetForm.style.display = "block";
  startEditPet(e);
  console.log(e);
}

// hàm validate dữ liệu hợp lệ
let validate = true;
function validateData(data) {
  // công thức validate dữ liệu hợp lệ
  if (idInput.value === "") {
    alert("ID must unique");
    validate = false;
  } else if (nameInput.value === "") {
    alert("Pet Name cannot empty");
    validate = false;
  } else if (
    ageInput.vaue === "" ||
    ageInput.value < 1 ||
    ageInput.value > 15
  ) {
    alert("Age must be between 1 and 15!");
    validate = false;
  } else if (
    weightInput.value === "" ||
    weightInput.value < 1 ||
    weightInput.value > 15
  ) {
    alert("Weight must be between 1 and 15!");
    validate = false;
  } else if (
    lengthInput.value === "" ||
    lengthInput.value < 1 ||
    lengthInput.value > 100
  ) {
    alert("Lenght must be between 1 and 100!");
    validate = false;
  } else if (typeInput.value === "Select Type") {
    alert("Please select Type!");
    validate = false;
  } else if (breedInput.value === "Select Breed") {
    alert("Please select Breed!");
    validate = false;
  } else validate = true;
}

submitBtn.addEventListener("click", function () {
  // lấy dữ liệu từ input form
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    lengthPet: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: formatDate,
  };
  // kiểm tra dữ liệu hợp lệ
  validateData(data);

  // edit petArr
  if (validate) {
    // petArr[j] = petArr[i] ở startEditPet(e);
    petArr[j] = data;
    // lưu vào storage
    saveToStorage("petArr", petArr);
    // in petArr ra màn hình
    renderEditData(petArr);
    editPetForm.style.display = "none";
    // xoá các dữ liệu trên form
    clearInput();
  }
});
