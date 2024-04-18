<template>
  <span v-if="corredor && corredor.Result.BibNumber!=undefined">

    <v-row v-if="corredor.Result.BibNumber == dorsal || !dorsal">
      <v-col cols="1">
        {{ corredor.Result.BibNumber }}
      </v-col>
      <v-col cols="3">
        {{ corredor.Person.Name.Given }} {{ corredor.Person.Name.Family }}
      </v-col>
      <v-col cols="2">
        {{ calcularTiempo(corredor.Result.StartTime) }}
      </v-col>
      <v-col cols="3">
        {{ toHoursAndMinutes(corredor.Result.Time) }}
      </v-col>
      <v-col cols="3">
        <v-btn>DSK</v-btn>
        <v-btn v-if="!seguimiento" @click="seguir(true, corredor.Result.StartTime)">SEGUIR</v-btn>
        <v-btn  v-if="seguimiento" @click="pararSeguimiento()">PARAR</v-btn>
      </v-col>
    </v-row>
  </span>
<!-- <span v-if="corredor.Result.BibNumber == dorsal || !dorsal">
        {{ corredor.Result.BibNumber }} - {{ corredor.Person.Name.Given }} {{ corredor.Person.Name.Family }} | {{ corredor.Result.StartTime }}
      </span> -->

</template>

<script setup>
  import { ref, toRefs } from 'vue';
  import { useAppStore } from "../store/app.js"

  const appStore = useAppStore()

  const props = defineProps(["corredor", "dorsal"]) 

  const { corredor, dorsal } = toRefs(props);
  // console.log(corredor.value)

  // console.log(corredor.value)

  const seguimiento = ref(false)


  const calcularTiempo = val => {
    // console.log(corredor.value)
    const hora = new Date(Date.parse(val))
    return hora.getHours() + ":"  + hora.getMinutes() + ":" + hora.getSeconds()
  }

  function toHoursAndMinutes(totalSeconds) {
    const totalMinutes = Math.floor(totalSeconds / 60);
  
    const seconds = totalSeconds % 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    // console.log( hours + " : " + minutes + " : " + seconds)
  
    return hours + ":" + minutes.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
    }) + ":" + seconds.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })
    }


  // console.log(appStore)
  let intervalo 
  const seguir = (val, tiempo) => {
    seguimiento.value = true
     intervalo = setInterval(() => {
      var today = new Date()
      const actual = new Date(Date.parse(tiempo))
      var secondsActual = (today.getHours() * 3600 + today.getMinutes() * 60 + today.getSeconds()) ;
      var secondsInicio = (actual.getHours() * 3600 + actual.getMinutes() * 60 + actual.getSeconds());
      // console.log(secondsActual)
      // console.log(secondsInicio)
      console.log(toHoursAndMinutes(secondsActual-secondsInicio))
      appStore.liveUpdate("TEST", "Headline", corredor.value.Person.Name.Given)
      appStore.liveUpdate("TEST", "Description", toHoursAndMinutes(secondsActual-secondsInicio))
      // tiempoReal.value = new Date(Date.parse(tiempo))
      // console.log(tiempoReal.value, today)

    }, 1000)
  }
  
  const pararSeguimiento = () => {
    seguimiento.value = false
    
    clearInterval(intervalo)
  }
  
  
  // appStore.getCsv()
</script>