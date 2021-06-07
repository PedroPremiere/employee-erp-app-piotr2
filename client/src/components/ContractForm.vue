<template>
    <v-card>
        <v-toolbar class="px-2" color="primary" dark> Contract </v-toolbar>
        <v-container>
            <v-row class="py-3 px-3">
                <v-col cols="6">
                    <v-text-field
                        v-model="contract.position"
                        :error-messages="contractPositionErrors"
                        label="Position*"
                        required
                        @input="$v.contract.position.$touch"
                    />
                </v-col>
                <v-col cols="6">
                    <v-select
                        v-model="contract.vacationDaysPerYear"
                        :items="availableVacationPerYear"
                        item-text="vacation days per year"
                        item-value="abbr"
                        label="vacation days per year"
                        :error-messages="vacationsErrors"
                        return-object
                        single-line
                        @blur="$v.contract.vacationDaysPerYear.$touch"
                    ></v-select>
                </v-col>
                <v-col cols="12">
                    <user-search-box
                        v-model="contract.userId"
                        :error-messages="userIdErrors"
                        @input="$v.contract.userId.$touch"
                        @blur="$v.contract.userId.$touch"
                    />
                </v-col>
                <v-col cols="12">
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
                                :error-messages="startDateErrors"
                                label="Start Date*"
                                required
                                readonly
                                v-bind="attrs"
                                prepend-icon="mdi-calendar"
                                v-on="on"
                                @input="$v.contract.startDate.$touch"
                                @blur="$v.contract.startDate.$touch"
                            />
                        </template>
                        <v-date-picker
                            :key="contract.userId"
                            v-model="contract.startDate"
                            no-title
                            scrollable
                            :max="maxStartDate"
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
                </v-col>
                <v-col cols="12">
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
                                :error-messages="endDateErrors"
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
                            :min="minEndDate"
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
                </v-col>
            </v-row>
        </v-container>
        <v-card-actions>
            <v-spacer />
            <v-btn class="mx-5" color="blue darken-1" text @click="close">
                <span> Close </span>
            </v-btn>
            <v-btn
                color="blue darken-1"
                text
                :disabled="$v.$invalid"
                @click="save"
            >
                <span>Save </span>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { mapGetters, mapActions } from 'vuex';
import UserSearchBox from '@/components/UserSearchBox';
import contractValidatorMixin from '@/validators/contract.mixin';

export default {
    name: 'ContractForm',
    components: { UserSearchBox },
    mixins: [validationMixin, contractValidatorMixin],
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
            availableVacationPerYear: [20, 26],
            menuStartDate: false,
            menuEndDate: false,
            contract: defaultForm,
            selectedUser: {}
        };
    },

    computed: {
        ...mapGetters({
            userContracts: 'userContracts/items'
        })
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
        ...mapActions({
            saveContract: 'contracts/save'
        }),
        setEndDate() {
            this.$refs.menuEndDate.save(this.contract.endDate);
        },
        setStartDate() {
            this.$refs.menuStartDate.save(this.contract.startDate);
        },
        reset() {
            this.contract = { ...this.defaultForm };
            this.$v.$reset();
        },
        async save() {
            try {
                this.$v.$touch();

                if (this.$v.$invalid) {
                    return;
                }

                await this.saveContract(this.contract);

                this.$notify({
                    group: 'errors',
                    title: 'success',
                    text: 'Contract has been saved',
                    type: 'success'
                });

                this.$emit('close');
            } catch (error) {
                console.error(error);

                this.$notify({
                    group: 'errors',
                    title: 'Error',
                    text: 'Something went wrong',
                    type: 'error'
                });

                this.parseApiErrors(error);
            }

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
