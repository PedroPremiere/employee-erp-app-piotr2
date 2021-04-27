<template>
    <v-card>
        <v-card-title class="headline">
            Are you sure you want to delete this user?
        </v-card-title>
        <v-list-item-subtitle v-if="user" class="text-center">
            <p>
                First Name :
                <b>
                    {{ user.firstName }}
                </b>
            </p>
            <p>
                Last Name :
                <b>
                    {{ user.lastName }}
                </b>
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
