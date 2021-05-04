<template>
    <v-container fluid>
        <v-row class="text-center">
            <user-list
                v-if="loaded"
                :items="users"
                @edit="onEdit"
                @delete="onDelete"
                @reset="load"
                @new="onNew"
            />
            <v-container v-else>
                <v-skeleton-loader
                    class="mx-auto"
                    type="table-heading, list-item-two-line, image, table-tfoot"
                />
            </v-container>
        </v-row>
        <v-dialog
            v-model="isUserDialogOpen"
            v-if="selectedUser"
            persistent
            max-width="600px"
        >
            <user-form
                :selected-user="selectedUser"
                @save="onSaveUser"
                @close="onCloseUpdateUser"
            />
        </v-dialog>
        <v-dialog v-model="isNewDialogOpen" persistent max-width="600px">
            <user-form
                with-password
                @save="onSaveUser"
                @close="onCloseNewUser"
            />
        </v-dialog>
        <v-dialog
            v-model="isDeleteDialogOpen"
            v-if="selectedUser"
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
            isNewDialogOpen: false,
            selectedUser: false
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
            this.isNewDialogOpen = false;
            await this.saveUser(user);
            this.selectedUser = null;
        },
        onCloseUpdateUser() {
            this.isUserDialogOpen = false;
            this.selectedUser = null;
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
        },
        onNew() {
            this.isNewDialogOpen = true;
        },
        onCloseNewUser() {
            this.isNewDialogOpen = false;
        }
    }
};
</script>
