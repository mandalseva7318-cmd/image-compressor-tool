const upload = document.getElementById('upload');
const preview = document.getElementById('preview');
const compressBtn = document.getElementById('compressBtn');
const downloadBtn = document.getElementById('downloadBtn');

let selectedFile;

upload.addEventListener('change', function (e) {
  selectedFile = e.target.files[0];

  if (selectedFile) {
    preview.src = URL.createObjectURL(selectedFile);
  }
});

compressBtn.addEventListener('click', async function () {

  if (!selectedFile) {
    alert('Please upload image first');
    return;
  }

  const options = {
    maxSizeMB: 0.3,
    maxWidthOrHeight: 1200,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(selectedFile, options);

    const compressedURL = URL.createObjectURL(compressedFile);

    downloadBtn.href = compressedURL;
    downloadBtn.download = 'compressed-image.jpg';
    downloadBtn.style.display = 'inline-block';

    alert('Image Compressed Successfully');

  } catch (error) {
    console.log(error);
  }
});