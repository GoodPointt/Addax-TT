import { useState } from 'react';
import html2canvas from 'html2canvas';

const ExportAsImage = () => {
  const [downloaded, setDownloaded] = useState(false);

  const handleCapture = () => {
    setDownloaded(false);
    html2canvas(document.body).then(function (canvas) {
      const imageData = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.download = 'webpage.png';
      link.href = imageData;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      setDownloaded(true);
    });
  };

  return (
    <div>
      {downloaded && <span>✅</span>}
      <button onClick={handleCapture}>Export Calendar as Image</button>
    </div>
  );
};

export default ExportAsImage;
