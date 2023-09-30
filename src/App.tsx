import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./containers/shared/Loading";
const PhoneListing = React.lazy(() => import("./pages/list"));
const PhoneCreate = React.lazy(() => import("./pages/create"));

function App() {
  return (
    <React.Suspense fallback={<Loading />}>
      <Router>
        <Routes>
          <Route path="/" element={<PhoneListing />}></Route>
          <Route path="/:id" element={<PhoneCreate />}></Route>
          <Route path="/create" element={<PhoneCreate />}></Route>
        </Routes>
      </Router>
    </React.Suspense>
  );
}

export default App;
