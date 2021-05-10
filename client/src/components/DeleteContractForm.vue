<template>
    <v-card>
        <v-card-title class="headline">
            Are you sure you want to <p>delete this contract?</p>
        </v-card-title>
        <v-list-item-subtitle v-if="contract" class="text-center">
            <p>
                Name :
                <b>
                    {{ contract.user.firstName }}
                    {{ contract.user.lastName }}
                </b>
                Position :
                <b>
                    {{ contract.position }}
                </b>
            </p>
            <p>
                <v-divider vertical></v-divider>
                Start Date :
                <b>
                    {{ contract.startDate }}
                </b>
                <v-divider vertical></v-divider>
                End Date :
                <b>
                    {{ contract.endDate }}
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
    name: 'DeleteContractForm',
    props: {
        contract: { type: Object, required: true }
    }
};
</script>
