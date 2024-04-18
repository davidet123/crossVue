<template>
  <v-card class="ma-0 pa-0">
    <v-card-text class="card">

      <v-row class="ma-0 pa-0">
        <v-col cols="12" class="text-center ma-1 pa-0">
          <h5>{{ nombre }}</h5>
        </v-col>
      </v-row>
      <v-row class="ma-0 pa-0">
        <v-col cols="12" class="text-center ma-1 pa-0">
          <v-btn 
          color="blue"
          size="x-small"
          @click="previoGrafico(nombre)"
          >PVW</v-btn>
          <v-btn 
          :color="live ? 'error' : 'success'"
          size="x-small"
          @click="insertarGrafico(nombre)"
          
          >{{ titulo }}</v-btn>
        </v-col>
        <v-row v-if="temporizador">
          <v-col v-if="corredor">
            <h6>{{ corredor.Dorsal }} - {{ corredor.Nombre }} {{ corredor.Apellidos }}</h6>
          </v-col>
          <v-col v-else="corredor">
            <h6>-</h6>
          </v-col>
        </v-row>
      </v-row>
    </v-card-text>
  </v-card>


</template>

<script setup>

import { watch } from 'vue'
import { computed } from 'vue'
import { ref, toRefs } from 'vue'


const props = defineProps(["nombre", "temporizador", "dorsal", "corredor"])
const emit = defineEmits(["activar", "previo"])

const { nombre, temporizador, dorsal, corredor } = toRefs(props)

const live = ref(false)
const livePVW = ref(false)
// const dorsal = ref(null)
// console.log(corredor.value)

const insertarGrafico = () => {
  live.value = !live.value  
  const payload = {
    live: live.value,
    nombre: nombre.value
    }
    emit("activar", payload)
}

 const previoGrafico = () => {
  livePVW.value = !livePVW.value
  const payload = {
    live: live.value,
    nombre: nombre.value
    }
    emit("previo", payload)
 }

const titulo = computed(() => {
  if (!live.value) {
    return `LIVE ON`
  }
  return `LIVE OFF`
})

const checkDisabled = computed(() => {
 if(temporizador.value) {
  if(!dorsal.value) {
    return true
  } else {
    return false
  }
  } 
})

// watch(corredor.value, val => {
//   console.log(val)
// })

</script>

<style scoped>

.card {
  background-color: #cccccc;
}

</style>