const upload = document.getElementById('upload');
const previewImage = document.getElementById('previewImage');
const imageCard = document.getElementById('imageCard');
const oldSize = document.getElementById('oldSize');
const newSize = document.getElementById('newSize');
const downloadBtn = document.getElementById('downloadBtn');
const compressBtn = document.getElementById('compressBtn');
const deleteBtn = document.getElementById('deleteBtn');
const qualityRange = document.getElementById('qualityRange');
const qualityValue = document.getElementById('qualityValue');

let selectedFile;

qualityRange.addEventListener('input', () => {
  qualityValue.innerText = qualityRange.value + '%';
});

upload.addEventListener('change', (e) => {

  selectedFile = e.target.files[0];

  if(selectedFile){

    imageCard.style.display = 'block';

    previewImage.src = URL.createObjectURL(selectedFile);

    oldSize.innerText = 'Original Size: ' + (selectedFile.size / 1024).toFixed(2) + ' KB';
  }

});

compressBtn.addEventListener('click', async () => {

  if(!selectedFile){
    alert('Upload image first');
    return;
  }

  const quality = qualityRange.value / 100;

  const options = {
    maxSizeMB: quality,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  };

  try {

    const compressedFile = await imageCompression(selectedFile, options);

    newSize.innerText = 'Compressed Size: ' + (compressedFile.size / 1024).toFixed(2) + ' KB';

    const compressedURL = URL.createObjectURL(compressedFile);

    downloadBtn.href = compressedURL;
    downloadBtn.download = 'compressed-image.jpg';

});
