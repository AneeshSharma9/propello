import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginPage from './pages/LoginPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignupPage from './pages/SignupPage';
import ExplorePage from './pages/ExplorePage';
import ProfilePage from './pages/ProfilePage';
import RequestPage from './pages/RequestPage';
import RequestMgmtPage from './pages/RequestMgmtPage';
import ChatPage from './pages/ChatPage';
import TasksPage from './pages/TasksPage';
import Checkout from './components/Checkout';
import ProtectedRoute from './components/ProtectedRoute';
import { Account } from './components/Account';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "signup",
    element: <SignupPage />,
  },
  {
    path: "explore",
    element: <ExplorePage />,
  },
  {
    path: "profile",
    element: <ProtectedRoute><ProfilePage /></ProtectedRoute>,
  },
  {
    path: "request",
    element: <ProtectedRoute><RequestPage /></ProtectedRoute>,
  },
  {
    path: "requestmgmt",
    element: <ProtectedRoute><RequestMgmtPage /></ProtectedRoute>,
  },
  {
    path: "chat",
    element: <ProtectedRoute><ChatPage /></ProtectedRoute>,
  },
  {
    path: "tasks",
    element: <ProtectedRoute><TasksPage /></ProtectedRoute>,
  },
  {
    path: "checkout",
    element: <ProtectedRoute><Checkout /></ProtectedRoute>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Account>
    <RouterProvider router={router} />
  </Account>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
