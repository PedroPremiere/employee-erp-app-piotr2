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
                    <v-toolbar-title>Contracts List</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer />
                    <v-btn
                        v-if="isAdmin"
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
            <template v-if="isAdmin" #[`item.actions`]="{ item }">
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
import { mapGetters } from 'vuex';

export default {
    name: 'ContractList',
    props: {
        items: { type: Array, required: true }
    },
    data() {
        return {
            chosenItem: null,
            headers: [
                {
                    text: 'Position',
                    value: 'position'
                },
                {
                    text: 'First Name',
                    value: 'user.firstName'
                },
                {
                    text: 'Last Name',
                    value: 'user.lastName'
                },
                {
                    text: 'Employee mail',
                    value: 'user.email'
                },
                {
                    text: 'Start Date',
                    value: 'startDate'
                },
                {
                    text: 'End Date',
                    value: 'endDate'
                },
                {
                    text: 'Created At',
                    value: 'createdAt'
                },
                {
                    text: 'Vacation days per year',
                    value: 'vacationDaysPerYear'
                },
                {
                    text: 'Vacation days',
                    value: 'vacationDays'
                }
            ]
        };
    },
    computed: {
        ...mapGetters({
            loggedUser: 'auth/user'
        }),
        isAdmin() {
            return this.loggedUser.isAdmin;
        }
    },
    mounted() {
        if (this.isAdmin) {
            this.headers.push({
                text: 'Actions',
                value: 'actions',
                sortable: false
            });
        }
    },
    methods: {}
};
</script>
