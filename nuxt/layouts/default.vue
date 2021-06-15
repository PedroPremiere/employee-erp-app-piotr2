<template>
    <v-app>
        <v-main>
            <v-container>
                <nuxt />
            </v-container>
        </v-main>
        <notifications group="errors" />
    </v-app>
</template>

<script>
export default {
    name: 'Default'
};
</script>
