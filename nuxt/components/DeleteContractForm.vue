<template>
    <v-card>
        <v-toolbar class="px-2 mb-5" color="pink " dark>
            <h3 align="center" justify="center">
                <v-icon large> mdi-book-remove </v-icon>
                Are you sure you want to delete this contract?
            </h3>
        </v-toolbar>
        <v-list-item-subtitle v-if="contract" class="text-center">
            <p>
                Name :

                <v-chip class="ma-2" color="red" text-color="white">
                    <b>
                        {{ contract.user.firstName }}
                        {{ contract.user.lastName }}
                    </b>
                </v-chip>

                Position :
                <v-chip class="ma-2" color="red" text-color="white">
                    <b>
                        {{ contract.position }}
                    </b>
                </v-chip>
            </p>
            <p>
                <v-divider vertical></v-divider>
                Start Date :
                <v-chip class="ma-2" color="red" text-color="white">
                    <b> {{ contract.startDate }} </b>
                </v-chip>

                <v-divider vertical></v-divider>
                End Date :
                <v-chip class="ma-2" color="red" text-color="white">
                    <b> {{ contract.endDate }} </b>
                </v-chip>
            </p>
        </v-list-item-subtitle>
        <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="$emit('close')">
                Cancel
            </v-btn>
            <v-btn color="blue darken-1" text @click="deleteContract">
                OK
            </v-btn>
            <v-spacer />
        </v-card-actions>
    </v-card>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'DeleteContractForm',
    props: {
        contract: { type: Object, required: true }
    },
    methods: {
        ...mapActions({
            removeContract: 'contracts/remove'
        }),
        deleteContract() {
            try {
                this.removeContract(this.contract);
                this.$emit('close');

                this.$notify({
                    group: 'errors',
                    title: 'Deleted',
                    text: 'Item has been removed',
                    type: 'success'
                });
            } catch (error) {
                console.error(error);
                this.$notify({
                    group: 'errors',
                    title: 'Error',
                    text: 'Something went wrong',
                    type: 'error'
                });
            }
        }
    }
};
</script>
