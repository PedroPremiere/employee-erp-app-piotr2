<template>
    <v-app>
        <div data-app>
            <v-navigation-drawer v-model="drawer" app>
                <v-list>
                    <v-list-item
                        v-for="(item, index) in links"
                        :key="index"
                        :href="item.link"
                    >
                        <v-list-item-icon>
                            <v-icon v-text="item.icon" />
                        </v-list-item-icon>
                        <v-list-item-title v-text="item.title" />
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>

            <v-app-bar absolute app>
                <v-app-bar-nav-icon @click="drawer = !drawer" />

                <v-toolbar-title centered>ERP SYSTEM</v-toolbar-title>
                <v-spacer />
                <no-ssr>
                    <v-menu bottom min-width="200px" rounded offset-y>
                        <template #[`activator`]="{ on }">
                            <v-btn icon x-large v-on="on">
                                <v-avatar color="brown" size="48">
                                    <span class="white--text headline">{{
                                        initials
                                    }}</span>
                                </v-avatar>
                            </v-btn>
                        </template>

                        <v-list-item-content class="justify-center white" nuxt>
                            <div class="mx-auto text-center">
                                <v-avatar color="brown">
                                    <span class="white--text headline">{{
                                        initials
                                    }}</span>
                                </v-avatar>
                                <h3>
                                    {{ loggedUser.firstName }}
                                    {{ loggedUser.lastName }}
                                </h3>
                                <p class="caption mt-1">{{
                                    loggedUser.email
                                }}</p>
                                <v-divider class="my-3" />
                            </div>
                            <v-btn
                                depressed
                                rounded
                                text
                                @click="$auth.logout()"
                            >
                                Log out
                            </v-btn>
                        </v-list-item-content>
                    </v-menu>
                </no-ssr>
            </v-app-bar>

            <v-main>
                <router-view :key="$route.fullPath" />
            </v-main>
            <notifications group="errors" />
        </div>
    </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'LayoutLogged',
    data() {
        return { drawer: null };
    },
    computed: {
        ...mapGetters({
            isAdmin: 'roles/isAdmin'
        }),
        loggedUser() {
            return this.$auth.user;
        },
        links() {
            const links = [
                { title: 'Dashboard', icon: 'mdi-view-grid', link: '/main' },
                {
                    title: 'Contracts',
                    icon: 'mdi-file-document',
                    link: '/contracts'
                },
                {
                    title: 'Vacation',
                    icon: 'mdi-calendar-alert',
                    link: '/vacations'
                }
            ];

            if (this.isAdmin) {
                links.push({
                    title: 'Employees',
                    icon: 'mdi-account',
                    link: '/users'
                });
            }

            return links;
        },
        initials() {
            const { firstName, lastName } = this.loggedUser;

            return `${firstName[0]} ${lastName[0]}`;
        }
    }
};
</script>
