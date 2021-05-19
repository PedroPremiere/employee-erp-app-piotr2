<template>
    <v-container fill-height>
        <v-main>
            <router-view :key="$route.fullPath" />
        </v-main>
        <notifications group="errors" />
    </v-container>
</template>

<script>
export default {
    name: 'Default'
};
</script>
