<template>
    <v-card class="py-3">
        <v-card-title class="headline" justify="center" align="center">
            <v-row justify="center" align="center" class="mb-5">
                <v-icon
                    size="100"
                    color="error"
                    v-text="'mdi-emoticon-sad-outline'"
                />
            </v-row>
        </v-card-title>
        <v-card-text>
            <p class="text-center display-1"> Something Went wrong </p>
            <p class="text-center"> {{ error.message }} </p>
            <v-list v-if="error.response && error.response.data" dense>
                <v-list-item-group color="primary">
                    <v-list-item
                        v-for="(item, i) in error.response.data.errors"
                        :key="i"
                    >
                        <v-list-item-icon>
                            <v-icon color="error" v-text="'mdi-alert'" />
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title color="error">
                                {{ item.message }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-card-text>
        <v-card-actions>
            <v-spacer />
            <v-btn color="error" @click="$emit('close')"> Dismiss </v-btn>
            <v-spacer />
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: 'ErrorDialog',
    props: {
        error: { type: Error, default: () => {}, required: true }
    }
};
</script>
