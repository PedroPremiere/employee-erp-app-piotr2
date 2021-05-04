<template>
    <v-container fluid>
        <v-row class="text-center">
            <user-list
                v-if="loaded"
                :items="users"
                @edit="onEdit"
                @delete="onDelete"
                @reset="load"
            />
            <v-container v-else>
                <v-skeleton-loader
                    class="mx-auto"
                    type="table-heading, list-item-two-line, image, table-tfoot"
                />
            </v-container>
        </v-row>
        <v-dialog v-model="isUserDialogOpen" persistent max-width="600px">
            <user-form
                :selected-user="selectedUser"
                @save="onSaveUser"
                @close="onCloseUserForm"
            />
        </v-dialog>
        <v-dialog
            v-if="selectedUser"
            v-model="isDeleteDialogOpen"
            max-width="500px"
        >
            <delete-user-form
                :user="selectedUser"
                @delete="onDeleteUser"
                @close="onCloseDeleteUser"
            />
        </v-dialog>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import UserList from '@/components/UserList';
import UserForm from '@/components/UserForm';
import DeleteUserForm from '@/components/DeleteUserForm';

export default {
    name: 'Users',
    components: {
        UserList,
        UserForm,
        DeleteUserForm
    },
    data() {
        return {
            loaded: false,
            isUserDialogOpen: false,
            isDeleteDialogOpen: false,
            selectedUser: {}
        };
    },
    computed: {
        ...mapGetters({
            users: 'users/items'
        })
    },
    mounted() {
        this.load();
    },
    methods: {
        async load() {
            try {
                await this.getUsers();

                this.loaded = true;
            } catch (error) {
                console.error(error);
            }
        },
        ...mapActions({
            getUsers: 'users/index',
            removeUser: 'users/remove',
            saveUser: 'users/save'
        }),
        async onSaveUser(user) {
            this.isUserDialogOpen = false;
            await this.saveUser(user);
            this.selectedUser = {};
        },
        onCloseUserForm() {
            this.isUserDialogOpen = false;
            this.selectedUser = {};
        },
        async onDeleteUser() {
            this.isDeleteDialogOpen = false;
            await this.removeUser(this.selectedUser);
        },
        onCloseDeleteUser() {
            this.isDeleteDialogOpen = false;
        },
        onEdit(user) {
            this.selectedUser = user;
            this.isUserDialogOpen = true;
        },
        onDelete(user) {
            this.isDeleteDialogOpen = true;
            this.selectedUser = user;
        }
    }
};
</script>
