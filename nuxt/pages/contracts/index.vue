<template>
    <v-container fluid>
        <contract-list
            v-if="loaded"
            :items="contracts"
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
            v-if="isAdmin"
            v-model="isContractDialogOpen"
            persistent
            max-width="600px"
            transition="dialog-bottom-transition"
        >
            <contract-form
                :selected-contract="selectedContract"
                @close="onCloseContractForm"
            />
        </v-dialog>
        <v-dialog
            v-if="selectedContract && isAdmin"
            v-model="isDeleteDialogOpen"
            transition="dialog-bottom-transition"
            max-width="500px"
        >
            <delete-contract-form
                :contract="selectedContract"
                @close="onCloseDeleteContract"
            />
        </v-dialog>
        <v-dialog v-model="isErrorDialogOpen" max-width="500px">
            <error-dialog :error="error" @close="isErrorDialogOpen = false" />
        </v-dialog>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ContractList from '@/components/ContractList';
import DeleteContractForm from '@/components/DeleteContractForm';
import ContractForm from '@/components/ContractForm';
import ErrorDialog from '@/components/ErrorDialog';

export default {
    name: 'Contracts',

    components: { ContractList, DeleteContractForm, ContractForm, ErrorDialog },
    layout: 'logged',
    data() {
        return {
            loaded: false,
            selectedContract: {},
            isDeleteDialogOpen: false,
            isContractDialogOpen: false,
            isErrorDialogOpen: false,
            error: new Error()
        };
    },
    computed: {
        ...mapGetters({
            contracts: 'contracts/items',
            isAdmin: 'roles/isAdmin'
        })
    },
    mounted() {
        this.load();
    },
    methods: {
        ...mapActions({
            getContracts: 'contracts/index'
        }),
        async load() {
            try {
                await this.getContracts();
                this.loaded = true;
            } catch (error) {
                console.error(error);
                this.$notify({
                    group: 'errors',
                    title: 'Error',
                    text: 'Something went wrong',
                    type: 'error'
                });
            }
        },
        onCloseContractForm() {
            this.isContractDialogOpen = false;
            this.selectedContract = {};
        },
        onCloseDeleteContract() {
            this.isDeleteDialogOpen = false;
        },
        onEdit(contract) {
            this.selectedContract = contract;
            this.isContractDialogOpen = true;
        },
        onDelete(contract) {
            this.isDeleteDialogOpen = true;
            this.selectedContract = contract;
        }
    }
};
</script>
