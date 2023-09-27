import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const PhoneListing = React.lazy(() => import("./pages/list"));
const PhoneCreate = React.lazy(() => import("./pages/create"));
const PhoneEdit = React.lazy(() => import("./pages/edit"));

// source https://blog.devgenius.io/implementing-react-router-v6-with-code-splitting-in-a-react-typescript-project-14d98e2cab79

function App() {
  const Loading = () => <p>Loading ...</p>;

  return (
    <React.Suspense fallback={<Loading />}>
      <Router>
        <Routes>
          <Route path="/" element={<PhoneListing />}></Route>
          <Route path="/:id" element={<PhoneEdit />}></Route>
          <Route path="/create" element={<PhoneCreate />}></Route>
        </Routes>
      </Router>
    </React.Suspense>
  );
}

export default App;
