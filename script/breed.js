"use strict";

// validate dữ liệu hợp lệ
let validate = true;
function validateData() {
  if (breedInput.value === "") {
    validate = false;
    alert("Please select Breed!");
  } else if (typeInput.value === "Select Type") {
    alert("Please select Type!");
    validate = false;
  }
}

// in breed ra màn hình
function renderBreedData() {
  tableBodyEl.innerHTML = ``;
  for (let i = 0; i < breedArr.length; i++) {
    const html = `
              <tr id="breed-${[i]}">
                <th scope="row">${i + 1}</th>
                <td>${breedArr[i].breed}</td>
                <td>${breedArr[i].type}</td>
                <td>
                  <button type="button" class="btn btn-danger" id="${i}" 
                  onclick="breedDelete(this.id)"
                  >Delete</button>
                </td>
              </tr>
            `;
    tableBodyEl.insertAdjacentHTML("afterbegin", html);
  }
}

// xoá breed
function breedDelete(e) {
  if (confirm("Are you sure?")) {
    document.getElementById(`breed-${e}`).remove();
    breedArr.splice(e, 1);
    saveToStorage("breedArr", breedArr);
  }
}

// xoá các dữ liệu trên form
function clearBreedInput() {
  typeInput.value = "Select Type";
  breedInput.value = "";
}

// tạo mảng breed
// thêm breed vào mảng
submitBtn.addEventListener("click", function (e) {
  // kiểm tra dữ liệu hợp lệ
  validateData();
  // lấy dữ liệu từ input form
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  };

  if (validate) {
    // thêm data vào breedArr
    breedArr.push(data);
    for (let i = 0; i < breedArr.length; i++) {
      // công thức thêm breedArr.id
      breedArr[i].id = i;
    }
    // lưu vào storage
    saveToStorage("breedArr", breedArr);
    // in breedArr ra màn hình
    renderBreedData(breedArr);
    // xoá các dữ liệu trên form
    clearBreedInput();
  }
});

window.addEventListener("load", function () {
  renderBreedData(JSON.parse(localStorage.getItem("breedArr")));
});
