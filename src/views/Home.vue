<template>
  
  <v-row>
    <v-col cols="12" class="text-center">
      <!-- <Server /> -->
      <!-- <h2>XII PREMI INTERNACIONAL D'ORIENTACIÓ DE LA COMUNITAT VALENCIANA VILA D'ONIL 2023</h2> -->
      <h2>ORIENTACIÓN CES VALLADOLID</h2>
      

    </v-col>
  </v-row>
  <v-row>
    <v-col cols="2" offset="2" class="text-center">
      <LiveVMIX :nombre="'PRESENTACION'" :temporizador="false" :dorsal="dorsalSeguimiento" :corredor="corredorActivo" @activar="goLive" @previo="goPVW"/>
    </v-col>
    <v-col cols="2" class="text-center">
      <LiveVMIX :nombre="'METEO'" :temporizador="false" :dorsal="dorsalSeguimiento" :corredor="corredorActivo" @activar="goLive" @previo="goPVW"/>
    </v-col>
    <v-col cols="2" class="text-center">
      <LiveVMIX :nombre="'DESCRIPCION_CARRERA_M-E'" :temporizador="false" :dorsal="dorsalSeguimiento" :corredor="corredorActivo" @activar="goLive" @previo="goPVW"/>
    </v-col>
    <v-col cols="2" class="text-center">
      <LiveVMIX :nombre="'DESCRIPCION_CARRERA_F-E'" :temporizador="false" :dorsal="dorsalSeguimiento" :corredor="corredorActivo" @activar="goLive" @previo="goPVW"/>
    </v-col>
    <!-- 

      METEO
      PRESENTACION CARRERA
      CLASIFICACION 1
      CLASIFICACION 2
      SALIDA INDIVIDUAL
      DSK INDIVIDUAL
      PUNTO INTERMEDIO


     -->
  </v-row>
  <v-row>
    <v-col cols="6" class="text-center">
      <v-row>
        <v-col cols="10 offset=1">
          <h4>Tiempos</h4>
        </v-col>
      </v-row>
      <v-row class="pl-5">
        <!-- <v-col cols="4" class="text-center">
          <LiveVMIX :nombre="'SALIDA INDIVIDUAL'" :temporizador="true" :dorsal="dorsalSeguimiento" :corredor="corredorActivo" @activar="goLive"/>
          {{ dorsalSeguimiento }} !
        </v-col> -->
        <v-col cols="5" class="text-center">
          <LiveVMIX :nombre="'DSK_CORREDOR'" :temporizador="true" :dorsal="dorsalSeguimiento" :corredor="corredorActivo" @activar="goLive" @previo="goPVW"/>
        </v-col>
        <v-col cols="5" class="text-center">
          <LiveVMIX :nombre="'INTERMEDIOS'" :temporizador="true" :dorsal="dorsalSeguimiento" :corredor="corredorActivo" @activar="goLive" @previo="goPVW"/>
        </v-col>
        
      </v-row>
    </v-col>
    <v-col cols="6" class="text-center">
      <v-row>
        <v-col cols="12" offset="1">
          <h4>Clasificacion</h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" class="text-center">
          <LiveVMIX :nombre="'CLASIFICACION1'" :temporizador="false" @activar="goLive" @previo="goPVW"/>
        </v-col>
        <v-col cols="4" class="text-center">
          <LiveVMIX :nombre="'CLASIFICACION2'" :temporizador="false" @activar="goLive" @previo="goPVW"/>
        </v-col>
        <v-col COLS="2">
          <v-row>
            <v-col>
              <h3>IR CLASIFICACION</h3>
              <!-- <router-link to="/clasificacion"> -->
                <v-btn @click="router.push('/clasificacion')" color="error">CLASIFICACION</v-btn>
                
              </v-col>
            </v-row>
            <v-row>
              <v-col>
              <h3>ACTUALIZAR INTERMEDIOS</h3>
                <v-btn @click="actualizarIntermedios" color="success">ACTUALIZAR</v-btn>

            </v-col>
          </v-row>
          <!-- </router-link> -->
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <v-row class="mx-3">
    <!-- <v-col cols="3" class="text-center">
      <h6>Buscar dorsal</h6>
      <v-row>
        <v-col cols="10">
          <v-text-field
            v-model="dorsal"
            label="Buscar dorsal"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-btn color="error" size="x-small" @click="dorsal = null">X</v-btn>
        </v-col>
      </v-row>
    </v-col> -->
    <v-col cols="3" class="text-center">
      <h6>Hora inicio</h6>
      <v-text-field
        v-model="horaInicio"
        label="Hora de salida">
      </v-text-field>
    </v-col>
    <v-col cols="6">
      <DskGenerico />

    </v-col>
    <v-col cols ="3" class="text-center">
      <h5>CheckPoint</h5>
      <v-select
          :items="listaCheckPoints"
          item-title="numero"
          item-value="numero"
          name="numero"
          label="CheckPoint"
          v-model="checkPoint"
          return-object
        ></v-select>
  
    </v-col>
  </v-row>
  
    <v-row class="ml-3">
      <v-col cols="12" class="text-center">
      <h6>Buscar dorsal</h6>
      <v-row>
        <v-col cols="4">
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="dorsal"
                label="Buscar dorsal"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-btn color="error" size="x-small" @click="dorsal = null">X</v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="8" v-if="dorsal">
          <CorredorCSV :corredorActivo="corredorActivo" :corredor="corredorFiltrado" :dorsal="dorsal" :horaInicio="horaInicio" :listaCheckPoints="listaCheckPoints" class="corredor" v-if="corredorFiltrado"/>
          <h3 v-else>Dorsal no encontrado</h3>
          <!-- <span v-for="categoria in categorias" :key="categoria.categoria">
            <span v-for="corredor in categoria.componentes">

            </span>
          </span> -->

        </v-col>
      </v-row>
    </v-col>
      <!-- <v-col cols="4">
        <v-select
            :items="listadoCategorias"
            label="Categorias"
            v-model="categoriaSeleccionada"
            item-value="null"
          ></v-select>
        
      </v-col>
      <v-col cols="2">
        <v-btn @click="categoriaSeleccionada = null" color="error">LIMPIAR</v-btn>
      </v-col> -->
    </v-row>
    <!-- <v-row>
      <v-col>
        {{ checkPoints }}
      </v-col>
    </v-row> -->
    <v-row class="listaBotones">
      <v-col v-for="categoria in categorias" :key="categoria.categoria" class="text-center">
        <v-btn :color="categoriaFiltrada === categoria.categoria ? 'primary' : 'success'" @click="filtrarCategoria(categoria.categoria)">{{ categoria.categoria }}</v-btn>

      </v-col>
      <v-col><v-btn color="error" @click="categoriaFiltrada = null">LIMPIAR</v-btn></v-col>
      <v-col><v-btn color="primary" @click="filtroCategoria = !filtroCategoria">TODOS</v-btn></v-col>
    </v-row>
    <v-row v-for="categoria in categorias" :key="categoria.categoria">
      <v-col cols="12" v-if="(categoriaFiltrada === categoria.categoria && !corredorFiltrado) || filtroCategoria">
          <h3 class="text-center">{{ categoria.categoria }}</h3>
          <v-row>
            <v-col cols="6" v-for="corredor in categoria.componentes" class="estiloCorredor">

                <CorredorCSV v-if="corredor.Apellidos !== 'Vacante'" :corredorActivo="corredorActivo" :corredor="corredor" :dorsal="dorsal" :horaInicio="horaInicio" :listaCheckPoints="listaCheckPoints" class="corredor"/>
                
                <!-- {{ corredor }} -->
                <!-- <CorredorCSV v-if="data && parcialesCorredor(corredor.Dorsal)" :corredor="corredor" :dorsal="dorsal" :horaInicio="horaInicio" :parciales = "parcialesCorredor(corredor.Dorsal)" class="corredor"/> -->
                
                <!-- {{ corredor["Dorsal"] }} - {{ corredor.Nombre }} -->

              
            </v-col>
          </v-row>
      </v-col>
    </v-row>
    <!-- <p v-for="categoria in categorias">
      <span v-if="categoria.categoria == categoriaSeleccionada || !categoriaSeleccionada">
        
        <span v-for="corredor in categoria.componentes" class="estiloCorredor">
          <CorredorCSV v-if="corredor.Apellidos !== 'Vacante'" :corredorActivo="corredorActivo" :corredor="corredor" :dorsal="dorsal" :horaInicio="horaInicio"  class="corredor"/>
          
        </span>
      </span>
    </p> -->
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { useAppStore } from "../store/app.js"
  import { storeToRefs } from "pinia";
  import router from "@/router"
  // import csv from '../xml/test5.csv'

  import Corredor from '@/components/Corredor.vue'
  import CorredorCSV from '@/components/CorredorCSV.vue'
  import DskGenerico from '@/components/DskGenerico.vue'
  import { watch } from 'vue';  
  import LiveVMIX from '@/components/LiveVMIX.vue';
  import Server from '@/components/Server.vue';


  const appStore = useAppStore()

  const { categorias, listadoCategorias, horaInicio, checkPoints, dorsalSeguimiento, getCorredorActivo, csvData, listadoCheckPoints, intermedios } = storeToRefs(appStore)
  

  // console.log(csv[0]["Categor�a inscrita (corto)"])

  /* csv.forEach(el => {
    console.log(el["Categor�a inscrita (corto)"])
  }) */
 console.log(listadoCheckPoints.value)

  // TEST CSV

  // appStore.getCsv()
  

  const listaCheckPoints = computed(() => {
    const lista =  listadoCheckPoints.value[0].componentes[0].CheckPoints.sort((a, b) => a.numero - b.numero)
    return lista.map(el => el.numero)
  })
  const categoriaFiltrada = ref(null)

  const corredorFiltrado = computed(() => {
    let corredor
    categorias.value.forEach(categoria => {
      categoria.componentes.forEach(componente => {
        if(componente.Dorsal === parseInt(dorsal.value)){
           corredor = componente
           categoriaFiltrada.value = null
          }
      })
    })

    return corredor
  })

  const filtrarCategoria = cat => {
    categoriaFiltrada.value = cat
  }



  // console.log(listaCheckPoints.value)



  // console.log(listadoCategorias.value)
  let cat = ref([])
  const corredorActivo = computed(() => appStore.getCorredorActivo)
  // console.log(corredorActivo.value)

  

  const dorsal = ref(null)
  const categoriaSeleccionada = ref(null)

  const filtroCategoria = ref(false)
  // const horaInicio = ref("16:00:05")

  const checkPoint = ref('meta')


  const data = ref(null)
  const parciales = ref(null)
  const parcialesTotales = ref(null)
  const parcialesCorredor = (id) => {
    // console.log(parcialesTotales.value)
    if(parcialesTotales.value) {
      return parcialesTotales.value.find(el => {
        // console.log(id)
        if(el.Result.BibNumber) {

          return el.Result.BibNumber == id
        }
      })

    } else {
      return null
    }
    }
  

  let getXMLFile = function(path, callback) {
    let request = new XMLHttpRequest()
    request.open("GET", path)
    request.setRequestHeader("Content-Type", "text/xml")
    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        callback(request.responseXML)
      }
    }
    request.send()
  }

  const getXml = () => {
      cat.value = []
      const path = appStore.xml_url
      getXMLFile(path, function(xml) {
      var x2js = new X2JS();
      var xmlText = xml
      let xmlVal = x2js.xml2json ( xml );
      data.value = xmlVal
      // console.log(data.value)
    })
    appStore.getCheckPoints()

    
  }

  

  const getXmlIntermedio = () => {
      cat.value = []
      getXMLFile("../src/xml/test7parciales.xml", function(xml) {
      var x2js = new X2JS();
      var xmlText = xml
      let xmlVal = x2js.xml2json ( xml );
      parciales.value = xmlVal
      // console.log(parciales.value.ResultList.ClassResult)
    })
    
  }

  // getXml()
  // getXmlIntermedio()
  // appStore.getCheckPoints()


  const interval = setInterval(() => {
      // getXml()
      // getXmlIntermedio()
      // crearTiemposParciales()
      // console.log(categorias.value)
      appStore.loadXML()
    }
      , 5000)

  const categoriasXML = computed(() => {
    if(data.value) {
      return data.value.ResultList.ClassResult
    }
  })

  // REsultados intermedios

  const crearTiemposParciales = () => {
    // console.log(parciales.value)
    let tempParcial = []
    if(parciales.value) {
      parciales.value.ResultList.ClassResult.forEach(cat => {
        // console.log(cat.PersonResult)
        if(cat.PersonResult.length >= 1) {

          cat.PersonResult.forEach(result => {
            // console.log(result)
            tempParcial.push(result)
          })
        } else {
          tempParcial.push(cat)
          // console.log(cat)
        }

      })
      
      // console.log(tempParcial)
      parcialesTotales.value = tempParcial
    }
  }
  // crearTiemposParciales()

  const actualizarIntermedios = () => {
    appStore.actualizarIntermedios()
  }

  const getInfoVMIX = () =>{
    appStore.liveVmix()

  }

  const goLive = payload => {
    appStore.liveVmix(payload.nombre)
    console.log(payload)
  }
  const goPVW = payload => {
    appStore.PVWVmix(payload.nombre)
  }

  watch(checkPoint, (val) => {
    console.log(val)
    appStore.setCheckPoint(val)
  })
  watch(dorsal, () => {
    
    categoriaFiltrada.value = null
  })
  watch(intermedios, () => {
    
    // console.log(intermedios.value.data)
  })

  
  
</script>

<style scoped>
  .corredor {
    border: 2px solid black;
  }

  .listaBotones {
    margin: 10px 10px;
    background-color: rgb(148, 148, 148);
  }
</style>