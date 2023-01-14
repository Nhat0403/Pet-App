"use strict";

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
  } else uniqueId();
}

// hàm kiểm tra tính độc nhất của thú cưng
function uniqueId() {
  for (let i = 0; i < petArr.length; i++) {
    // công thức tìm thú cưng độc nhất
    if (petArr[i].id === idInput.value) {
      alert("ID must unique");
      validate = false;
    } else validate = true;
  }
}

// hàm hiển thị danh sách thú cưng
function renderTableData(petArr) {
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
              <td id='bmi-${petArr[i].id}'>?</td>
							<td>${petArr[i].date}</td>
							<td><button type="button" class="btn btn-danger" id="${petArr[i].id}"
              onclick="deletePet(this.id)"
              >Delete</button>
							</td>
				    </tr>
  `;
    // in thông tin thú cưng vào table
    tableBodyEl.insertAdjacentHTML("afterbegin", html);
  }
}

// hàm xoá 1 thú cưng
function deletePet(e) {
  // hỏi nếu đồng ý xoá thú cưng
  if (confirm("Are you sure?")) {
    // khi đồng ý xoá thú cưng
    // xoá thú cưng ra khỏi arr
    document.getElementById(`pet-${e}`).remove();
    // loại thông tin thú cưng ra khỏi petArr
    spliceIndex(petArr, e);
    // loại thông tin thú cưng ra khỏi healthyPet
    spliceIndex(healthyPet, e);
    // xoá dữ liệu thú cưng petArr
    saveToStorage("petArr", petArr);
  }
}

// hàm loại thú cưng ra khỏi arr
function spliceIndex(arr, e) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === e) {
      // loại đúng 1 thú cưng ở vị trí i ra khỏi arr
      arr.splice(i, 1);
    }
  }
}

// hàm tính toán chỉ số bmi
function calcBMIPet(arr) {
  for (let i = 0; i < arr.length; i++) {
    // tính chỉ số bmi
    const petBmi = document.getElementById(`bmi-${arr[i].id}`);
    const dogBmi = (arr[i].weight * 703) / arr[i].lengthPet ** 2;
    const catBmi = (arr[i].weight * 886) / arr[i].lengthPet ** 2;
    if (arr[i].type === "Dog") {
      // in ra bmi của chó
      petBmi.textContent = dogBmi.toFixed(2);
    } else if (arr[i].type === "Cat") {
      // in ra bmi của mèo
      petBmi.textContent = catBmi.toFixed(2);
    }
  }
}

let healthy = true;
const healthyPet = [];
function isHealthy(data) {
  if (
    vaccinatedInput.checked &&
    dewormedInput.checked &&
    sterilizedInput.checked
  ) {
    healthy = true;
  } else healthy = false;
}

// thêm thú cưng vào danh sách
submitBtn.addEventListener("click", function (e) {
  // e.preventDefault();
  validateData();
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

  if (validate) {
    // thêm data vào petArr
    petArr.push(data);
    // lưu vào storage
    saveToStorage("petArr", petArr);
    // in petArr ra màn hình
    renderTableData(petArr);
    // hàm kiểm tra dữ liệu healthPet
    isHealthy(data);
    // kiểm tra pet healthy
    if (healthy) {
      healthyPet.push(data);
    }
    // xoá các dữ liệu trên form
    clearInput();
  }
});

// hiển thị các thú cưng khoẻ mạnh
function showhidetoogle() {
  healthyBtn.classList.toggle("hidden");
  showAllBtn.classList.toggle("hidden");
}

healthyBtn.addEventListener("click", function () {
  showhidetoogle();
  renderTableData(healthyPet);
});

showAllBtn.addEventListener("click", function () {
  showhidetoogle();
  renderTableData(petArr);
});

// tính toán chỉ số bmi
calcBMIBtn.addEventListener("click", function () {
  calcBMIPet(healthyPet);
  calcBMIPet(petArr);
});

window.addEventListener("load", function () {
  if (petArr.length !== 0) {
    renderTableData(JSON.parse(localStorage.getItem("petArr")));
    for (let i = 0; i < petArr.length; i++) {
      // kiểm tra các thú cưng khoẻ mạnh
      let healthy = true;
      if (
        // công thức tính cưng khoẻ mạnh
        petArr[i].vaccinated &&
        petArr[i].dewormed &&
        petArr[i].sterilized
      ) {
        healthy = true;
      } else healthy = false;
      if (healthy) {
        // thêm petArr[i] và healthyPet
        healthyPet.push(petArr[i]);
      }
    }
  }
});

typeInput.addEventListener("change", function () {
  isType();
});
