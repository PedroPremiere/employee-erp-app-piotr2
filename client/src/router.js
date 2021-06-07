import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

const Main = () => import('@/views/Main');
const Login = () => import('@/views/Login');

const Users = () => import('@/views/Users');
const Contracts = () => import('@/views/Contracts');
const Vacations = () => import('@/views/Vacations');
const Dashboard = () => import('@/views/Dashboard');


Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard
        },
        {
            path: '/main',
            name: 'Main',
            component: Main
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/users',
            name: 'users',
            component: Users,
            meta: {
                auth: true,
                adminOnly: true
            }
        },
        {
            path: '/contracts',
            name: 'contracts',
            component: Contracts,
            meta: {
                auth: true
            }
        },
        {
            path: '/vacations',
            name: 'vacations',
            component: Vacations,
            meta: {
                auth: true
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    const loggedUser = store.getters['auth/user'];
    const doesRouteRequiresAuth = to.matched.some(record => record.meta.auth);
    const isRouteAdminOnly = to.matched.some(record => record.meta.adminOnly);

    if (doesRouteRequiresAuth) {
        if (!loggedUser) {
            return next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            });
        }

        if (isRouteAdminOnly) {
            if (loggedUser.isAdmin) {
                return next();
            }

            return next({ name: 'Main' });
        }

        return next();
    }

    return next();
});

export default router;
