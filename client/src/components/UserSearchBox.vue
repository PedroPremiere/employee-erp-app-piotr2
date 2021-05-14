<template>
    <v-combobox
        v-model="selectedUser"
        :items="users"
        :search-input.sync="searchedWord"
        :error-messages="errorMessages"
        label="Employee"
        value="selectedUser"
        item-text="id"
        no-filter
        return-object
    >
        <template #selection="data">
            {{ data.item.firstName }}
            {{ data.item.lastName }}
            {{ data.item.email }}
        </template>
        <template #item="data">
            <v-list-item-content>
                <v-list-item-title>
                    {{ data.item.firstName }}
                    {{ data.item.lastName }}
                </v-list-item-title>
                <v-list-item-subtitle>
                    {{ data.item.email }}
                </v-list-item-subtitle>
            </v-list-item-content>
        </template>
    </v-combobox>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'UserSearchBox',
    props: {
        value: { type: String, default: () => '' },
        errorMessages: { type: Array, default: () => [] }
    },
    data() {
        return {
            selectedUser: {},
            searchedWord: ''
        };
    },
    computed: {
        ...mapGetters({
            users: 'users/items'
        })
    },
    watch: {
        searchedWord(value) {
            if (value) {
                clearTimeout(this.timerId);

                this.timerId = setTimeout(() => {
                    this.filterUsers(value);
                }, 250);
            }
        },
        selectedUser(user) {
            this.$emit('input', user ? user.id : null);
        },
        value: {
            handler() {
                this.load();
            },
            immediate: true
        }
    },
    methods: {
        ...mapActions({
            getUsers: 'users/index',
            filterUsers: 'users/filter'
        }),
        async load() {
            try {
                if (this.value) {
                    await this.filterUsers(this.value);
                }

                this.setSelectedUserById(this.value);
            } catch (error) {
                console.error(error);
                this.$notify({
                    group: 'errors',
                    title: 'Error',
                    text: 'Something went wrong',
                    type: 'error'
                });
            }
        },
        setSelectedUserById(userId) {
            if (userId) {
                this.selectedUser = this.users.find(user => user.id == userId);

                return;
            }

            this.selectedUser = {};
        }
    }
};
</script>
