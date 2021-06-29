<template>
    <v-container>
        <p class="display-1 my-10 font-italic" v-if="loggedUser">
            Welcome {{ loggedUser.firstName }}
        </p>
        <v-row>
            <template>
                <v-col
                    class="mt-2 rounded-t white--text"
                    :class="categories.backgound"
                    cols="12"
                >
                    <strong class="display-1">{{ categories.title }}</strong>
                </v-col>
                <v-col
                    v-for="(subCategory, subIndex) in categories.subCategories"
                    :key="`_${subIndex}`"
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
            userCategories: {
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
                        link: '/vacations'
                    }
                ]
            },
            adminCategories: {
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
            }
        };
    },
    computed: {
        ...mapGetters({
            loggedUser: 'auth/user'
        }),
        categories() {
            return this.isAdmin ? this.adminCategories : this.userCategories;
        }
    }
};
</script>
