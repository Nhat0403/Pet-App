"use strict";

const findBtn = document.getElementById("find-btn");

// hàm hiển thị danh sách thú cưng
function renderSearchData(petArr) {
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
				    </tr>
  `;
    // in thông tin thú cưng vào table
    tableBodyEl.insertAdjacentHTML("afterbegin", html);
  }
}

const breedArrAll = breedArr.map((arr) => arr.breed);
// hàm hiển thị breed
function renderBreed() {
  breedInput.innerHTML = `<option>Select Breed</option>`;
  for (let i = 0; i < breedArrAll.length; i++) {
    // in thông tin breed ra màn hình
    const html = `
            <option>${breedArrAll[i]}</option>
                `;
    // in thông tin thú cưng vào breedInput
    breedInput.insertAdjacentHTML("beforeend", html);
  }
}
renderBreed();

// hàm xoá các dữ liệu trên form
function clearSearchInput() {
  idInput.value = "";
  nameInput.value = "";
  typeInput.value = "Select Type";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

// thêm thú cưng vào danh sách
findBtn.addEventListener("click", function () {
  const check = petArr.filter((petArr) => {
    // petArr.id có chứa idInput.value?
    return (
      // trả về các petArr hợp lệ
      petArr.id.includes(idInput.value) &&
      petArr.name.includes(nameInput.value) &&
      (!vaccinatedInput.checked ||
        petArr.vaccinated === vaccinatedInput.checked) &&
      (!dewormedInput.checked || petArr.dewormed === dewormedInput.checked) &&
      (!sterilizedInput.checked ||
        petArr.sterilized === sterilizedInput.checked) &&
      (typeInput.value === "Select Type" || petArr.type === typeInput.value) &&
      (breedInput.value === "Select Breed" || petArr.breed === breedInput.value)
    );
  });
  // in ra petArr hợp lệ
  renderSearchData(check);
  // xoá các dữ liệu trên form
  clearSearchInput();
});
