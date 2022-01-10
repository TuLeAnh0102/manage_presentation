import React from 'react';
const Login = React.lazy(() => import('./views/Pages/LoginPage/LoginPage'));
const ManageContent= React.lazy(() => import('./views/Pages/QuanTriNoiDung/QuanTriNoiDung'));
const DetailContent = React.lazy(() => import('./views/Pages/QuanTriNoiDung/ChiTietNoiDung'));
const SlideShow = React.lazy(() => import('./views/Pages/Slide_IOC/SlideShow'));
const User = React.lazy(() => import('./views/Pages/User/User'));
const routes = [
  { path: '/', exact: true, name: 'Trang chủ', component: ManageContent },
  { path: '/login', name: 'Login', component: Login },
  { path: '/quan-tri-noi-dung', name: 'Manager', component: ManageContent},
  { path: '/quan-tri-chi-tiet-noi-dung/:id', name: 'Detail', component: DetailContent},
  { path: '/slide-show/:id', name: 'Slide show', component: SlideShow},
  { path: '/quan-tri-tai-khoan',name: 'Quản trị người dùng', component: User},
];

export default routes;
