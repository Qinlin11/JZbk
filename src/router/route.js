export default [
    {
        path: "/",
        redirect:'/home',
    },
    {
        path:"/home",
        component:() => import('@/views/Home')
    },
    {
        path: "/plan",
        component: () => import('@/views/Plan'),
    },
    {
        path:"/join",
        component:()=>import('@/views/Join')
    },
    {
        name:'group',
        path:"/group",
        component:()=>import('@/views/Group'),
        children:[
            {
                path:'activity',
                component:() => import('@/views/CreateResearsh/Activity')
            },
            {
                path:'member',
                props:({query})=>({item:query.item}),
                component:() =>import('@/views/CreateResearsh/Member'),
            },
            {
                path:'discuss',
                component:() => import('@/views/CreateResearsh/Discuss')
            },
            {
                path:'/group',
                redirect:'/group/member'
            }
        ]
    },
    {
        path: "/subject",
        component: () => import('@/views/Subject'),
        children:[
            {
                path:'detailsub',
                component:()=> import('@/views/Subject/detailSub')
            },
            {
                path:'detailtea',
                component:()=> import('@/views/Subject/detailTea')
            }
        ],
        redirect:'/subject/detailsub'
    },
    {
        path:'/person',
        component:()=>import('@/views/Person'),
        props:({query})=>({uid:query.uid,test:query.test}),
        redirect:'/person/fir',
        children:[
            {
                path:'fir',
                component:()=>import('@/views/Person/personFir')
            },
            {
                path:'sec',
                component:()=>import('@/views/Person/personSec')
            },
            {
                path:'thr',
                component:()=>import('@/views/Person/personThr')
            },
            {
                path:'fou',
                component:()=>import('@/views/Person/personFou')
            },
            {
                path:'fiv',
                component:()=>import('@/views/Person/personFiv')
            },
        ]
    },
    {
        path: "/prepare",
        component: () => import('@/views/Prepare'),
        props:({query})=>({uid:query.uid,test:query.test,showId:query.id}),
        children:[
            {
                path:"fir",
                component:()=>import('@/views/Prepare/prepareFir'),
            },
            {
                path:"sec",
                component:()=>import('@/views/Prepare/prepareSec')
            },
            {
                path:"thr",
                component:()=>import('@/views/Prepare/prepareThr')
            },
            {
                path:"fou",
                component:()=>import('@/views/Prepare/prepareFou')
            },
            {
                path:"fiv",
                component:()=>import('@/views/Prepare/prepareFiv')
            },
        ],
        redirect:'/prepare/fir'
    },
    {
        path:"/discuss",
        props:({query})=>({nanoid:query.nanoid}),
        component:() => import('@/views/Discuss')
    },
    {
        path:"/create",
        component:() => import('@/views/CreateResearsh'),
        children:[
            {
                path:'activity',
                component:() => import('@/views/CreateResearsh/Activity')
            },
            {
                path:'member',
                component:() =>import('@/views/CreateResearsh/Member'),
                props:({query})=>({item:query.item})
            },
            {
                path:'discuss',
                component:() => import('@/views/CreateResearsh/Discuss')
            },
            {
                path:'/create',
                redirect:'/create/member'
            }
        ]
    },
    {
        path:"/online",
        component:() => import('@/views/Online')
    }
]