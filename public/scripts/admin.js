import photos from "../data.json" assert { type: "json" };

photos.forEach((photo) => {
  const div = document.createElement("div");
  const img = document.createElement("img");
  const btn = document.createElement("button");

  img.src = photo.path;

  btn.innerText = "Delete";
  btn.onclick = () => {
    showModal(photo.id);
  };

  div.appendChild(img);
  div.appendChild(btn);

  document.querySelector(".posts").appendChild(div);
});

function showModal(id) {
  document.querySelector(".post-id").innerText = id;
  document.querySelector(".modal-container").style.display = "flex";
}

setTimeout(() => {
  document.querySelector(".status").style.display = "none";
  document.querySelector(".posts").style.display = "grid";
}, 200);
