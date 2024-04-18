<template>
  <v-row>
    <v-col class="text-center">
      <h2>Aplicación orientación</h2>
    </v-col>
  </v-row>
  <v-row>
    <v-col class="text-center">
      <v-btn color="success" @click="reset">RESET</v-btn>
    </v-col>
  </v-row>
  <v-row class="mx-2">
    <v-col cols="12">
      <v-row>  
        <v-col cols=12 class="text-center">
          <h2>Settings</h2>
        </v-col>
        <v-col class="text-center" cols="3" offset="3">
          <v-text-field
            density="compact"
            label="Hora cero"
            v-model="horaCero"
            @update:model-value="modificacion = true"
          ></v-text-field>
        </v-col>
        <v-col class="text-center" cols="3">
          <v-text-field
            density="compact"
            label="Numero checkpoints"
            v-model="numCheckPoints"
            @update:model-value="modificacion = true"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-col>
    <v-row>
      <v-col v-for="checkPoint, index in checkPoints" :key="index">
        <div v-if="checkPoint.numero !== 'meta'">
          <v-text-field
          density = "compact"
          :label="`Num. cp ${index + 1}`"
          v-model="checkPoint.numero"
          @update:model-value="modificacion = true"
          ></v-text-field>
          
        </div>

      </v-col>
    </v-row>
  </v-row>
  <v-row class="mx-2">
    <v-col cols=12 class="text-center">
      <h2>Presentación</h2>
    </v-col>
    <v-col cols=4 class="text-center">
      <v-text-field
        density="compact"
        label="Carrera"
        v-model="carreraPresentacion"
        @update:model-value="modificacion = true"
      ></v-text-field>
    </v-col>
    <v-col class="text-center" cols="2" >
      <v-text-field
        density="compact"
        label="Categoria"
        v-model="categoriaPresentacion"
        @update:model-value="modificacion = true"
      ></v-text-field>
    </v-col>
    <v-col class="text-center" cols="3">
      <v-text-field
        density="compact"
        label="Distancia"
        v-model="distanciaPresentacion"
        @update:model-value="modificacion = true"
      ></v-text-field>
    </v-col>
    <v-col class="text-center" cols="3">
      <v-text-field
        density="compact"
        label="Fecha"
        v-model="fecha"
        @update:model-value="modificacion = true"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row class="mx-2">
    <v-col cols=12 class="text-center">
      <h2>Meteo</h2>
    </v-col>
    <v-col class="text-center" cols="4">
      <v-text-field
        density="compact"
        label="Cielo"
        v-model="cielo"
        @update:model-value="modificacion = true"
      ></v-text-field>
    </v-col>
    <v-col class="text-center" cols="4">
      <v-text-field
        density="compact"
        label="Viento"
        v-model="viento"
        @update:model-value="modificacion = true"
      ></v-text-field>
    </v-col>
    <v-col class="text-center" cols="4">
      <v-text-field
        density="compact"
        label="Temperatura"
        v-model="temperatura"
        @update:model-value="modificacion = true"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row class="mx-2">
    <v-col cols=12 class="text-center">
      <h2>Descripción carrera M-E</h2>
    </v-col>
    <v-col class="text-center" cols="4">
      <v-text-field
        density="compact"
        label="Categoria"
        v-model="categoriaME"
        @update:model-value="modificacion = true"
      ></v-text-field>
    </v-col>
    <v-col class="text-center" cols="4">
      <v-text-field
        density="compact"
        label="Distancia"
        v-model="distanciaME"
        @update:model-value="modificacion = true"
      ></v-text-field>
    </v-col>
    <v-col class="text-center" cols="4">
      <v-text-field
        density="compact"
        label="Desnivel"
        v-model="desnivelME"
        @update:model-value="modificacion = true"
      ></v-text-field>
    </v-col>
    <v-col class="text-center" cols="4" offset="2">
      <v-text-field
        density="compact"
        label="Controles"
        v-model="controlesME"
        @update:model-value="modificacion = true"
      ></v-text-field>
    </v-col>
    <v-col class="text-center" cols="4">
      <v-text-field
        density="compact"
        label="Tiempo estimado"
        v-model="tiempoEstimadoME"
        @update:model-value="modificacion = true"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row class="mx-2">
    <v-col cols=12 class="text-center">
      <h2>Descripción carrera F-E</h2>
    </v-col>
    <v-col class="text-center" cols="4">
      <v-text-field
        density="compact"
        label="Categoria"
        v-model="categoriaFE"
        @update:model-value="modificacion = true"
      ></v-text-field>
    </v-col>
    <v-col class="text-center" cols="4">
      <v-text-field
        density="compact"
        label="Distancia"
        v-model="distanciaFE"
        @update:model-value="modificacion = true"
      ></v-text-field>
    </v-col>
    <v-col class="text-center" cols="4">
      <v-text-field
        density="compact"
        label="Desnivel"
        v-model="desnivelFE"
        @update:model-value="modificacion = true"
      ></v-text-field>
    </v-col>
    <v-col class="text-center" cols="4" offset="2">
      <v-text-field
        density="compact"
        label="Controles"
        v-model="controlesFE"
        @update:model-value="modificacion = true"
      ></v-text-field>
    </v-col>
    <v-col class="text-center" cols="4">
      <v-text-field
        density="compact"
        label="Tiempo estimado"
        v-model="tiempoEstimadoFE"
        @update:model-value="modificacion = true"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="6" class="text-right">
      <v-btn color="error" @click="guardar" :disabled="!modificacion">GUARDAR</v-btn>
    </v-col>
    <v-col cols="6" class="text-left">
      <v-btn color="success" @click="empezar" >Empezar</v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import { useAppStore } from "../store/app.js"
  import { storeToRefs } from 'pinia'
  import { getCurrentInstance } from 'vue'
  import router from "@/router"

  const instance = getCurrentInstance();

  const appStore = useAppStore()

  const { datos_carrera } = storeToRefs(appStore)

  const modificacion = ref(false)

  // Settings
  const horaCero = ref(datos_carrera.value.horaCero)
  const numCheckPoints = ref(datos_carrera.value.numCheckPoints)

  const checkPoints = ref(datos_carrera.value.checkPoints)

  // Presentacion
  const carreraPresentacion = ref(datos_carrera.value.presentacion.carrera)
  const categoriaPresentacion = ref(datos_carrera.value.presentacion.categoria)
  const distanciaPresentacion = ref(datos_carrera.value.presentacion.distancia)
  const fecha = ref(datos_carrera.value.presentacion.fecha)

  // Meteo
  const cielo = ref(datos_carrera.value.meteo.cielo)
  const viento = ref(datos_carrera.value.meteo.viento)
  const temperatura = ref(datos_carrera.value.meteo.temperatura)

  // Descripcion carrera M-E
  const categoriaME = ref(datos_carrera.value.descripcion_carrera_ME.categoria)
  const distanciaME = ref(datos_carrera.value.descripcion_carrera_ME.distancia)
  const desnivelME = ref(datos_carrera.value.descripcion_carrera_ME.desnivel)
  const controlesME = ref(datos_carrera.value.descripcion_carrera_ME.controles)
  const tiempoEstimadoME = ref(datos_carrera.value.descripcion_carrera_ME.tiempo_estimado)

  // Descripcion carrera F-E
  const categoriaFE = ref(datos_carrera.value.descripcion_carrera_FE.categoria)
  const distanciaFE = ref(datos_carrera.value.descripcion_carrera_FE.distancia)
  const desnivelFE = ref(datos_carrera.value.descripcion_carrera_FE.desnivel)
  const controlesFE = ref(datos_carrera.value.descripcion_carrera_FE.controles)
  const tiempoEstimadoFE = ref(datos_carrera.value.descripcion_carrera_FE.tiempo_estimado)


  const guardar = () => {

    appStore.liveUpdate("PRESENTACION", "TextBlock1", carreraPresentacion.value)
    appStore.liveUpdate("PRESENTACION", "CATEGORIA", categoriaPresentacion.value)
    appStore.liveUpdate("PRESENTACION", "DISTANCIA", distanciaPresentacion.value)
    appStore.liveUpdate("PRESENTACION", "FECHA", fecha.value)
    
    appStore.liveUpdate("METEO", "CIELO_TXT", cielo.value)
    appStore.liveUpdate("METEO", "VIENTO_TXT", viento.value)
    appStore.liveUpdate("METEO", "TEMP_TXT", temperatura.value)
        
    appStore.liveUpdate("DESCRIPCION_CARRERA_M-E", "CATEGORIA", categoriaME.value)
    appStore.liveUpdate("DESCRIPCION_CARRERA_M-E", "DISTANCIA", distanciaME.value)
    appStore.liveUpdate("DESCRIPCION_CARRERA_M-E", "DESNIVEL", desnivelME.value)
    appStore.liveUpdate("DESCRIPCION_CARRERA_M-E", "CONTROLES", controlesME.value)
    appStore.liveUpdate("DESCRIPCION_CARRERA_M-E", "TIEMPO ESTIMADO", tiempoEstimadoME.value)

    appStore.liveUpdate("DESCRIPCION_CARRERA_F-E", "CATEGORIA", categoriaFE.value)
    appStore.liveUpdate("DESCRIPCION_CARRERA_F-E", "DISTANCIA", distanciaFE.value)
    appStore.liveUpdate("DESCRIPCION_CARRERA_F-E", "DESNIVEL", desnivelFE.value)
    appStore.liveUpdate("DESCRIPCION_CARRERA_F-E", "CONTROLES", controlesFE.value)
    appStore.liveUpdate("DESCRIPCION_CARRERA_F-E", "TIEMPO ESTIMADO", tiempoEstimadoFE.value)

    const datos_carrera = {
      horaCero: horaCero.value,
      numCheckPoints: parseInt(numCheckPoints.value),
      checkPoints: checkPoints.value,
      presentacion: {
        carrera: carreraPresentacion.value,
        categoria: categoriaPresentacion.value,
        distancia: distanciaPresentacion.value,
        fecha: fecha.value,
      },
      meteo: {
        cielo: cielo.value,
        viento: viento.value,
        temperatura: temperatura.value,
      },
      descripcion_carrera_ME: {
        categoria: categoriaME.value,
        distancia: distanciaME.value,
        desnivel: desnivelME.value,
        controles: parseInt(controlesME.value),
        tiempo_estimado: tiempoEstimadoME.value,
      },
      descripcion_carrera_FE: {
        categoria: categoriaFE.value,
        distancia: distanciaFE.value,
        desnivel: desnivelFE.value,
        controles: parseInt(controlesFE.value),
        tiempo_estimado: tiempoEstimadoFE.value,
      }
    }

    let meta = false
    
    if(datos_carrera.checkPoints !== null) {

      datos_carrera.checkPoints.forEach(cp => {
        if(cp.numero == 'meta') {
          meta = true
        }
      })
      
      if(!meta) {
        
        datos_carrera.checkPoints.push(({numero: "meta", tiempo: null}))
      }
    }


    // const dataWS = JSON.parse(localStorage.getItem('misaData'))
     
    // console.log(checkPoints.value)
    localStorage.setItem('datos_carrera', JSON.stringify(datos_carrera))
    // localStorage.setItem('listado_checkpoints', JSON.stringify(datos_carrera.checkPoints))


    appStore.crearListadoCheckpoints()
    appStore.getDatosCarrera()

  }
  
  const empezar = () => {
    router.push(`directo`)
  }

  const reset = () => {
    horaCero.value = null
    numCheckPoints.value = null

    checkPoints.value = []

    // Presentacion
    carreraPresentacion.value = null
    categoriaPresentacion.value = null
    distanciaPresentacion.value = null
    fecha.value = null

    // Meteo
    cielo.value = null
    viento.value = null
    temperatura.value = null

    // Descripcion carrera M-E
    categoriaME.value = null
    distanciaME.value = null
    desnivelME.value = null
    controlesME.value = null
    tiempoEstimadoME.value = null

    // Descripcion carrera F-E
    categoriaFE.value = null
    distanciaFE.value = null
    desnivelFE.value = null
    controlesFE.value = null
    tiempoEstimadoFE.value = null

    guardar()
  }

  watch(datos_carrera.value, val => {
    console.log(val)
  },{
    deep: true
  })

  watch(() => numCheckPoints.value, val => {
    checkPoints.value = []
    for(let i = 0; i <= parseInt(val) -1; i++) {
      checkPoints.value.push({numero: null, tiempo: null})
    }
    
    // console.log(checkPoints.value)
  })

</script>