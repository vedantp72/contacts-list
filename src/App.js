// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContactListing from './Components/ContactListing.js';
import ContactCreate from './Components/ContactCreate.js';
import ContactDetails from './Components/ContactDetails.js';
import ContactEdit from './Components/ContactEdit.js';

function App() {
  return (
  
    <div>
    <div className="App">
        <h4>React JS Contact Details</h4>
        </div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ContactListing />}></Route>
            <Route path="/contacts/create" element={<ContactCreate />}></Route>
            <Route path="/contacts/edit/:contid" element={<ContactEdit />}></Route>
            <Route path="/contacts/details/:contid" element={<ContactDetails/>}></Route>
          </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
