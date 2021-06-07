<template>
    <v-container>
        <p class="display-1 my-10 font-italic" v-if="loggedUser">
            Welcome {{ loggedUser.firstName }}
        </p>
        <v-row>
            <template v-for="(category, index) in categories" dark>
                <v-col
                    :key="index"
                    class="mt-2 rounded-t white--text"
                    :class="category.backgound"
                    cols="12"
                >
                    <strong class="display-1">{{ category.title }}</strong>
                </v-col>
                <v-col
                    v-for="(subCategory, subIndex) in category.subCategories"
                    :key="`${index}_${subIndex}`"
                    md="2"
                >
                    <a :href="subCategory.link" target="_blank">
                        <v-card :class="subCategory.background" outlined>
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <v-list-item-subtitle
                                        class="headline mb-1 text-center white--text"
                                    >
                                        {{ subCategory.title }}
                                    </v-list-item-subtitle>
                                    <v-icon size="125" class="white--text">
                                        {{ subCategory.icon }}
                                    </v-icon>
                                </v-list-item-content>
                            </v-list-item>
                        </v-card>
                    </a>
                </v-col>
            </template>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Dashboard',
    data() {
        return {
            isAdmin: false,
            categories: []
        };
    },
    computed: {
        ...mapGetters({
            loggedUser: 'auth/user'
        })
    },
    mounted() {
        this.load();
    },
    methods: {
        addLoginLogout() {
            const loginLogoutCategories = {
                title: 'Login/Logout',
                backgound: 'amber lighten-1',
                subCategories: []
            };

            if (this.loggedUser) {
                loginLogoutCategories.subCategories.push({
                    title: 'Log out',
                    icon: 'mdi-logout',
                    background: 'green darken-2',
                    link: '/login'
                });
            } else {
                loginLogoutCategories.subCategories.push({
                    title: 'Log in',
                    icon: 'mdi-login',
                    background: 'amber darken-2',
                    link: '/login'
                });
            }

            this.categories.push(loginLogoutCategories);
        },
        addUserCategories() {
            const userCategories = {
                title: 'My Profile',
                backgound: 'green lighten-3',

                subCategories: [
                    {
                        title: 'My data',
                        icon: 'mdi-account',
                        background: 'teal lighten-1',
                        link: '/profile'
                    },
                    {
                        title: 'My Contracts',
                        icon: 'mdi-book',
                        background: 'amber lighten-1',
                        link: '/contracts'
                    },
                    {
                        title: 'My Vacations',
                        icon: 'mdi-calendar',
                        background: 'deep-orange  lighten-1',
                        link: '/Vacations'
                    }
                ]
            };

            this.categories.push(userCategories);
        },
        addAdminCategories() {
            this.isAdmin = true;

            const adminCategories = {
                title: 'Admin',
                backgound: 'red lighten-3',

                subCategories: [
                    {
                        title: 'Users',
                        icon: 'mdi-account-supervisor',
                        background: 'deep-purple lighten-1',
                        link: '/users'
                    },
                    {
                        title: 'Contracts',
                        icon: 'mdi-book-account-outline',
                        background: 'cyan lighten-1',
                        link: '/contracts'
                    },
                    {
                        title: 'Vacations',
                        icon: 'mdi-calendar-account',
                        background: 'lime lighten-1',
                        link: '/vacations'
                    }
                ]
            };

            this.categories.push(adminCategories);
        },
        async load() {
            if (!this.loggedUser) {
                this.addLoginLogout();

                return;
            }

            this.addUserCategories();

            if (this.loggedUser.isAdmin) {
                this.addAdminCategories();
            }
        }
    }
};
</script>
