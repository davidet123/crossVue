<template>
  <router-view />
</template>

<script setup>
import {  onMounted, onBeforeMount } from "vue";

import { useAppStore } from "./store/app.js"



const appStore = useAppStore()

appStore.getDatosCarrera()

appStore.loadData()
appStore.loadXML()
 


</script>
