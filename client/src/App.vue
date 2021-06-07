<template>
    <v-app>
        <component :is="component" />
    </v-app>
</template>

<script>
import Logged from '@/layouts/Logged';
import Default from '@/layouts/Default';

import { mapGetters } from 'vuex';

export default {
    name: 'App',
    components: { Default, Logged },
    computed: {
        ...mapGetters({
            loggedUser: 'auth/user'
        }),
        component() {
            if (!this.loggedUser) {
                return Default;
            }

            return Logged;
        }
    }
};
</script>
<style>
a {
    text-decoration: none;
}
</style>
