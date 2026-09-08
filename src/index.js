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
    element: <ProfilePage />,
  },
  {
    path: "request",
    element: <RequestPage />,
  },
  {
    path: "requestmgmt",
    element: <RequestMgmtPage />,
  },
  {
    path: "chat",
    element: <ChatPage />,
  },
  {
    path: "tasks",
    element: <TasksPage />,
  },
  {
    path: "checkout",
    element: <Checkout />,
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
