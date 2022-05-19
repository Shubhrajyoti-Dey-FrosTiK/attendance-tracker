import React from "react";
import { Routes, Route, Link } from "react-router-dom";

// Components
import Attendance from "./pages/Attendance";
import Register from "./pages/Register";
import Login from "./pages/Login";
import FaceAuthorization from "./pages/FaceAuthorization";

// Redux
import { useSelector } from "react-redux";
import { selectUser } from "./redux/slices/User";

// Services
import { StorageService } from "./service/storage.service";

// React Query
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
  const user = useSelector(selectUser);
  const ss = new StorageService();
  console.log(ss.getFaceRecognized());

  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/faceAuthorization" element={<FaceAuthorization />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.Fragment>
  );
}

export default App;
