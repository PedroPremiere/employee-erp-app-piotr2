<template>
    <v-card>
        <v-card-title class="headline">
            Are you sure you want to <p>delete this vacation?</p>
        </v-card-title>
        <v-list-item-subtitle v-if="vacation" class="text-center">
            <p>
                Name :
                <b v-if="vacation.user">
                    {{ vacation.user.firstName }}
                    {{ vacation.user.lastName }}
                </b>
                Position :
                <b>
                    {{ vacation.position }}
                </b>
            </p>
            <p>
                <v-divider vertical></v-divider>
                Start Date :
                <b>
                    {{ vacation.startDate }}
                </b>
                <v-divider vertical></v-divider>
                End Date :
                <b>
                    {{ vacation.endDate }}
                </b>
            </p>
        </v-list-item-subtitle>
        <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="$emit('close')">
                Cancel
            </v-btn>
            <v-btn color="blue darken-1" text @click="deleteVacation">
                OK
            </v-btn>
            <v-spacer />
        </v-card-actions>
    </v-card>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'DeleteVacationForm',
    props: {
        vacation: { type: Object, required: true }
    },
    methods: {
        ...mapActions({
            removeVacation: 'vacations/remove'
        }),
        deleteVacation() {
            try {
                this.removeVacation(this.vacation);
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
