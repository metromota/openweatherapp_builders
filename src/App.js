import { Display } from './components/display'

function App() {
  return (
    <div className="App">

      <div className="CardApp">

        <div className="CardAppHeader">
          <h2>Weather App</h2>
        </div>

        <div className="CardAppBody">
          <Display />
        </div>

        <div className="CardAppFooter">
          <p>Builders Platform</p>
        </div>

      </div>

    </div>
  );
}

export default App;
