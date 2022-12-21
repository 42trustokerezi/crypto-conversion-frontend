import logo from './logo.svg';
import './App.css';
import Converter from './CryptoConverter/Converter';
import RecordTable from './CryptoConverter/RecordTable';

function App() {
  return (
    <div className="App">
      <Converter/>
      <RecordTable/>
    </div>
  );
}

export default App;
