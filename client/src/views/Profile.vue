<template>
    <v-container fluid>
        <v-card class="mx-auto my-12">
            <template slot="progress">
                <v-progress-linear
                    color="deep-purple"
                    height="10"
                    indeterminate
                ></v-progress-linear>
            </template>

            <div class="text-center py-15">
                <div class="display-2">
                    {{ loggedUser.firstName }} {{ loggedUser.lastName }}
                </div>
                <div class="display-1"> {{ loggedUser.email }}</div>
                <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="pink"
                    @click="isProfileDialogOpen = true"
                >
                    <v-icon dark> mdi-account-edit </v-icon>
                </v-btn>

                <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="pink"
                    @click="isPasswordChangeOpen = true"
                >
                    <v-icon dark> mdi-form-textbox-password </v-icon>
                </v-btn>
            </div>

            <v-card-text>
                <v-row align="center" class="mx-0">
                    <v-row no-gutters>
                        <v-col cols="6">
                            <div class="py-5">
                                <div class="display-2 text-center">
                                    {{ loggedUser.birthDate }}
                                </div>
                                <div class="text-center"> Birth Date </div>
                            </div>
                        </v-col>
                        <v-divider vertical></v-divider>
                        <v-col cols="6">
                            <div class="py-5">
                                <div class="display-2 text-center">{{
                                    loggedUser.vacationDays
                                }}</div>
                                <div class="text-center">
                                    Vacations to use
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </v-row>
            </v-card-text>
        </v-card>
        <v-dialog v-model="isProfileDialogOpen" persistent max-width="600px">
            <profile-form
                :logged-user="loggedUser"
                @close="onIsProfileDialogClose"
            />
        </v-dialog>

        <v-dialog v-model="isPasswordChangeOpen" persistent max-width="600px">
            <password-change-form @close="isPasswordChangeOpen = false" />
        </v-dialog>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ProfileForm from '@/components/ProfileForm';
import PasswordChangeForm from '@/components/PasswordChangeForm';

export default {
    name: 'Me',
    components: { ProfileForm, PasswordChangeForm },
    data() {
        return { isProfileDialogOpen: false, isPasswordChangeOpen: false };
    },
    computed: {
        ...mapGetters({
            loggedUser: 'auth/user',
            isAdmin: 'auth/isAdmin'
        })
    },
    mounted() {
        this.load();
    },
    methods: {
        ...mapActions({
            me: 'auth/me'
        }),
        async load() {
            try {
                await this.me();
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
        async onIsProfileDialogClose() {
            this.isProfileDialogOpen = false;
            await this.me();
        }
    }
};
</script>
