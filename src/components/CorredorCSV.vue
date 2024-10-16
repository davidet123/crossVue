<template >
  <div class="estiloCorredor" v-if="corredor.Dorsal == dorsal || dorsalElite == dorsal || !dorsal">
    <!-- <div v-if="corredor.Dorsal == dorsal || dorsalElite == dorsal || !dorsal" class="mx-2" > -->

      <v-row>
        <v-col cols="12">
          <v-row class="ma-0 pa-0">
            <v-col class="ma-0 pa-0 text-center" cols="1">
              <p>Dorsal</p>
              <h4>{{ corredor["Dorsal"] }}</h4>
              <!-- | {{ corredor["Dorsal alt."] }} -->
            </v-col>
            <v-col class="ma-0 pa-0 text-center" cols="1">
              <p>Categoria</p>
              <h4>{{ corredor["Corto"] }}</h4>
              <!-- | {{ corredor["Dorsal alt."] }} -->
            </v-col>
            <v-col class="ma-0 pa-0 text-center" cols="6">
              <p>Nombre</p>
              <h3>{{ corredor.Nombre }} {{ corredor.Apellidos }}</h3>
              <v-row class="ma-0 pb-0">
                <v-col class="ma-0 pa-0 text-center" cols="4"><v-btn @click="enviarDSK()"  color="success" size="x-small">DSK NOMBRE</v-btn></v-col>
                <v-col class="ma-0 pa-0 text-center" cols="4">
                  <v-btn v-if="!seguimiento" :disabled="desactivarBoton" color="success" @click="seguir(true, calcularInicio(corredor.Salida))" size="x-small">SEGUIR CP {{ checkpoint }}</v-btn>
                  <v-btn  v-if="seguimiento" color="error" @click="pararSeguimiento()" size="x-small">PARAR</v-btn>            
                </v-col>
                <v-col class="ma-0 pa-0 text-center" cols="3">
                  <v-btn v-if="!seguimientoSalida" :disabled="desactivarBotonSalida" color="success" @click="salida(true, calcularInicio(corredor.Salida))" size="x-small">SALIDA</v-btn>
                  <v-btn  v-if="seguimientoSalida" color="error" @click="pararSalida()" size="x-small">PARAR</v-btn>            
                </v-col>

              </v-row>
              <v-divider class="my-1"></v-divider>
              <v-row class="mt-3">
                <v-col class="ma-0 pa-0 text-center">
                  <v-btn-toggle
                    v-model="checkPointElegido"
                  >
                  <v-btn v-for="cp in listaCheckPoints"
                    :key="cp"
                    size="x-small"
                    color="primary"
                    :value="cp"
                    style="height: 50% !important;"
                  >{{ cp }}</v-btn>
                </v-btn-toggle>
                </v-col>

              </v-row>
              
            </v-col>
            <v-col class="ma-0 pa-0 text-center" cols="3">
              <p>Salida</p>
              <h3>{{ calcularInicio(corredor.Salida) }}</h3>
              <v-divider class="my-1"></v-divider>
              <v-btn size="x-small" color="primary" @click="dialog=true">TIEMPOS</v-btn>  
              <v-divider class="my-1"></v-divider>
              <v-row>
                <v-col v-for="check in checkPointsCorredor.CheckPoints" class="text-center" :cols="12 / checkPointsCorredor.CheckPoints.length">
                  <!-- <v-row>
                    <v-col class="text-center"></v-col>
                  </v-row>
                  <v-row></v-row> -->
                  <p 
                    style="font-size: 12px;"
                    :style="checkpoint === check.numero ? 'font-weight: bold; font-size: 14px;' : ''"
                  
                  >{{ check.numero }}</p>
                  <v-icon 
                  :color="check.tiempo ? 'green' : 'red'"
                  icon="mdi-circle-medium"> </v-icon>
                </v-col>
              </v-row>                      
            </v-col>
          </v-row>
          <!-- <v-row class="ma-0 pb-0">
            <v-col class="ma-0 pa-0 text-center" cols="3" offset="2"><v-btn @click="enviarDSK()"  color="success" size="x-small">DSK NOMBRE</v-btn></v-col>
            <v-col class="ma-0 pa-0 text-center" cols="2">
              <v-btn v-if="!seguimiento" :disabled="desactivarBoton" color="success" @click="seguir(true, calcularInicio(corredor.Salida))" size="x-small">SEGUIR</v-btn>
              <v-btn  v-if="seguimiento" color="error" @click="pararSeguimiento()" size="x-small">PARAR</v-btn>            
            </v-col>
            <v-col class="ma-0 pa-0 text-center" cols="2">
              <v-btn v-if="!seguimientoSalida" :disabled="desactivarBotonSalida" color="success" @click="salida(true, calcularInicio(corredor.Salida))" size="x-small">SALIDA</v-btn>
              <v-btn  v-if="seguimientoSalida" color="error" @click="pararSalida()" size="x-small">PARAR</v-btn>            
            </v-col>

          </v-row> -->
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <!-- <LiveVMIX v-if="seguimiento" :nombre="'INTERMEDIOS'" :temporizador="false" @activar="goLive" @previo="goPVW"/> -->
          <!-- <LiveVMIX v-if="!seguimiento && !seguimientoSalida" :nombre="'NOMBRE_SOLO'" :temporizador="false" @activar="goLive" @previo="goPVW"/> -->
          <!-- <LiveVMIX v-if="seguimientoSalida" :nombre="'DSK_CORREDOR'" :temporizador="false" @activar="goLive" @previo="goPVW"/> -->
          <LiveVMIX :nombre="'DSK_CORREDOR'" :temporizador="false" @activar="goLive" @previo="goPVW"/>
          <!-- <LiveVMIX :nombre="'INTERMEDIOS'" :temporizador="false" @activar="goLive" @previo="goPVW"/> -->
        </v-col>
        <v-col cols="4">
          <!-- <LiveVMIX v-if="seguimiento" :nombre="'INTERMEDIOS'" :temporizador="false" @activar="goLive" @previo="goPVW"/> -->
          <!-- <LiveVMIX v-if="!seguimiento && !seguimientoSalida" :nombre="'NOMBRE_SOLO'" :temporizador="false" @activar="goLive" @previo="goPVW"/> -->
          <!-- <LiveVMIX v-if="seguimientoSalida" :nombre="'DSK_CORREDOR'" :temporizador="false" @activar="goLive" @previo="goPVW"/> -->
          <!-- <LiveVMIX :nombre="'DSK_CORREDOR'" :temporizador="false" @activar="goLive" @previo="goPVW"/> -->
          <LiveVMIX :nombre="'INTERMEDIOS'" :temporizador="false" @activar="goLive" @previo="goPVW"/>
        </v-col>
        <v-col cols="4">
          <!-- <LiveVMIX v-if="seguimiento" :nombre="'INTERMEDIOS'" :temporizador="false" @activar="goLive" @previo="goPVW"/> -->
          <!-- <LiveVMIX v-if="!seguimiento && !seguimientoSalida" :nombre="'NOMBRE_SOLO'" :temporizador="false" @activar="goLive" @previo="goPVW"/> -->
          <!-- <LiveVMIX v-if="seguimientoSalida" :nombre="'DSK_CORREDOR'" :temporizador="false" @activar="goLive" @previo="goPVW"/> -->
          <LiveVMIX :nombre="'NOMBRE_SOLO'" :temporizador="false" @activar="goLive" @previo="goPVW"/>
          <!-- <LiveVMIX :nombre="'INTERMEDIOS'" :temporizador="false" @activar="goLive" @previo="goPVW"/> -->
        </v-col>

      </v-row>
      
      <!-- <v-col cols="3">
        {{ toHoursAndMinutes(corredor.Result.Time) }}
      </v-col> -->
      <!-- <v-col cols="8">
        <v-row>
          <v-col cols="3"><v-btn @click="enviarDSK()"  :color="liveDSK ? 'error' : 'success'" size="x-small">DSK NOMBRE</v-btn></v-col>
          <v-col cols="2">
            <v-btn v-if="!seguimiento" :disabled="desactivarBoton" color="success" @click="seguir(true, calcularInicio(corredor.Salida))" size="x-small">SEGUIR</v-btn>
            <v-btn  v-if="seguimiento" color="error" @click="pararSeguimiento()">PARAR</v-btn>            
          </v-col>
          <v-col cols="2">
            <v-btn v-if="!seguimientoSalida" :disabled="desactivarBotonSalida" color="success" @click="salida(true, calcularInicio(corredor.Salida))" size="x-small">SALIDA</v-btn>
            <v-btn  v-if="seguimientoSalida" color="error" @click="pararSalida()">PARAR</v-btn>            
          </v-col>
          <v-col cols="5">
            <LiveVMIX :nombre="'DSK_CORREDOR'" :temporizador="false" @activar="goLive" @previo="goPVW"/>
          </v-col>
          
        </v-row>
        
        
      </v-col> -->
      <!-- <v-row class="ma-0 pa-0">
        <v-col  cols="7" class="ma-0 pa-0 text-right">
          <v-btn size="x-small" color="primary" @click="dialog=true">TIEMPOS</v-btn>
        </v-col>
      </v-row> -->
      
      <v-dialog
      v-model="dialog"
      width="80%"
      >
      <v-card>
        <v-card-title>
          <p>INTRODUCIR TIEMPO</p>
        </v-card-title>
        <v-card-subtitle>
          <v-row>
            
            <v-col v-for="cp, index in checkPointsCorredor.CheckPoints" :key="Math.random() * Date.now()"> 
              <p>CheckPoint {{ cp.numero }}</p>
              <v-text-field
              v-model="cp.tiempo"
              label="Tiempo"
              ></v-text-field>
              
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="text-center mb-1">
              <v-btn @click="actualizarCheckpoints" color="error">ACEPTAR</v-btn>
            </v-col>
          </v-row>
        </v-card-subtitle>
        
      </v-card>
      
    </v-dialog>
  <!-- </div> -->
  </div>
</template>

<script setup>
  import { ref, toRefs, computed, watch } from 'vue';
  import { useAppStore } from "../store/app.js"
  import { storeToRefs } from "pinia";

  import LiveVMIX from './LiveVMIX.vue';

  const appStore = useAppStore()
  // appStore.getCsv1()
  const props = defineProps(["corredor", "dorsal", "horaInicio", "parciales", "corredorActivo", "listaCheckPoints"]) 

  const { corredor, dorsal, horaInicio, parciales, corredorActivo, listaCheckPoints } = toRefs(props);
  const inicio = horaInicio.value
  const { xmlData, checkpoint, seguimientoLIVE, listadoCheckPoints } = storeToRefs(appStore)
  // console.log(checkpoint.value)

  const dialog = ref(false)

  const test = ref(null)

  const checkPointElegido = ref(checkpoint.value || null)

  watch(() => checkPointElegido.value, val => {
    appStore.setCheckPoint(val)
  })

  // const listadoCheckPoints = ref(JSON.parse(localStorage.getItem('listado_checkpoints')))

  const checkPointsCorredor = computed(() => {
    // const tempLista = [...listadoCheckPoints.value].slice()
    const cat = listadoCheckPoints.value.find(categoria => categoria.categoria === corredor.value.Corto)
    const el = cat.componentes.find(el => el.Dorsal == corredor.value.Dorsal)
    // console.log(el)
    return el
  })

  const actualizarCheckpoints = () => {
    // console.log(listadoCheckPoints.value)
    localStorage.setItem("listado_checkpoints", JSON.stringify(listadoCheckPoints.value))
    appStore.getDatosCarrera()
    dialog.value = false
  }
  



  const dorsalElite = corredor.value["Dorsal alt."]




  const seguimiento = ref(false)
  const seguimientoSalida = ref(false)
  const liveDSK = ref(false)
  const liveSeguimiento = ref(false)

  const setSeguimientoLIVE = val => {
    appStore.setSeguimiento(val)
  }

  const setDorsalSeguimientoLIVE = val => {
    appStore.setDorsalSeguimiento(val)

  }

  const colorBoton = computed(() => {
    if (liveDSK.value) {
      return "ERROR"
    }
    return "SUCCESS"
  })

  const desactivarBoton = ref(false)
  const desactivarBotonSalida = ref(false)

  const capitalizar = texto => {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }


  const calcularTiempo = val => {
    const hora = new Date(Date.parse(val))
    return hora.getHours() + ":"  + hora.getMinutes() + ":" + hora.getSeconds()
  }

  const calcularInicio = tiempo => {
    // console.log(tiempo)
  
    const horaInicio = tiempo.split(":")
    if (horaInicio.length <= 2) {
      horaInicio.push('00')
    }
    // console.log(horaInicio)
    const valoresInicio = inicio.split(":")
    if (valoresInicio.length <= 2) {
      valoresInicio.push('00')
    }

    var horas = parseInt(horaInicio[0]) + parseInt(valoresInicio[0])
    var minutos = parseInt(horaInicio[1]) + parseInt(valoresInicio[1])
    if (minutos >= 60) {
      horas ++
      minutos = minutos - 60
    }
    var segundos = parseInt(horaInicio[2]) + parseInt(valoresInicio[2])
    if(horas < 10) horas = '0' + horas
    if(minutos < 10) minutos = '0' + minutos
    if(segundos < 10) segundos = '0' + segundos
    // console.log(valoresInicio)
    
    return horas + ":" + minutos + ":" + segundos
  }

  function toHoursAndMinutes(totalSeconds) {
    const totalMinutes = Math.floor(totalSeconds / 60);
  
    const seconds = totalSeconds % 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
  
    return hours + ":" + minutes.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
      }) + ":" + seconds.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })
    }

  function convertirSegundos(segundos) {
    if (isNaN(segundos)) {
      return "00:00:00";
    }

    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = Math.floor(segundos % 60);

    const horasStr = horas.toString().padStart(1, "0");
    const minutosStr = minutos.toString().padStart(2, "0");
    const segundosStr = segundosRestantes.toString().padStart(2, "0");
    

    return `${horasStr}:${minutosStr}:${segundosStr}`;
  }

  const aMinutosYSegundos = segundos => {
    let signo = ''
    if(segundos < 0) {
      appStore.toggleVisibility("INTERMEDIOS", "SIGNO_MAS", false)
      appStore.toggleVisibility("INTERMEDIOS", "SIGNO_MENOS", true)
      segundos = Math.abs(segundos)
      signo = '- '
    } else {
      appStore.toggleVisibility("INTERMEDIOS", "SIGNO_MAS", true)
      appStore.toggleVisibility("INTERMEDIOS", "SIGNO_MENOS", false)
    }
    const minutos = Math.floor((segundos % 3600) / 60)
    const segundosRestantes = Math.floor(segundos % 60)
    const minutosStr = minutos.toString().padStart(2, "0")
    const segundosStr = segundosRestantes.toString().padStart(2, "0")

    return `${minutosStr}:${segundosStr}`;

  }

  const tiempoASegundos = (tiempoString) => {
    const tiempoArray = tiempoString.split(':');
    
    // Convertir cada parte del tiempo a números enteros
    const horas = parseInt(tiempoArray[0]);
    const minutos = parseInt(tiempoArray[1]);
    const segundos = parseInt(tiempoArray[2]);
    
    // Calcular el total de segundos
    const totalSegundos = horas * 3600 + minutos * 60 + segundos;
    
    return totalSegundos
  }


    // TIEMPOS SALIDA


  let intervaloSalida 
  const salida = (val, tiempo) => {
    desactivarBotonSalida.value = true
    setSeguimientoLIVE(true)
    const dorsal = corredor.value["Dorsal"]
    setDorsalSeguimientoLIVE(dorsal)
    const corredorSeguimiento = appStore.getFromXML(dorsal)
    seguimientoSalida.value = true
    console.log(corredor.value)


    

     intervaloSalida = setInterval(() => {
      var today = new Date()
      const actual = new Date(Date.parse(tiempo))
      let timepoactual = tiempo.split(":")
      if (timepoactual.length <= 2) {
        timepoactual.unshift('00')
      }
      var secondsActual = (((today.getHours() * 3600 )-1) + today.getMinutes() * 60 + today.getSeconds()) ;
      var secondsInicio = parseInt(timepoactual[0]) * 3600 + parseInt(timepoactual[1]) * 60 + parseInt(timepoactual[2])
      let secondsTotals = secondsActual-secondsInicio >= 0 ? secondsActual-secondsInicio : 0
      // console.log(secondsInicio)

      // appStore.liveUpdateIMG("DSK_CORREDOR", "BANDERA", "C:\\CROSS\\GRAFISMO\\BANDERAS\\" + appStore.bandera(corredor.value.Región))
      appStore.liveUpdateIMG("DSK_CORREDOR", "BANDERA", "C:\\CROSS\\GRAFISMO\\BANDERAS\\" + corredor.value.Club + ".jpg")
      appStore.liveUpdate("DSK_CORREDOR", "DORSAL", corredor.value.Dorsal)
      // appStore.liveUpdate("DSK_CORREDOR", "DORSAL", dorsalElite || corredor.value.Dorsal)
      appStore.liveUpdate("DSK_CORREDOR", "NOMBRE", corredor.value.Nombre + " " + corredor.value.Apellidos)
      appStore.liveUpdate("DSK_CORREDOR", "TIEMPO", toHoursAndMinutes(secondsTotals))
    }, 1000)
  }

  // TIEMPOS INTERMEDIOS

  let intervalo
  const seguir = (val, tiempo) => {
    setSeguimientoLIVE(true)
    const dorsal = corredor.value["Dorsal"]
    setDorsalSeguimientoLIVE(dorsal)

    const listadoCopia = JSON.parse(localStorage.getItem('listado_checkpoints'))
    
    let listadoCategoriaTodos = listadoCopia.find(categoria => categoria.categoria === corredor.value.Corto).componentes
    
    // Eliminar propio corredor
    
    let listadoCategoriaSinCorredor = listadoCategoriaTodos.filter(el => el.Dorsal !== dorsal)

    // Filtrar por estado
    
    // filtrar checkpoint
    
    // console.log(listadoCategoriaTodos)
    
    listadoCategoriaSinCorredor.forEach(el => {
      el.CheckPoints = el.CheckPoints.filter(cp => cp.numero == checkpoint.value)
    })
    // listadoCategoriaSinCorredor = listadoCategoriaSinCorredor.filter(el => !Number.isNaN(el.CheckPoints[0].tiempo))
    listadoCategoriaSinCorredor.forEach(el => console.log(el.CheckPoints[0]))
    // listadoCategoriaSinCorredor.forEach(el => {
    //   el.CheckPoints = el.CheckPoints.filter(cp => cp.numero == checkpoint.value)
    // })

    const tiemposPeores = listadoCategoriaSinCorredor.filter(el => {
      // console.log(el.CheckPoints[0] )
      return el.CheckPoints[0].tiempo !== null
    })
    
    tiemposPeores.forEach(corredor => {
      corredor.CheckPoints[0] = {
        numero: corredor.CheckPoints[0].numero,
        tiempo: tiempoASegundos(corredor.CheckPoints[0].tiempo)
      }        
    })
    
    tiemposPeores.sort((a, b) => a.CheckPoints[0].tiempo - b.CheckPoints[0].tiempo)
    
    let tiemposMejores = []
    seguimiento.value = true

    for(let i = 0; i < tiemposPeores.length; i++) {
      var today = new Date()
      const actual = new Date(Date.parse(tiempo))
      let timepoactual = tiempo.split(":")
      if (timepoactual.length <= 2) {
        timepoactual.unshift('00')
      }
      var secondsActual = (((today.getHours() * 3600 )-1) + today.getMinutes() * 60 + today.getSeconds()) ;
      var secondsInicio = parseInt(timepoactual[0]) * 3600 + parseInt(timepoactual[1]) * 60 + parseInt(timepoactual[2])
      let secondsTotals = secondsActual-secondsInicio >= 0 ? secondsActual-secondsInicio : 0
      for( let i = 0; i <= tiemposPeores.length-1; i++) {
        if(tiemposPeores[i].CheckPoints[0].tiempo <= secondsTotals) {
          console.log(tiemposPeores[i])
          tiemposMejores.push(tiemposPeores.shift())
        }
      }
    }


     intervalo = setInterval(() => {
      var today = new Date()
      const actual = new Date(Date.parse(tiempo))
      let timepoactual = tiempo.split(":")
      if (timepoactual.length <= 2) {
        timepoactual.unshift('00')
      }
      var secondsActual = (((today.getHours() * 3600 )-1) + today.getMinutes() * 60 + today.getSeconds()) ;
      var secondsInicio = parseInt(timepoactual[0]) * 3600 + parseInt(timepoactual[1]) * 60 + parseInt(timepoactual[2])
      let secondsTotals = secondsActual-secondsInicio >= 0 ? secondsActual-secondsInicio : 0
      for( let i = 0; i <= tiemposPeores.length-1; i++) {
        if(tiemposPeores[i].CheckPoints[0].tiempo <= secondsTotals) {
          console.log(tiemposPeores[i])
          tiemposMejores.push(tiemposPeores.shift())
        }
      }

      // ENVIO INTERMEDIOS
      // ANTERIOR
      let anterior = ""
      let posicion_anterior = ""
      let tiempo_anterior = ""
      let nombre_anterior = ""


      if(tiemposMejores.length >= 1) {
        anterior = tiemposMejores[tiemposMejores.length-1]
        posicion_anterior = tiemposMejores.length 
        nombre_anterior = anterior.Dorsal + " - " + anterior.Nombre + " " + anterior.Apellidos || ""
        tiempo_anterior = convertirSegundos(anterior.CheckPoints[0].tiempo)
      }

      // SIGUIENTE

      let siguiente = ""
      let posicion_siguiente = ""
      let tiempo_siguiente = ""
      let nombre_siguiente = ""
      if (tiemposPeores.length >= 1) {
       siguiente = tiemposPeores[0]
       posicion_siguiente = posicion_anterior + 2
       nombre_siguiente = siguiente.Dorsal + " - " + siguiente.Nombre + " " + siguiente.Apellidos || ""
      tiempo_siguiente = convertirSegundos(siguiente.CheckPoints[0].tiempo)
      }  

      const textoIntermedios = () => {
        if(checkpoint.value == "meta") {
          return "META"
        }
        return `PUNTO INTERMEDIO ${checkpoint.value}`
      }

      // DIRERENCIA DE TIEMPOS

      let diferenciaTiempo = "00:00"
      const tiempoCorredorActual = secondsActual-secondsInicio
      if(tiemposMejores.length >= 1) {

        const tiempoPrimerClas = tiemposMejores[0].CheckPoints[0].tiempo
        diferenciaTiempo = aMinutosYSegundos(tiempoCorredorActual - tiempoPrimerClas)
      } else if (tiemposPeores.length >= 1) {
        const tiempoSegundoClas = tiemposPeores[0].CheckPoints[0].tiempo
        diferenciaTiempo = aMinutosYSegundos(tiempoCorredorActual - tiempoSegundoClas)

      }

      //ENVIO A VMIX

      appStore.liveUpdate("INTERMEDIOS", "PUNTO_INTERMEDI", textoIntermedios())
      appStore.liveUpdate("INTERMEDIOS", "D_ACTUAL", posicion_anterior + 1)
      appStore.liveUpdate("INTERMEDIOS", "N_ACTUAL", corredor.value.Dorsal + " - " + corredor.value.Nombre + " " + corredor.value.Apellidos)
      appStore.liveUpdate("INTERMEDIOS", "T_ACTUAL", convertirSegundos(secondsActual-secondsInicio))
      appStore.liveUpdate("INTERMEDIOS", "DIF_ACTUAL", diferenciaTiempo)

      // console.log(nombre_anterior)
      appStore.liveUpdate("INTERMEDIOS", "D_ANTERIOR", posicion_anterior)
      appStore.liveUpdate("INTERMEDIOS", "N_ANTERIOR", nombre_anterior)
      appStore.liveUpdate("INTERMEDIOS", "T_ANTERIOR", tiempo_anterior)
      
      
      appStore.liveUpdate("INTERMEDIOS", "D_SIGUIENTE", posicion_siguiente)
      appStore.liveUpdate("INTERMEDIOS", "N_SIGUIENTE", nombre_siguiente)
      appStore.liveUpdate("INTERMEDIOS", "T_SIGUIENTE", tiempo_siguiente)
    }, 1000)
  }

  const checkPeores = () => {
    let tempTiemposPeores = appStore.parcialesPorCategorias(corredor.value.Corto).slice()
    // console.log(tempTiemposPeores)
    const filtrarUndefined = tempTiemposPeores.filter(el => {
      return el !== undefined
    } )
    // console.log(filtrarUndefined)
    const peores = filtrarUndefined.filter(el => {
      // console.log(el)
      return el.Result.BibNumber != dorsal
    })

    // console.log(tiempo)
    const tiempo = calcularInicio(corredor.value.Salida)
    var today = new Date()
    const actual = new Date(Date.parse(tiempo))
    let timepoactual = tiempo.split(":")
    if (timepoactual.length <= 2) {
      timepoactual.unshift('00')
    }
    var secondsActual = (((today.getHours() * 3600 )-1) + today.getMinutes() * 60 + today.getSeconds()) ;
    var secondsInicio = parseInt(timepoactual[0]) * 3600 + parseInt(timepoactual[1]) * 60 + parseInt(timepoactual[2])
    let secondsTotals = secondsActual-secondsInicio >= 0 ? secondsActual-secondsInicio : 0

    let mejores = []
    let tempPeores = []
    let tempMejores = []
    for (let i = 0; i <= peores.length -1; i++) {
      if(peores[i].Result.SplitTime[checkpoint.value.indice].Time <= secondsTotals) {
        tempMejores.push(peores[1])  
        // mejores.push(peores.shift())
        } else {
          tempPeores.push(peores[i])
        }
    }
    // console.log(tempMejores)
  }
  
  const pararSeguimiento = () => {
    desactivarBoton.value = false
    liveSeguimiento.value = false
    seguimiento.value = false
    setSeguimientoLIVE(false)
    setDorsalSeguimientoLIVE(null)
    
    
    clearInterval(intervalo)
    // appStore.liveVmix({nombre:'INTERMEDIOS', liveDSK:liveDSK.value})
  }
  const pararSalida = () => {
    desactivarBotonSalida.value = false
    liveSeguimiento.value = false
    seguimientoSalida.value = false
    setSeguimientoLIVE(false)
    setDorsalSeguimientoLIVE(null)
    
    
    clearInterval(intervaloSalida)
    // appStore.liveVmix({nombre:'INTERMEDIOS', liveDSK:liveDSK.value})
  }

  const enviarDSK = () => {
    
      appStore.liveUpdateIMG("NOMBRE_SOLO", "BANDERA", "C:\\CROSS\\GRAFISMO\\BANDERAS\\" + corredor.value.Club + ".jpg")
      // appStore.liveUpdateIMG("NOMBRE_SOLO", "BANDERA", "C:\\CROSS\\GRAFISMO\\BANDERAS\\" + appStore.bandera(corredor.value.Región))
      appStore.liveUpdate("NOMBRE_SOLO", "DORSAL", corredor.value.Dorsal)
      // appStore.liveUpdate("NOMBRE_SOLO", "DORSAL", dorsalElite || corredor.value.Dorsal)
      appStore.liveUpdate("NOMBRE_SOLO", "NOMBRE", corredor.value.Nombre + " " + corredor.value.Apellidos)
      appStore.liveVmix({nombre:'NOMBRE_SOLO', liveDSK:liveDSK.value})
      // liveDSK.value = !liveDSK.value



  }

    // Objeto de mapeo de provincias a comunidades autónomas
  const provinciasAComunidades = {
    'Álava': 'País Vasco',
    'Albacete': 'Castilla La Mancha',
    'Alicante': 'Comunidad Valenciana',
    'Almería': 'Andalucia',
    'Asturias': 'Asturias',
    'Ávila': 'Castilla y León',
    'Badajoz': 'Extremadura',
    'Barcelona': 'Cataluña',
    'Burgos': 'Castilla y León',
    'Cáceres': 'Extremadura',
    'Cádiz': 'Andalucia',
    'Cantabria': 'Cantabria',
    'Castellón': 'Comunidad Valenciana',
    'Ciudad Real': 'Castilla La Mancha',
    'Córdoba': 'Andalucia',
    'Cuenca': 'Castilla La Mancha',
    'Girona': 'Cataluña',
    'Granada': 'Andalucia',
    'Guadalajara': 'Castilla La Mancha',
    'Guipúzcoa': 'País Vasco',
    'Huelva': 'Andalucia',
    'Huesca': 'Aragón',
    'Islas Baleares': 'Islas Baleares',
    'Jaén': 'Andalucia',
    'La Coruña': 'Galicia',
    'La Rioja': 'La Rioja',
    'Las Palmas': 'Canarias',
    'León': 'Castilla y León',
    'Lérida': 'Cataluña',
    'Lugo': 'Galicia',
    'Madrid': 'Madrid',
    'Málaga': 'Andalucia',
    'Murcia': 'Murcia',
    'Navarra': 'Comunidad Foral de Navarra',
    'Orense': 'Galicia',
    'Palencia': 'Castilla y León',
    'Pontevedra': 'Galicia',
    'Salamanca': 'Castilla y León',
    'Santa Cruz de Tenerife': 'Canarias',
    'Segovia': 'Castilla y León',
    'Sevilla': 'Andalucia',
    'Soria': 'Castilla y León',
    'Tarragona': 'Cataluña',
    'Teruel': 'Aragón',
    'Toledo': 'Castilla La Mancha',
    'Valencia': 'Comunidad Valenciana',
    'Valladolid': 'Castilla y León',
    'Vizcaya': 'País Vasco',
    'Zamora': 'Castilla y León',
    'Zaragoza': 'Aragón',
    'FEDO': 'FEDO',
    'Tisvilde Hegn OK': 'DIN'
  };

  // Función para convertir una provincia en comunidad autónoma
  function provinciaAComunidad(provincia) {
    const resultado = provinciasAComunidades[provincia] || 'Provincia no encontrada' + provincia;
    return `${resultado}.jpg`
  }

  // const bandera = provinciaAComunidad(corredor.value.Región)
  // const bandera = () => {
  //   const pais = corredor.value.Ciudad.toUpperCase()
  //   return `${pais}.jpg`
  //   // console.log(`BANDERA_${pais}`)
  //   // return `BANDERA_${pais}`
  // }
    // console.log(bandera)

  const goLive = payload => {
    appStore.liveVmix(payload.nombre)
    console.log(payload)
  }
  const goPVW = payload => {
    appStore.PVWVmix(payload.nombre)
  }


  // watch(checkPointsCorredor.value, (val) => {
  //   console.log(val)
  // },
  // {deep: true})
  


</script>

<style scoped>
  .estiloCorredor {
    background-color: #ececec;
    border: 2px solid black;
    padding: 5px 5px;
    margin: 2px 5px;
  }
</style>