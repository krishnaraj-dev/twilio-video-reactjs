const routers = [
  {
    component: 'Home',
    path: '/',
    exact: true,
  },
  {
    component: 'MainLayout',
    path: '/components',
    exact: false,
    childrens: [
      {
        component: 'Example',
        path: '/example',
        exact: true,
      },
    ],
  },
];

export default routers; 