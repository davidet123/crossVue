<template>
  <router-view />
</template>

<script setup>
import {  onMounted, onBeforeMount } from "vue";

import { useAppStore } from "./store/app.js"



const appStore = useAppStore()

appStore.getDatosCarrera() // CARGAR DATOS DESDE LOCALSTORAGE

// appStore.loadData() // CARGAR DATOS DESDE SALIDA FORMATO JSON
appStore.loadXML() // CARGAR XML PARA CREAR TIEMPOS PARCIALES
appStore.conectarWS() // PARA RECIBIR PICADAS DESDE RADIO
appStore.getClasificación() // CARGAR CLASIFICACION DESDE JSON-SERVER
appStore.getIntermedios() // CARGAR INTERMEDIOS DESDE JSON-SERVER
appStore.getSalidas() // CARGAR SALIDAS DESDE JSON-SERVER

 


</script>
