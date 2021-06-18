export default ({ store, redirect }) => {
    if (!store.getters['roles/isAdmin']) {
        return redirect('/');
    }
};
