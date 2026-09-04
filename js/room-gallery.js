(() => {
  const dialog = document.getElementById('room-lightbox');
  const image = document.getElementById('room-lightbox-image');
  const caption = document.getElementById('room-lightbox-caption');
  const close = document.getElementById('room-lightbox-close');
  if (!dialog || !image || !caption || !close) return;

  const openImage = anchor => {
    image.src = anchor.href;
    image.alt = anchor.querySelector('img')?.alt || '';
    caption.textContent = anchor.dataset.title || image.alt;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else window.open(anchor.href, '_blank', 'noopener');
  };

  document.querySelectorAll('[data-room-lightbox]').forEach(anchor => {
    anchor.addEventListener('click', event => {
      if (typeof dialog.showModal !== 'function') return;
      event.preventDefault();
      openImage(anchor);
    });
  });

  const closeDialog = () => {
    if (dialog.open) dialog.close();
  };

  close.addEventListener('click', closeDialog);
  dialog.addEventListener('click', event => {
    if (event.target === dialog) closeDialog();
  });
  dialog.addEventListener('close', () => {
    image.removeAttribute('src');
    caption.textContent = '';
  });
})();
