<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app>
            <v-list>
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>

                    <v-list-item-title>Home</v-list-item-title>
                </v-list-item>

                <v-list-item v-for="(item, index) in links" :key="index" link>
                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>ERP SYSTEM</v-toolbar-title>
        </v-app-bar>

        <v-main>
            <router-view :key="$route.fullPath" />
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: 'App',

    components: {},

    data: () => ({
        links: [
            { title: 'Dashboard', icon: 'mdi-view-grid' },
            { title: 'Employees', icon: 'mdi-account' },
            { title: 'Contracts', icon: 'mdi-file-document' },
            { title: 'Vacations', icon: 'mdi-calendar-alert' }
        ],
        drawer: null
    })
};
</script>
