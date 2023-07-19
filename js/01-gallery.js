import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryListEl = document.querySelector(".gallery");

const markup = galleryItems
  .map(({ preview, original, description }) => {
    return `<li class="gallery__item">
  <a class="gallery__link" href="large-image.jpg">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
  })
  .join("");

galleryListEl.insertAdjacentHTML("beforeend", markup);

galleryListEl.addEventListener("click", onPictureClick);

function onPictureClick(e) {
  event.preventDefault();

  if (e.target.nodeName !== "IMG") {
    return;
  }

  const instance = basicLightbox.create(
    `<img src="${e.target.dataset.source}" width="800" height="600">`,
    {
      onShow() {
        galleryListEl.addEventListener("keydown", onKeyDown);
      },
      onClose() {
        galleryListEl.removeEventListener("keydown", onKeyDown);
      },
    }
  );
  instance.show();

  function onKeyDown(e) {
    if (e.code !== "Escape") {
      return;
    }

    instance.close();
  }
}
