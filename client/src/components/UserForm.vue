<template>
    <v-card>
        <v-card-title>
            <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field
                            v-model="user.firstName"
                            label="First name*"
                            required
                        />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field
                            v-model="user.lastName"
                            label="Last name*"
                            hint="example of persistent helper text"
                            persistent-hint
                            required
                        />
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            v-model="user.email"
                            label="Email*"
                            required
                        />
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            v-model="user.birthDate"
                            label="Birth Date*"
                            required
                        />
                    </v-col>
                </v-row>
            </v-container>
            <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="close()">
                <span> Close </span>
            </v-btn>
            <v-btn color="blue darken-1" text @click="save()">
                <span>Save </span>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: 'UserForm',
    props: {
        selectedUser: { type: Object, default: () => ({}), required: false }
    },
    data() {
        const defaultForm = {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            birthDate: ''
        };

        return {
            defaultForm,
            user: defaultForm
        };
    },
    watch: {
        selectedUser: {
            handler(value) {
                this.user = { ...value };
            },
            immediate: true
        }
    },
    methods: {
        reset() {
            this.user = { ...this.defaultForm };
        },
        save() {
            this.$emit('save');
            this.reset();
        },
        close() {
            this.$emit('close');
            this.reset();
        }
    }
};
</script>
