<template>
    <v-container fluid>
        <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="5"
            class="elevation-1"
        >
            <template #top>
                <v-toolbar flat>
                    <v-toolbar-title>User List</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer />
                    <v-btn
                        class="mx-2"
                        fab
                        dark
                        color="indigo"
                        @click="$emit('edit')"
                    >
                        <v-icon dark> mdi-plus </v-icon>
                    </v-btn>
                </v-toolbar>
            </template>
            <template #[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="$emit('edit', item)">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="$emit('delete', item)">
                    mdi-delete
                </v-icon>
            </template>
            <template #no-data>
                <v-alert dense class="my-6" border="left" type="warning">
                    No data
                </v-alert>
                <v-btn color="primary" class="my-6" @click="$emit('reset')">
                    Reset
                </v-btn>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
export default {
    name: 'UserList',
    props: {
        items: { type: Array, required: true }
    },
    data() {
        return {
            chosenItem: null,
            headers: [
                {
                    text: 'First Name',
                    value: 'firstName'
                },
                {
                    text: 'Last Name',
                    value: 'lastName'
                },
                {
                    text: 'Email',
                    value: 'email'
                },
                {
                    text: 'Birth Date',
                    value: 'birthDate'
                },
                {
                    text: 'Created At',
                    value: 'createdAt'
                },
                { text: 'Actions', value: 'actions', sortable: false }
            ]
        };
    }
};
</script>
