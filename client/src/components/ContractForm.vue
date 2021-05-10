<template>
    <v-card>
        <v-card-title>
            <span class="headline">Contract</span>
        </v-card-title>
        <v-container>
            <v-row>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="contract.position"
                        label="Position*"
                        required
                    />
                </v-col>
                <v-col cols="12">
                    <user-search-box v-model="contract.userId" />
                </v-col>
                <v-menu
                    ref="menuStartDate"
                    v-model="menuStartDate"
                    :close-on-content-click="false"
                    :return-value.sync="contract.startDate"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                    <template #[`activator`]="{ on, attrs }">
                        <v-text-field
                            v-model="contract.startDate"
                            label="Start Date*"
                            required
                            readonly
                            v-bind="attrs"
                            prepend-icon="mdi-calendar"
                            v-on="on"
                        />
                    </template>
                    <v-date-picker
                        v-model="contract.startDate"
                        no-title
                        scrollable
                    >
                        <v-spacer />
                        <v-btn
                            text
                            color="primary"
                            @click="menuStartDate = false"
                        >
                            Cancel
                        </v-btn>
                        <v-btn text color="primary" @click="setStartDate">
                            OK
                        </v-btn>
                    </v-date-picker>
                </v-menu>
                <v-menu
                    ref="menuEndDate"
                    v-model="menuEndDate"
                    :close-on-content-click="false"
                    :return-value.sync="contract.endDate"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                    <template #[`activator`]="{ on, attrs }">
                        <v-text-field
                            v-model="contract.endDate"
                            label="End Date*"
                            required
                            readonly
                            v-bind="attrs"
                            prepend-icon="mdi-calendar"
                            v-on="on"
                        />
                    </template>
                    <v-date-picker
                        v-model="contract.endDate"
                        no-title
                        scrollable
                    >
                        <v-spacer />
                        <v-btn
                            text
                            color="primary"
                            @click="menuEndDate = false"
                        >
                            Cancel
                        </v-btn>
                        <v-btn text color="primary" @click="setEndDate">
                            OK
                        </v-btn>
                    </v-date-picker>
                </v-menu>
            </v-row>
        </v-container>
        <v-card-text>
            <v-container>
                <v-row> contract form </v-row>
            </v-container>
            <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="close">
                <span> Close </span>
            </v-btn>
            <v-btn color="blue darken-1" text @click="save">
                <span>Save </span>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate';
import UserSearchBox from '@/components/UserSearchBox';

//@todo : validation (next PR)

export default {
    name: 'ContractForm',
    components: { UserSearchBox },
    mixins: [validationMixin],
    props: {
        selectedContract: { type: Object, default: () => ({}) }
    },
    data() {
        const defaultForm = {
            position: '',
            userId: '',
            startDate: '',
            endDate: ''
        };

        return {
            defaultForm,
            menuStartDate: false,
            menuEndDate: false,
            contract: defaultForm,
            selectedUser: {}
        };
    },
    watch: {
        selectedContract: {
            handler(selectedContract) {
                if (selectedContract) {
                    this.contract = { ...selectedContract };
                }
            },
            immediate: true
        }
    },
    methods: {
        setEndDate() {
            this.$refs.menuEndDate.save(this.contract.endDate);
        },
        setStartDate() {
            this.$refs.menuStartDate.save(this.contract.startDate);
        },
        reset() {
            this.contract = { ...this.defaultForm };
        },
        save() {
            this.$emit('save', this.contract);
            this.reset();
        },
        close() {
            this.$emit('close');
            this.reset();
        }
    }
};
</script>
