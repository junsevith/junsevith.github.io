const imageUrls = [
  'https://picsum.photos/400/300?random=1',
  'https://picsum.photos/400/300?random=2',
  'https://picsum.photos/400/300?random=3',
  'https://picsum.photos/400/300?random=4',
  'https://picsum.photos/400/300?random=5',
];

const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImage = modal.querySelector('img');

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Nie udało się załadować ${url}`));
  });
}

Promise.allSettled(imageUrls.map(loadImage))
  .then(results => {
    results.forEach(result => {
      const div = document.createElement('div');
      div.className = 'photo';

      if (result.status === 'fulfilled') {
        const img = result.value;
        div.appendChild(img);

        div.addEventListener('click', () => {
          modalImage.src = img.src;
          modal.style.display = 'flex';
        });

      } else {
        div.innerHTML = `<span class="error">Błąd ładowania</span>`;
      }

      gallery.appendChild(div);
    });
  });

// Ukrywanie modala po kliknięciu w tło
modal.addEventListener('click', (event) => {
  if (event.target === modal || event.target === modalImage) {
    modal.style.display = 'none';
    modalImage.src = '';
  }
});
