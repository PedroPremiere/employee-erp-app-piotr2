<template>
    <v-container fluid>
        <vacations-list
            v-if="loaded"
            :items="vacations"
            @delete="onDelete"
            @edit="onEdit"
            @reset="load"
        />
        <v-container v-else>
            <v-skeleton-loader
                class="mx-auto"
                type="table-heading, list-item-two-line, image, table-tfoot"
            />
        </v-container>
        <v-dialog
            v-model="isVacationDialogOpen"
            persistent
            max-width="600px"
            transition="dialog-bottom-transition"
        >
            <vacation-form
                :selected-vacation="selectedVacation"
                @save="onSaveVacation"
                @close="onCloseVacationForm"
            />
        </v-dialog>
        <v-dialog
            v-if="selectedVacation"
            v-model="isDeleteDialogOpen"
            transition="dialog-bottom-transition"
            max-width="500px"
        >
            <delete-vacation-form
                :vacation="selectedVacation"
                @close="onCloseDeleteVacation"
            />
        </v-dialog>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import VacationForm from '@/components/VacationForm';
import DeleteVacationForm from '@/components/DeleteVacationForm';
import VacationsList from '@/components/VacationsList';

export default {
    name: 'Vacations',
    components: {
        VacationsList,
        VacationForm,
        DeleteVacationForm
    },
    data() {
        return {
            loaded: false,
            isVacationDialogOpen: false,
            isDeleteDialogOpen: false,
            selectedVacation: {}
        };
    },
    computed: {
        ...mapGetters({
            vacations: 'vacations/items',
            isAdmin: 'auth/isAdmin'
        })
    },
    mounted() {
        this.load();
    },
    methods: {
        ...mapActions({
            getVacations: 'vacations/index'
        }),
        async load() {
            try {
                await this.getVacations();

                this.loaded = true;
            } catch (error) {
                console.error(error);
            }
        },
        onEdit(vacation) {
            this.selectedVacation = vacation;
            this.isVacationDialogOpen = true;
        },
        async onSaveVacation() {
            this.isVacationDialogOpen = false;
            this.selectedVacation = {};
        },
        onCloseVacationForm() {
            this.isVacationDialogOpen = false;
            this.selectedVacation = {};
        },
        onCloseDeleteVacation() {
            this.isDeleteDialogOpen = false;
        },
        onDelete(user) {
            this.isDeleteDialogOpen = true;
            this.selectedVacation = user;
        }
    }
};
</script>
