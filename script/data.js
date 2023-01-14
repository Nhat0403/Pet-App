"use strict";

const importBtn = document.getElementById("import-btn");
const exportBtn = document.getElementById("export-btn");

function importFile() {
  var file = document.getElementById("input-file").files[0];
  if (file) {
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
      document.getElementById("input-file").innerHTML = JSON.parse(
        evt.target.result
      );
      console.log(JSON.parse(evt.target.result));
    };
    reader.onerror = function (evt) {
      document.getElementById("input-file").innerHTML = "error reading file";
    };
  }
}
importBtn.addEventListener("click", importFile);

function saveStaticDataToFile() {
  const exportData = localStorage.getItem("petArr");
  let blob = new Blob([exportData], {
    type: ".json",
  });
  saveAs(blob, "static.json");
}
exportBtn.addEventListener("click", saveStaticDataToFile);
