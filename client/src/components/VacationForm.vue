<template>
    <v-card>
        <v-toolbar class="px-2" color="primary" dark> Vacation </v-toolbar>
        <v-container>
            <v-row class="py-3 px-3">
                <v-col cols="12" v-if="isAdmin">
                    <user-search-box
                        v-model="vacation.userId"
                        :error-messages="userIdErrors"
                        @input="$v.vacation.userId.$touch"
                        @blur="$v.vacation.userId.$touch"
                    />
                </v-col>

                <v-col cols="12" v-if="isAdmin">
                    <v-switch
                        v-model="vacation.isConfirmed"
                        label="Is Confirmed"
                    />
                </v-col>

                <v-col cols="12">
                    <v-menu
                        ref="menuStartDate"
                        v-model="menuStartDate"
                        :close-on-content-click="false"
                        :return-value.sync="vacation.startDate"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template #[`activator`]="{ on, attrs }">
                            <v-text-field
                                v-model="vacation.startDate"
                                :error-messages="startDateErrors"
                                label="Start Date*"
                                required
                                readonly
                                v-bind="attrs"
                                prepend-icon="mdi-calendar"
                                v-on="on"
                                @input="$v.vacation.startDate.$touch"
                                @blur="$v.vacation.startDate.$touch"
                            />
                        </template>
                        <v-date-picker
                            :key="vacation.userId"
                            v-model="vacation.startDate"
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
                        :return-value.sync="vacation.endDate"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template #[`activator`]="{ on, attrs }">
                            <v-text-field
                                v-model="vacation.endDate"
                                :error-messages="endDateErrors"
                                label="End Date*"
                                required
                                readonly
                                v-bind="attrs"
                                prepend-icon="mdi-calendar"
                                v-on="on"
                                @input="$v.vacation.endDate.$touch"
                                @blur="$v.vacation.endDate.$touch"
                            />
                        </template>
                        <v-date-picker
                            v-model="vacation.endDate"
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
                :disabled="$v.$invalid"
                color="blue darken-1"
                text
                @click="save"
            >
                <span>Save </span>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import vacationValidatorMixin from '@/validators/vacation.mixin';

import UserSearchBox from '@/components/UserSearchBox';

export default {
    name: 'VacationForm',
    components: { UserSearchBox },
    mixins: [validationMixin, vacationValidatorMixin],
    props: {
        selectedVacation: { type: Object, default: () => ({}) }
    },
    data() {
        const defaultForm = {
            userId: '',
            startDate: '',
            endDate: '',
            isConfirmed: false,
            user: {}
        };
        return {
            defaultForm,
            menuStartDate: false,
            menuEndDate: false,
            vacation: { ...defaultForm }
        };
    },
    computed: {
        ...mapGetters({
            loggedUser: 'auth/user',
            isAdmin: 'auth/isAdmin'
        })
    },
    watch: {
        selectedVacation: {
            handler(selectedVacation) {
                if (selectedVacation) {
                    this.vacation = { ...selectedVacation };
                }
            },
            immediate: true
        }
    },
    methods: {
        ...mapActions({
            saveVacation: 'vacations/save'
        }),
        setEndDate() {
            this.$refs.menuEndDate.save(this.vacation.endDate);
        },
        setStartDate() {
            this.$refs.menuStartDate.save(this.vacation.startDate);
        },

        reset() {
            this.vacation = { ...this.defaultForm };
            this.$v.$reset();
        },
        close() {
            this.$emit('close');
            this.reset();
        },
        async save() {
            try {
                this.$v.$touch();

                if (this.$v.$invalid) {
                    return;
                }

                await this.saveVacation(this.vacation);

                this.$notify({
                    group: 'errors',
                    title: 'success',
                    text: 'Vacation has been saved',
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
        }
    }
};
</script>
