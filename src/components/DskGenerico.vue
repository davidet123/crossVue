<template>

  <v-row>
    <v-col cols="12" class="text-center">
      <h6>Dsk Generico</h6>
      <!-- <v-row>
        <v-col class="text-center">
          <h4>Dsk Generico</h4>
        </v-col>
      </v-row> -->
      <v-row>
        <v-col cols="8">
          <v-select
            :items="textosDSK"
            label="Texto DSK"
            v-model="texto"
            item-value="null"
          ></v-select>
        </v-col>
        <v-col cols="2">
          <v-btn 
          color="blue"
          size="x-small"
          @click="goPVW()"
          >PVW</v-btn>
          <v-btn 
          :color="live ? 'error' : 'success'"
          size="x-small"
          @click="goLive(nombre)"
          :disabled="texto == null"
          >{{ titulo }}</v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>

  


</template>

<script setup>

import { ref, computed } from 'vue';
import { useAppStore } from "../store/app.js"
import { watch } from 'vue';
import LiveVMIX from './LiveVMIX.vue';

const appStore = useAppStore()



const live = ref(false)

const texto = ref(null)

const textosDSK = computed(() => appStore.textosDSK)

const goLive = () => {
  
  appStore.liveVmix("DSK_GENERICO")
  live.value = !live.value
  

}
const goPVW = () => {
    appStore.PVWVmix("DSK_GENERICO")
  }

  const titulo = computed(() => {
  if (!live.value) {
    return `LIVE ON`
  }
  return `LIVE OFF`
})

watch(texto, val => {
  console.log(val)
  appStore.liveUpdate("DSK_GENERICO", "GENERICO", val)

})

</script>

<style>


</style>