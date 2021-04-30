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
                :selected-user="userToUpdate"
                @save="confirmUserDialog"
                @close="closeUserDialog"
            />
        </v-dialog>

        <v-dialog v-model="isDeleteDialogOpen" max-width="500px">
            <delete-user-form
                :user="userToDelete"
                @delete="confirmUserDeleteDialog"
                @close="closeUserDeleteDialog"
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
            userToDelete: null,
            userToUpdate: null
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
            getUsers: 'users/index'
            //@todo
            //remove: 'users/remove',
            //update: 'users/update'
            //create: 'users/create'
        }),
        confirmUserDialog() {
            this.isUserDialogOpen = false;
            this.userToUpdate = null;
            //@todo
            //this.update(this.userToUpdate);
        },
        closeUserDialog() {
            this.isUserDialogOpen = false;
            this.userToUpdate = null;
        },

        confirmUserDeleteDialog() {
            this.isDeleteDialogOpen = false;
            //@todo
            //this.remove(this.userToDelete);
        },
        closeUserDeleteDialog() {
            this.isDeleteDialogOpen = false;
        },

        onEdit(user) {
            this.userToUpdate = user;
            this.isUserDialogOpen = true;
        },
        onDelete(user) {
            this.isDeleteDialogOpen = true;
            this.userToDelete = user;
        }
    }
};
</script>
