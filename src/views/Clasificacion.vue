<template>
  <div v-if="clasificacion" class="cuadroClasificacion">

    <div v-for="(categoria, index) in clasificacion.data" :key="index">
      <v-row>
        <v-col cols="12" class="text-center">
          <h3>Clasificacion {{ index }}</h3>
        </v-col>
      </v-row>
      <v-table density="compact" theme="dark">
        <thead>
          <tr>
            <th class="text-left" style="width: 30px"><p>Posición</p></th>
            <th class="text-left"><p>Dorsal</p></th>
            <th class="text-left"><p>Bandera</p></th>
            <th class="text-left"><p>Nombre</p></th>
            <th class="text-left"><p>Tiempo</p></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="corredor in categoria"
            :key="corredor.Dorsal"
          >
            <td><h6>{{ corredor.Puesto }}</h6></td>
            <td><h6>{{ corredor.Dorsal }}</h6></td>
            <!-- <td><img :src="ruta + `${corredor.Club}.jpg`" alt=""></td> -->
            <td><h6>{{ buscarBandera(corredor[campoBandera]) }}</h6></td>
            <!-- <td><h6>{{ appStore.bandera(corredor.Region) }}</h6></td> -->
            <td><h6>{{ corredor.Nombre }} {{ corredor.Apellidos }}</h6></td>
            <td><h6>{{ corredor.Tiempo }}</h6></td>
          </tr>
        </tbody>
      </v-table>
      <v-row class="mb-6">
        <v-col class="text-center">
          <v-btn color="success" size="x-small" @click="enviarClasificacion(index)">ENVIAR CLASIFICACIÓN {{ index }}</v-btn>
        </v-col>
      </v-row>
      <!-- <div v-for="corredor in categoria" :key="corredor.Puesto">
        <v-row>

          <v-col cols="12">{{ corredor.Nombre }}</v-col>
        </v-row>
      </div> -->

    </div>
  </div>
  <v-row>
    <v-col cols="12" class=text-center>
      <v-btn @click="router.push('/directo')" color="success">VOLVER</v-btn>

    </v-col>
  </v-row>


</template>

<script setup>
  import { computed, ref } from "vue"
  import { useAppStore } from "../store/app.js"
  import { storeToRefs } from "pinia"
  import router from "@/router"

  const appStore = useAppStore()

  const { clasificacion, datos_carrera } = storeToRefs(appStore)

  const campoBandera = ref(datos_carrera.value.campoBandera)

  const clasME = computed(() => clasificacion.value.data["M-E"])
  const clasFE = computed(() => clasificacion.value.data["F-E"])
  const banderaClub = club => `${club}.jpg`
  
  const ruta = ref('/assets/banderas/')

  const buscarBandera = bandera => {
    const tipoBanderas = datos_carrera.value.tipoBanderas
    console.log(tipoBanderas)
    if(tipoBanderas === "Comunidades") {
      return appStore.bandera(bandera)
    } else if (tipoBanderas === "Paises"){
      return appStore.banderaPais(bandera)
    }
  }
  // const bandera = (region) => appStore.bandera
  const enviarClasificacion = (nombreCategoria) => {
    const listado = clasificacion.value.data[nombreCategoria]
    let input = "CLASIFICACION1"
    let posicion = 1
    appStore.liveUpdate("CLASIFICACION1", "CLAS_CATEGORIA", nombreCategoria)
    appStore.liveUpdate("CLASIFICACION2", "CLAS_CATEGORIA", nombreCategoria)

    for(let i = 1; i <= 22; i++) {
      let orden = i + posicion
      if(i >= 11) {
        posicion = -11
        input="CLASIFICACION2"
      }
      appStore.liveUpdateIMG(input, `BANDERA_CLAS${orden}`, "C:\\CROSS\\GRAFISMO\\BANDERAS\\BLANK.jpg")
      appStore.liveUpdate(input, `NUM_CLAS${orden}`, "")
      appStore.liveUpdate(input, `NOMBRE_CLAS${orden}`, "")
      appStore.liveUpdate(input, `TIEMPO_CLAS${orden}`, "")
    }

    input = "CLASIFICACION1"
    posicion = 1

    for(let i = 0; i <= listado.length -1; i++) {
      let orden = i + posicion
      if(!listado[i]) return
      // if(listado[i].Region) appStore.liveUpdateIMG(input, `BANDERA_CLAS${orden}`, "C:\\CROSS\\GRAFISMO\\BANDERAS\\" + appStore.bandera(listado[i].Region))
      // if(listado[i].Club) appStore.liveUpdateIMG(input, `BANDERA_CLAS${orden}`, "C:\\CROSS\\GRAFISMO\\BANDERAS\\" + listado[i].Club + ".jpg")
      appStore.liveUpdateIMG(input, `BANDERA_CLAS${orden}`, "C:\\CROSS\\GRAFISMO\\BANDERAS\\" + buscarBandera(listado[i][campoBandera.value]))
      appStore.liveUpdate(input, `NUM_CLAS${orden}`, listado[i].Puesto)
      appStore.liveUpdate(input, `NOMBRE_CLAS${orden}`, listado[i].Nombre + " " + listado[i].Apellidos)
      appStore.liveUpdate(input, `TIEMPO_CLAS${orden}`, listado[i].Tiempo)
      if(i >= 10) {
        posicion = -10
        input="CLASIFICACION2"
      }
    }


  }

</script>

<style scoped>
.cuadroClasificacion {
  width: 80%;
  margin: 0 auto;
}

.cuadroClasificacion img {
  max-height: 20px;
}

</style>