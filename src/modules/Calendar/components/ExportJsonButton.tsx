import { ITask } from '../../../interfaces/calendar.interfaces';

const ExportJsonButton = ({ dataObject }: { dataObject: ITask[] }) => {
  const exportToJsonFile = () => {
    const jsonData = JSON.stringify(dataObject, null, 2);

    const blob = new Blob([jsonData], { type: 'application/json' });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;

    a.download = 'data.json';

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return <button onClick={exportToJsonFile}>Export as JSON</button>;
};

export default ExportJsonButton;
