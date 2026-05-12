const upload = document.getElementById('upload');
const previewImage = document.getElementById('previewImage');
const previewCard = document.getElementById('previewCard');
const oldSize = document.getElementById('oldSize');
const newSize = document.getElementById('newSize');
const downloadBtn = document.getElementById('downloadBtn');
const compressBtn = document.getElementById('compressBtn');
const clearBtn = document.getElementById('clearBtn');
const qualityRange = document.getElementById('qualityRange');
const qualityValue = document.getElementById('qualityValue');

let selectedFile;

qualityRange.addEventListener('input', () => {
  qualityValue.innerText = qualityRange.value + '%';
});

upload.addEventListener('change', (e) => {

  selectedFile = e.target.files[0];

  if(selectedFile){

    previewCard.style.display = 'block';

    previewImage.src = URL.createObjectURL(selectedFile);

    oldSize.innerText = 'Original Size: ' + (selectedFile.size / 1024).toFixed(2) + ' KB';

    newSize.innerText = '';
  }

});

compressBtn.addEventListener('click', async () => {

  if(!selectedFile){
    alert('Please upload image first');
    return;
  }

  compressBtn.innerText = 'Compressing...';

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

    compressBtn.innerText = 'Compress';

  } catch(error){

    console.log(error);

    compressBtn.innerText = 'Compress';
  }

});

clearBtn.addEventListener('click', () => {

  selectedFile = null;

  previewCard.style.display = 'none';

  upload.value = '';

});
