export default [{
    path: '/',
    redirect: '/myrecommend'
  },
  {
    path: '/myrank',
    component: () => import('_c/myrank/myrank')
  },
  {
    path: '/myrecommend',
    component: () => import('_c/myrecommend/myrecommend')
  },
  {
    path: '/mysinger',
    component: () => import('_c/mysinger/mysinger')
  },
  {
    path: '/mysearch',
    component: () => import('_c/mysearch/mysearch')
  },
]