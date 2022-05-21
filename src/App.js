import React from 'react'
import Landing from './Quizzical/Landing';
import Quizzical from './Quizzical/Quizzical';

function App() {

  const [landing, setLanding] = React.useState(true)

  return (
    <>
      {landing ? <Landing setLanding={setLanding} /> : <Quizzical />} 
    </>
  )
}

export default App;
