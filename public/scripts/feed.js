import photos from "../data.json" assert { type: "json" };

photos.forEach((photo) => {
  const a = document.createElement("a");
  const img = document.createElement("img");

  a.href = `/photo/${photo.id}`;

  img.src = photo.path;

  a.appendChild(img);

  document.querySelector(".img-container").appendChild(a);
});

document.querySelector(".status").style.display = "none";