import React, { useState, useEffect } from 'react';
import './App.css';


const getStudents = () => (
  fetch('http://localhost:5000/students')
    .then(response => response.json())
)


function App() {

  let [data, setData] = useState([])
  let [user, setUser] = useState('')

  useEffect(() => {
    getStudents().then(data => setData(data))
  }, [])

  const handleForm = (event) => {
    event.preventDefault();
    fetch('http://localhost:5000/students', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        user: user
      })
    })
      .then(response => {
        if (response.status === 201) {
          getStudents().then(data => {
            setData(data)
            setUser('')
          })
        }
      })
  }




  return (
    <div className="App">
      <h1>Wild students</h1>
      <form onSubmit={handleForm}>
        <input
          value={user}
          onChange={(event) => setUser(event.target.value)}
          placeholder='Student name...'
        />
        <button>Add student</button>
      </form>
      <h3>List of students</h3>
      {
        data.map((student, index) => (
          <p key={index}>{student.user}</p>
        ))
      }
    </div>
  );
}

export default App;
