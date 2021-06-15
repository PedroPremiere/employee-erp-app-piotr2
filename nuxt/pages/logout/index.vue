<template>
    <v-container fill-height>
        <v-row justify="center" align="center">
            <v-col>
                <v-card
                    elevation="2"
                    align="center"
                    justify="center"
                    class="py-4 mx-auto"
                >
                    <h3 align="center" justify="center">Logout</h3>
                    <v-btn
                        class="mt-6"
                        color="primary"
                        elevation="2"
                        @click="$auth.logout()"
                    >
                        Logout
                    </v-btn>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'Logout'
};
</script>
