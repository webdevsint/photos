import photos from "../data.json" assert { type: "json" };

const url = location.href;
const id = url.split("/")[4];

document.title = `Photo - ${id}`;

const photo = photos.filter((photo) => photo.id === id)[0];

if (photo) {
  const img = document.createElement("img");

  img.src = photo.path;
  img.id = photo.id;

  document.querySelector(".img-container").appendChild(img);

  window.onload = getExif;
} else {
  document.querySelector(".meta-container").innerHTML =
    "Oops, we don't have this photo. <a href='/'>Return home</a>";
}

function getExif() {
  const file = document.getElementById(photo.id);

  EXIF.getData(file, function () {
    const MetaData = EXIF.getAllTags(this);

    document.querySelector(".make").innerHTML = MetaData.Make;

    if (MetaData.Model.includes(MetaData.Make)) {
      document.querySelector(".model").innerHTML = MetaData.Model.replace(
        MetaData.Make,
        ""
      );
    } else {
      document.querySelector(".model").innerHTML = MetaData.Model;
    }

    document.querySelector(".focal-length").innerHTML =
      MetaData.FocalLength + "mm";
    document.querySelector(".fnumber").innerHTML = "f/" + MetaData.FNumber;
    document.querySelector(
      ".shutterspeed"
    ).innerHTML = `${MetaData.ExposureTime.numerator}/${MetaData.ExposureTime.denominator}`;
    document.querySelector(".iso").innerHTML =
      "ISO " + MetaData.ISOSpeedRatings;
    document.querySelector(
      ".resolution"
    ).innerHTML = `${MetaData.PixelXDimension}x${MetaData.PixelYDimension}`;
    document.querySelector(".flash").innerHTML = MetaData.Flash;

    if (MetaData.ExposureBias !== 0) {
      document.querySelector(".exposure").innerHTML =
        "EXP " + MetaData.ExposureBias;
    }

    document.querySelector(".status").style.display = "none";
    document.querySelector("main").style.display = "block";
  });
}
