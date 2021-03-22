import Vue from 'vue';
import Router from 'vue-router';

const HelloWorld = () => import('./components/HelloWorld');
const Main = () => import('./components/Main');

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
        }
    ]
});
