<template>
    <v-card>
        <v-toolbar class="px-2 mb-5" color="pink " dark>
            <h3 align="center" justify="center">
                <v-icon large> mdi-account-remove </v-icon>
                Are you sure you want to delete this user?
            </h3>
        </v-toolbar>
        <v-list-item-subtitle v-if="user" class="text-center">
            <p>
                <v-chip class="ma-2" color="red" text-color="white">
                    First Name :
                    <b> {{ user.firstName }} </b>
                </v-chip>
            </p>
            <p>
                <v-chip class="ma-2" color="red" text-color="white">
                    Last Name :
                    <b> {{ user.lastName }} </b>
                </v-chip>
            </p>
        </v-list-item-subtitle>
        <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="$emit('close')">
                Cancel
            </v-btn>
            <v-btn color="blue darken-1" text @click="$emit('delete')">
                OK
            </v-btn>
            <v-spacer />
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: 'DeleteUserForm',
    props: {
        user: { type: Object, required: true }
    }
};
</script>
