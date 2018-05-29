<template>
    <v-ons-toolbar>
        <div class="left">
            <slot name="left">Levi slot</slot>
        </div>
        <div class="center">
            {{title}}
        </div>
        <div class="right">
            <slot name="right">Desni slot</slot>
        </div>
    </v-ons-toolbar>
</template>

<script>
export default {
    props:{
        title:{
            type: String,
            default: 'GitHub App'
        }
    }
}
</script>