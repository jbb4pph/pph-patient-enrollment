import * as React from "react";
import * as ReactDOM from "react-dom/client";
import './styles/index.scss';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Root, Patients } from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  }, {
    path: "/patients",
    element: <Patients />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
