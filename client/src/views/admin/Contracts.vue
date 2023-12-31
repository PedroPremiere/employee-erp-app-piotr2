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
        <v-dialog v-model="isContractDialogOpen" persistent max-width="600px">
            <contract-form
                :selected-contract="selectedContract"
                @save="onSaveContract"
                @close="onCloseContractForm"
            />
        </v-dialog>
        <v-dialog
            v-if="selectedContract"
            v-model="isDeleteDialogOpen"
            max-width="500px"
        >
            <delete-contract-form
                :contract="selectedContract"
                @delete="onDeleteContract"
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
    data() {
        return {
            loaded: false,
            selectedContract: {},
            isDeleteDialogOpen: false,
            isContractDialogOpen: false,
            isErrorDialogOpen: false,
            error: {}
        };
    },
    computed: {
        ...mapGetters({
            contracts: 'contracts/items'
        })
    },
    mounted() {
        this.load();
    },
    methods: {
        ...mapActions({
            getContracts: 'contracts/index',
            removeContracts: 'contracts/remove',
            saveContracts: 'contracts/save'
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
        async onSaveContract(contract) {
            this.isContractDialogOpen = false;

            try {
                await this.saveContracts(contract);
            } catch (error) {
                console.error(error);
                this.error = error;
                this.isErrorDialogOpen = true;

                this.$notify({
                    group: 'errors',
                    title: 'Error',
                    text: 'Something went wrong',
                    type: 'error'
                });
            }

            this.selectedContract = {};
        },
        onCloseContractForm() {
            this.isContractDialogOpen = false;
            this.selectedContract = {};
        },
        async onDeleteContract() {
            this.isDeleteDialogOpen = false;

            try {
                await this.removeContracts(this.selectedContract);
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
