import React from 'react'

const App = () => {
  return (
    <div className=''>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
