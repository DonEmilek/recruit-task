import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <header className='text-5xl text-center p-10'>
        <h1>BookStore</h1>
      </header>
      <main>
        <Routes>
          <Route exath path='/' element={<Home />}/>
        </Routes>
      </main>
      <footer>

      </footer>
    </div>
  );
}

export default App;
