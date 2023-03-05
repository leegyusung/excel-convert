import FileUploadComponent from "./component/FileUploadComponent";
import FileHeaderComponent from "./component/FileHeaderComponent";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <FileHeaderComponent />
      <FileUploadComponent />
    </div>
  );
}

export default App;
