"use strict";

// ------------------ Variables ------------------
var ImageName, imageUrl;
var files = [];
var reader = new FileReader(); // ------------------- Selection process ----------

document.getElementById("select").onclick = function (e) {
  var input = document.createElement("input");
  input.type = "file";
  input.click();

  input.onchange = function (e) {
    files = e.target.files;

    reader.onload = function () {
      document.getElementById("my_img").src = reader.result;
    };

    reader.readAsDataURL(files[0]);
  };

  input.click();
}; // ----------------------- Upload picture to storage ----------


document.getElementById("upload").onclick = function () {
  ImageName = document.getElementById("namebox").value;
  var uploadTask = firebase.storage().ref("Images" + ImageName + ".png").put(files[0]);
  uploadTask.on("state_changed", function (snapshot) {
    var progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
    document.getElementById("UpProgress").innerHTML = "Upload" + progress + "%";
  }, // ----------------------- Error handling ----------
  function (error) {
    alert("error in saving the image");
  }, // ----------------------- submit image link to database ----------
  function () {
    uploadTask.snapshot.ref.getDownloadURl().then(function (url) {
      imageUrl = url;
      firebase.database().ref("Pictures/" + ImageName).set({
        Name: ImageName,
        Link: imageUrl
      });
      alert("image added successfully");
    });
  });
};