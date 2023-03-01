import photos from "../data.json" assert { type: "json" };

const url = location.href;
const id = url.split("/")[4];

const photo = photos.filter((photo) => photo.id === id)[0];

const img = document.createElement("img");

img.style.width = "300px";
img.style.margin = "10px";
img.src = photo.path;
img.id = photo.id;

document.querySelector(".img-container").appendChild(img);

window.onload = getExif;

function getExif() {
  const file = document.getElementById(photo.id);

  EXIF.getData(file, function () {
    const MetaData = EXIF.getAllTags(this);

    document.querySelector(
      ".resolution"
    ).innerHTML = `${MetaData.PixelXDimension}x${MetaData.PixelYDimension}`;
    document.querySelector(".make").innerHTML =
      "Manufacturer: " + MetaData.Make;
    document.querySelector(".model").innerHTML = "Model: " + MetaData.Model;
    document.querySelector(".focal-length").innerHTML =
      MetaData.FocalLength + "mm";
    document.querySelector(".shutterspeed").innerHTML =
      `Shutterspeed: ${MetaData.ExposureTime.numerator}/${MetaData.ExposureTime.denominator}`;
    document.querySelector(".fnumber").innerHTML = "f/" + MetaData.FNumber;
    document.querySelector(".iso").innerHTML = "ISO" + MetaData.ISOSpeedRatings;
    document.querySelector(".flash").innerHTML = MetaData.Flash;

    if (MetaData.ExposureBias > 0) {
      document.querySelector(".exposure").innerHTML =
        "EXP: " + MetaData.ExposureBias;
    }
  });
}
