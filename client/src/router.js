import Vue from 'vue';
import Router from 'vue-router';

const HelloWorld = () => import('@/views/HelloWorld');
const Main = () => import('@/views/Main');
const Login = () => import('@/views/Login');
const Users = () => import('@/views/admin/Users');

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
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
            component: Users
        }
    ]
});
