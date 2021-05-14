<template>
    <v-card>
        <v-toolbar color="primary" dark> Contract </v-toolbar>
        <v-container>
            <v-row class="py-3 px-3">
                <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="contract.position"
                        :error-messages="contractPositionErrors"
                        label="Position*"
                        required
                        @input="$v.contract.position.$touch"
                    />
                </v-col>
                <v-col cols="12">
                    <user-search-box
                        v-model="contract.userId"
                        :error-messages="userIdErrors"
                        @input="$v.contract.userId.$touch"
                        @blur="$v.contract.userId.$touch"
                    />
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
                        :allowed-dates="allowedDatesStart"
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
                        :allowed-dates="allowedDatesEnd"
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
            <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="close">
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

                    if (selectedContract.userId) {
                        this.loadContracts(selectedContract.userId);
                    }
                }
            },
            immediate: true
        },
        'contract.userId'(userId) {
            this.loadContracts(userId);
        }
    },
    methods: {
        ...mapActions({
            loadContracts: 'userContracts/filterByUser'
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
