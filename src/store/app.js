// Utilities
import { defineStore } from 'pinia'

import { io } from 'socket.io-client'

import axios from "axios"
import Papa from 'papaparse'
// import fs from 'fs'
// import csvtojson from 'csvtojson'
// import csv from '../xml/1media.csv'

// import jsondata from '../xml/VALLADOLID_MEDIA.json'
import jsondata from '../xml/VALLADOLID_LARGA.json'
// import jsondata from '../xml/VALLADOLID_LARGA.json'


export const useAppStore = defineStore('app', {
  state: () => ({
    datos_carrera: null,
    xmlData: null,
    // url: "../src/xml/test5.xml",
    // url: "http://169.254.20.87:8088/",


    // PONER URL VMIX AQUI
    // url: "http://192.168.150.216:8088/",
    url: "http://192.168.28.33:8088/",
    // url: "http://192.168.50.200:8088/",
    // xml_url: "../src/xml/tests/larga_sevilla.xml",
    // xml_url: "../src/xml/tests/test8parciales.xml",
    xml_url: "../src/xml/PARCIALES_AVILA.xml",
    jsonServer: "http://localhost:3000",
    clasificacion: null,
    intermedios: null,
    categorias: [],
    listadoCategorias: [],
    tiemposParciales: [],
    parcialesPeores: [],
    parcialesMejores: [],
    // checkpoint: {codigo:33, indice: 0},
    checkpoint: 'meta',
    controlcode: 33,
    horaInicio: "17:00:4",
    checkPoints: [],
    listadoCheckPoints: [],
    seguimientoLIVE: false,
    dorsalSeguimiento: null,
    textosDSK: [
      "Nando Rico \n Narración",
      "Carmen Castro",
      "Camara Dron",
      "Camara runner",
      "Salida",
      "Punto intermedio",
      "César Rodríguez",
      "Cosme Sánchez",
      "Trac Trac Cadete Femenino",
      "Trac Trac Cadete Masculino",
      "Trac Trac Infantil Femenino",
      "Trac Trac Infantil Masculino",
      "Trac Trac Juvenil Masculino",
      "Trac Trac Juvenil Femenino",
      "Punto 91 - TV 1",
      "Punto 75 - TV 2",
      "Meta"
    ],
    csvData: null,
    csvFilePath: '../src/xml/tests/test_parciales.csv',
    flag: false
  }),
  getters: {
    
    getXmlData() {
      return this.xmlData
    },
    getCorredorActivo: state => {
      if(state.dorsalSeguimiento == null) return null
      const lista = []
      state.categorias.forEach(categoria => {
        categoria.componentes.forEach(corredor => {
          lista.push(corredor)
        })
      })
      const corredor = lista.find(el => {
        return el.Dorsal == state.dorsalSeguimiento
      })
      
      return corredor
    }
  },
  actions: {
    conectarWS() {
      // PARA RECIBIR DATOS DESDE WINSOCK CLIENT
      // ESTOS DATOS VIENEN ORIGINALMENTE DE LA APLICACIÓN JSH.RADIO.
      // ES EL WINSOCK CLIENT QUIEN CONETCA DIRECTAMENTE CON LA APLICACIÓN DE RADIO
      // AQUI SE RECIBEN LOS DATOS DE FORMA INDIRECTA


      const horaCero = this.datos_carrera.horaCero
      const socket = io("ws://localhost:3001", {
        withCredentials: true,
      })
      // let tempData = JSON.parse(localStorage.getItem('tempDataLarga'))
      // if(!tempData) tempData = [] 
      socket.on('datos', data => {
        // console.log(data)
        // tempData.push(data)
        // localStorage.setItem("tempDataLarga", tempData)
        // if(this.flag) return
        const datos = data.split(";")
        const chipNum = parseInt(datos[1])
        const checkpointNum = datos[2].toString()
        const tiempo = datos[7].split('.')[0].trim()

        // console.log(tiempo)

        for (const categoria of this.listadoCheckPoints) {
          
          for (const corredor of categoria.componentes) {
            // console.log(corredor["Nº chip"] == chipNum)
              if (corredor["Nº chip"] == chipNum) {
                const salida = corredor.Salida
                // console.log(corredor)
                // console.log(salida)
                
                // const msHoraCero = this.convertirATiempoMilisegundos(horaCero)
                // const msTiempo = this.convertirATiempoMilisegundos(tiempo)
                // const msSalida = this.convertirATiempoMilisegundos(salida)
                // let diferenciaMs = msTiempo - (msSalida + msHoraCero)
                
                // // Convertir la diferencia de milisegundos a horas, minutos y segundos
                // let horas = Math.floor(diferenciaMs / (3600 * 1000));
                // let minutos = Math.floor((diferenciaMs % (3600 * 1000)) / (60 * 1000))
                // let segundos = Math.floor((diferenciaMs % (60 * 1000)) / 1000)
                
                // // Formatear el resultado a "HH:MM:SS"
                // let diferenciaTiempo = this.formatearTiempo(horas, minutos, segundos)

                
                
                let diferenciaTiempo = this.tiempoTotal(horaCero, salida, tiempo)
                // console.log(diferenciaTiempo)
                // console.log(horaCero, salida, tiempo)
                corredor.CheckPoints.forEach(cp => {
                  if(checkpointNum == 33) {
                    console.log(this.sumarTiempo(horaCero, salida), tiempo)
                    console.log(diferenciaTiempo)
                  }
                  if(checkpointNum < 30 && cp.numero === 'meta') {
                    // console.log(tiempo)
                    // console.log(salida)
                    // console.log(tiempo, salida, horaCero )
                    // console.log(msTiempo, msSalida, msHoraCero)
                    // console.log(diferenciaMs)
                    
                    cp.tiempo = diferenciaTiempo
                    // console.log(cp)
                  } else if(cp.numero === checkpointNum) {
                  cp.tiempo = diferenciaTiempo
                  }

                })
                // console.log(corredor)
                // for(const cp of corredor.CheckPoints) {
                //   }
              }
          }
          localStorage.setItem("listado_checkpoints", JSON.stringify(this.listadoCheckPoints))
      }
      } )
    },
    sumarTiempo(hora, tiempo) {
      // Convertir hora y tiempo a formato de fecha
      const [horasCero, minutosCero, segundosCero] = hora.split(':').map(Number);
      const [horasSalida, minutosSalida, segundosSalida] = tiempo.split(':').map(Number);

      // Crear un objeto Date ficticio para la hora cero
      const fechaHoraCero = new Date(0, 0, 0, horasCero, minutosCero, segundosCero);

      // Sumar el tiempo de salida
      fechaHoraCero.setHours(fechaHoraCero.getHours() + horasSalida);
      fechaHoraCero.setMinutes(fechaHoraCero.getMinutes() + minutosSalida);
      fechaHoraCero.setSeconds(fechaHoraCero.getSeconds() + segundosSalida);

      // Devolver el tiempo de salida total (hora cero + tiempo adicional) como cadena HH:MM:SS
      return fechaHoraCero.toTimeString().split(' ')[0];

    },
    tiempoTotal(horaCero, tiempoSalida, horaLlegada) {
      // Obtener la hora real de salida sumando hora cero + tiempo de salida
      const horaSalidaReal = this.sumarTiempo(horaCero, tiempoSalida);

      // Convertir la hora de salida real y la hora de llegada en objetos Date
      const [horasSalida, minutosSalida, segundosSalida] = horaSalidaReal.split(':').map(Number);
      const [horasLlegada, minutosLlegada, segundosLlegada] = horaLlegada.split(':').map(Number);

      // Crear fechas ficticias con esas horas para hacer la diferencia
      const fechaSalida = new Date(0, 0, 0, horasSalida, minutosSalida, segundosSalida);
      const fechaLlegada = new Date(0, 0, 0, horasLlegada, minutosLlegada, segundosLlegada);

      // Calcular la diferencia en milisegundos
      let diferenciaMs = fechaLlegada - fechaSalida;

      // Si la diferencia es negativa, quiere decir que pasó la medianoche
      if (diferenciaMs < 0) {
          // Añadir 24 horas a la diferencia
          diferenciaMs += 24 * 60 * 60 * 1000;  // 24 horas en milisegundos
      }

      // Convertir la diferencia en horas, minutos y segundos
      const horas = Math.floor(diferenciaMs / (1000 * 60 * 60));
      const minutos = Math.floor((diferenciaMs % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diferenciaMs % (1000 * 60)) / 1000);

      // Devolver el tiempo total en formato HH:MM:SS
      return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

    },
    convertirATiempoMilisegundos(hora) {
      let partes = hora.split(':');
      let horas = parseInt(partes[0], 10);
      let minutos = parseInt(partes[1], 10);
      let segundos = parseInt(partes[2], 10);
      // console.log(horas, minutos, segundos)
    
      return (horas * 3600 + minutos * 60 + segundos) * 1000;
    },
    formatearTiempo(horas, minutos, segundos) {
      return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
    },

    async getClasificación() {
      // SE RECIBE LA CLASIFICACIÓN DESDE JSONSERVER
      const data = await axios.get(this.jsonServer + "/clasificacion")
        .catch(err => {
          console.log("Error de conexión " + err)
        })
        // console.log(data.data)
      this.clasificacion = data

    },
    async getIntermedios() {
      // SE RECIBE LOS DATOS DE PUNTOS INTERMEDIOS DESDE JSONSERVER
      const data = await axios.get(this.jsonServer + "/parciales")
        .catch(err => {
          console.log("Error de conexión " + err)
        })
        // console.log(data.data)
      localStorage.setItem("intermedios", JSON.stringify(data.data))

      this.intermedios = data

    },

    async getSalidas() {
      // SE RECIBE LOS DATOS DE HORAS DE SALIDA
      const data = await axios.get(this.jsonServer + "/salidas")
        .catch(err => {
          console.log("Error de conexión " + err)
        })

        this.loadData(data.data)
      // localStorage.setItem("intermedios", JSON.stringify(data.data))

      // this.intermedios = data

    },
    async actualizarIntermedios() {
      await this.getIntermedios()
      // SE CRUZAN LOS DATOS DESDE RADIO Y LA APLICACIÓN OE12
      // THIS.INTERMEDIOS TIENE LOS DATOS DESDE JSON SERVER

      const datos = this.intermedios.data // LISTADO DESDE JSON SERVER
      const listadoParticipantes = this.listadoCheckPoints // LISTADO ORIGINAL
      // console.log(listadoParticipantes)


      listadoParticipantes.forEach(categoria => { //LOOP SOBRE CATEGORIAS ORIGINAL
        categoria.componentes.forEach(componente => { // LOOP SOBRE COMPONENTES EN CATEGORIAS ORIGINAL
          const corredor = datos.find(el => el.Dorsal == componente.Dorsal) // Buscar elemento en JSON
          if(!corredor) return
          const parcialesCorredor = corredor.Parciales // Parciales Totales desde JSON
          componente.CheckPoints.forEach(checkpoint => { // Loop sobre checkpoints original

            const parcial = parcialesCorredor.find(cp => cp.numero == checkpoint.numero) // Buscar parcial en listado JSON
            if(!parcial) return
            checkpoint.tiempo = parcial.tiempo

          })
        })
      })
      localStorage.setItem("listado_checkpoints", JSON.stringify(this.listadoCheckPoints))

    },

    
  
    // Función para convertir una provincia en comunidad autónoma
    provinciaAComunidad(provincia) {
      const provinciasAComunidades = {
        'Álava': 'País Vasco',
        'Albacete': 'Castilla La Mancha',
        'Alicante': 'Comunitat Valenciana',
        'Almería': 'Andalucía',
        'Asturias': 'Asturias',
        'Ávila': 'Castilla y León',
        'Badajoz': 'Extremadura',
        'Barcelona': 'Catalunya',
        'Burgos': 'Castilla y León',
        'Cáceres': 'Extremadura',
        'Cádiz': 'Andalucía',
        'Cantabria': 'Cantabria',
        'Castellón': 'Comunitat Valenciana',
        'Ciudad Real': 'Castilla La Mancha',
        'Córdoba': 'Andalucía',
        'Cuenca': 'Castilla La Mancha',
        'Girona': 'Catalunya',
        'Granada': 'Andalucía',
        'Guadalajara': 'Castilla La Mancha',
        'Guipúzcoa': 'País Vasco',
        'Huelva': 'Andalucía',
        'Huesca': 'Aragón',
        'Islas Baleares': 'Islas Baleares',
        'Jaén': 'Andalucía',
        'La Coruña': 'Galicia',
        'La Rioja': 'La Rioja',
        'Las Palmas': 'Canarias',
        'León': 'Castilla y León',
        'Lérida': 'Catalunya',
        'Lugo': 'Galicia',
        'Madrid': 'Madrid',
        'Málaga': 'Andalucía',
        'Murcia': 'Murcia',
        'Navarra': 'Comunidad Foral de Navarra',
        'Orense': 'Galicia',
        'Palencia': 'Castilla y León',
        'Pontevedra': 'Galicia',
        'Salamanca': 'Castilla y León',
        'Santa Cruz de Tenerife': 'Canarias',
        'Segovia': 'Castilla y León',
        'Sevilla': 'Andalucía',
        'Soria': 'Castilla y León',
        'Tarragona': 'Catalunya',
        'Teruel': 'Aragón',
        'Toledo': 'Castilla La Mancha',
        'Valencia': 'Comunitat Valenciana',
        'Valladolid': 'Castilla y León',
        'Vizcaya': 'País Vasco',
        'Zamora': 'Castilla y León',
        'Zaragoza': 'Aragón',
        'FEDO': 'FEDO',
        'Tisvilde Hegn OK': 'DIN'
      }
      const resultado = provinciasAComunidades[provincia] || 'Provincia no encontrada' + provincia;
      return resultado
      // return `${resultado}.jpg`
    },
    banderaPais(pais) {
      const countries = {
        DEU: "GERMANY",
        AUT: "AUSTRIA",
        BEL: "BELGIUM",
        BRA: "BRAZIL",
        CHN: "CHINA",
        ECU: "ECUADOR",
        ESP: "SPAIN",
        USA: "USA",
        FRA: "FRANCE",
        KAZ: "KAZAKHSTAN",
        LVA: "LATVIA",
        LTU: "LITHUANIA",
        NLD: "NETHERLANDS",
        POL: "POLAND",
        PRT: "PORTUGAL",
        ROU: "ROMANIA",
        SWE: "SWEDEN",
        CHE: "SWITZERLAND"
      }

      // cosnt resultado = 
      return `BANDERA_${pais.toUpperCase()}.png` || 'BLANK.jpg'
      // return `${countries[pais].toUpperCase()}.jpg` || 'BLANK.jpg'
       
    },
    bandera(region) {
      if(!region) return 'BLANK.jpg'
      return `${this.provinciaAComunidad(region).toUpperCase()}.jpg`
    },

    reset() {
      const datos_carrera = {
        horaCero: null,
        numCheckPoints: null,
        checkPoints: null,
        presentacion: {
          categoria: null,
          distancia: null,
          fecha: null,
        },
        meteo: {
          cielo: null,
          viento: null,
          temperatura: null,
        },
        descripcion_carrera_ME: {
          categoria: null,
          distancia: null,
          desnivel: null,
          controles: null,
          tiempo_estimado: null,
        },
        descripcion_carrera_FE: {
          categoria: null,
          distancia: null,
          desnivel: null,
          controles: null,
          tiempo_estimado: null,
        }
      }
      this.datos_carrera = datos_carrera
      // console.log(this.datos_carrera)
      
    },
    getDatosCarrera() {
      const datos = JSON.parse(localStorage.getItem('datos_carrera'))
      if(datos) {
        this.datos_carrera = datos
        this.horaInicio = datos.horaCero
      }

      const listado_checkpoints = JSON.parse(localStorage.getItem('listado_checkpoints'))
      this.listadoCheckPoints = listado_checkpoints
    },

    crearListadoCheckpoints() {
      const datos = JSON.parse(localStorage.getItem('datos_carrera'))
      this.datos_carrera = datos

// 
      const listado_checkpoints = datos.checkPoints
      // const listado_checkpoints = JSON.parse(localStorage.getItem('listado_checkpoints'))
      // let meta = false
      // listado_checkpoints.forEach(cp => {
      //   if (cp.numero == "meta") {
      //     meta = true
      //   }
      // })
      // if(!meta) {
      //   console.log("no meta", listado_checkpoints)
      //   listado_checkpoints.push({numero: "meta", tiempo: null})
      //   console.log(listadoCheckPoints)
      //   // localStorage.setItem("listado_checkpoints", listado_checkpoints)
      //   this.datos_carrera.checkPoints = [...listadoCheckPoints]

      // } else {
      //   console.log("meta")
      // }
      // this.listadoCheckPoints = listado_checkpoints
      // console.log(this.listadoCheckPoints)

      const listado = this.categorias
      const numCheckPoints = this.datos_carrera.numCheckPoints
      // console.log(numCheckPoints)

      const checkPoints = [...listado_checkpoints]

      // console.log(checkPoints)


      // console.log(this.datos_carrera.checkPoints)

      const listadoCorredoresCheckPoints = []

      listado.forEach(cat => {        
        const lista = {
          categoria: cat.categoria,
          componentes: []
        }
        cat.componentes.forEach(corredor => {
          // console.log(corredor)
          const elemento = {
            Dorsal: corredor.Dorsal,
            Nombre: corredor.Nombre,
            Apellidos: corredor.Apellidos,
            CheckPoints: checkPoints,
            id_corredor: (Math.random() * Date.now()).toString(),
            Salida: corredor.Salida
          }
          elemento["Nº chip"] = corredor["Nº chip"]
          lista.componentes.push(elemento)
        })
        listadoCorredoresCheckPoints.push(lista)
      })
      this.listadoCheckPoints = listadoCorredoresCheckPoints
      
      localStorage.setItem("listado_checkpoints", null)
      localStorage.setItem("listado_checkpoints", JSON.stringify(this.listadoCheckPoints))
      // console.log(this.listadoCheckPoints)

    },
    setSeguimiento(val) {
      this.seguimientoLIVE = val
    },
    setDorsalSeguimiento(val) {
      this.dorsalSeguimiento = val
    },
    loadData(data) {
      // console.log(data)
      // console.log(csv)
      let tempCat = []
      let tempTotal = []

      
      // const filtrarDEN = data.filter(el => {
      //   // console.log(el.Nac !== "DEN")
        
      //   return el.Nac === "ESP"
      // })
      

      const filtrarFEDO = data.filter(el => {
        return el.Ciudad !== "FEDO"
      })
      
      
      filtrarFEDO.forEach(el => {
        if (!tempCat.includes(el["Corto"])) {
          tempCat.push(el["Corto"])
        }
      })
      console.log(filtrarFEDO)

      this.listadoCategorias = tempCat
      tempCat.forEach (cat => {
        tempTotal.push({
          "categoria": cat,
          "componentes":[]
        })
      })
      tempTotal.forEach (cat => {
        filtrarFEDO.forEach(el => {
          if(el["Corto"] == cat.categoria) {
            cat.componentes.push(el)
          }
        })
      })
      this.categorias = tempTotal
      // console.log(tempTotal)
      localStorage.setItem("listado_corredores", JSON.stringify(tempTotal))

    },
    // loadData() {
    //   console.log(jsondata)
    //   // console.log(csv)
    //   let tempCat = []
    //   let tempTotal = []

      
    //   const filtrarDEN = jsondata.filter(el => {
    //     // console.log(el.Nac !== "DEN")
        
    //     return el.Nac === "ESP"
    //   })
      

    //   const filtrarFEDO = filtrarDEN.filter(el => {
    //     return el.Ciudad !== "FEDO"
    //   })
    //   // console.log(jsondata.length - filtrarFEDO.length )


    //   filtrarFEDO.forEach(el => {
    //     // console.log(el)
    //     // console.log(el["Corto"])
    //     if (!tempCat.includes(el["Corto"])) {
    //       tempCat.push(el["Corto"])
    //       // console.log(el["Largo"])
    //     }
    //   })

    //   // const dorsalesAFiltrar = ['46','45','43','41','40','39','38','37','36','35','33','32']
    //   // const filtroTempParcial = tempParcial.filter(el => {
    //   //   // console.log(typeof(el.Result.BibNumber))
    //   //   return !dorsalesAFiltrar.includes(el.Result.BibNumber)
    //   // })


    //   this.listadoCategorias = tempCat
    //   tempCat.forEach (cat => {
    //     tempTotal.push({
    //       "categoria": cat,
    //       "componentes":[]
    //     })
    //   })
    //   // console.log(tempCat)
    //   tempTotal.forEach (cat => {
    //     // console.log(cat)
    //     filtrarFEDO.forEach(el => {
    //       // console.log(el["Corto"]== cat.categoria)
    //       if(el["Corto"] == cat.categoria) {
    //         // console.log(el)
    //         cat.componentes.push(el)
    //       }
    //     })
    //   })
    //   this.categorias = tempTotal
    //   console.log(tempTotal)
    //   localStorage.setItem("listado_corredores", JSON.stringify(tempTotal))
    //   // console.log(this.categorias)

    // },
    getXMLFile(path, callback) {
      let request = new XMLHttpRequest()
      request.open("GET", path)
      request.setRequestHeader("Content-Type", "text/xml")
      request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
          callback(request.responseXML)
          }
        }
        request.send()
      },

    getCheckPoints() {
      let indice = 0
      // console.log(this.tiemposParciales)
      this.checkPoints = this.tiemposParciales[0].Result.SplitTime.map(el => {
        const checks = {codigo: el.ControlCode, indice}
        indice++
        return checks
      })
      this.checkPoints.unshift({codigo: "meta", indice: this.checkPoints.length-1})
      // console.log(this.checkPoints)
    },
    setCheckPoint(val) {
      this.checkpoint = val
      // console.log(this.checkpoint)
    },
    loadXML() {
      this.xmlData = null
      const self = this
      // console.log("loadxml")
      
      this.getXMLFile(self.xml_url, function(xml) {
        var x2js = new X2JS();
        // console.log(x2js)
        self.xmlData = x2js.xml2json ( xml );
        // console.log(self.xmlData)
        self.crearTiemposParciales()
        })
      // console.log(this.xmlData)
      // console.log("cargando xml")

      },
      crearTiemposParciales() {
        let tempParcial = []
        // console.log(this.xmlData)
        if(this.xmlData) {
          this.xmlData.ResultList.ClassResult.forEach(cat => {
            // console.log(cat)
            if(cat.PersonResult.length >= 1) {
    
              cat.PersonResult.forEach(result => {
               
                tempParcial.push(result)
              })
            } else {
              tempParcial.push(cat)
              // console.log(cat)
            }
    
          })
          
          // console.log(tempParcial)
          const filtrarUndefined = tempParcial.filter(el => {
            // console.log(el)
            return el.Result !== undefined
          })
          // console.log(filtrarUndefined)
          const dorsalesAFiltrar = ['46','45','43','41','40','39','38','37','36','35','33','32']
          const filtroTempParcial = tempParcial.filter(el => {
            // console.log(typeof(el.Result.BibNumber))
            // console.log(el)
            return !dorsalesAFiltrar.includes(el.Result.BibNumber)
          })
          // this.tiemposParciales = filtrarUndefined
          this.tiemposParciales = filtroTempParcial
        }
      },
      getFromXML(dorsal) {
        // console.log(this.tiemposParciales[0].Result.BibNumber)
        return this.tiemposParciales.find(el => {
          // console.log(el)
          // console.log(parseInt(el.Result.BibNumber), parseInt(dorsal))
          return el.Result.BibNumber == dorsal
        })

      },
      getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
      },
      parcialesPorCategorias(categoria) {
        // this.crearTiemposParciales()
        // const check = this.getKeyByValue(this.checkPoints)
        let tempListado = []
        this.categorias.forEach(el => {
          if(el.categoria == categoria) {
            el.componentes.forEach(comp => {
              let tempComp = this.tiemposParciales.find(corredor => {
                return comp.Dorsal == corredor.Result.BibNumber
              })
              tempListado.push(tempComp)
            })
          }
        })
        const filtrarUndefined = tempListado.filter(el => {
          return el !== undefined
        } )
        // objs.sort((a,b) => (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0))
        // const result = tempListado.sort((a,b) => parseInt(a.Result.SplitTime[this.checkpoint].Time) - parseInt(b.Result.SplitTime[this.checkpoint].Time))



        const lista = filtrarUndefined.filter(el => {
          return el.Result.SplitTime[this.checkpoint.indice].hasOwnProperty("Time")
          /* return el.Result.SplitTime.find(res => {
            return res.hasOwnProperty("Time")
          }) */
        })

        /* filtrarUndefined.forEach(el => {

          return el.Result.SplitTime.filter(res => {
            // if(res.hasOwnProperty)
            if (res.hasOwnProperty("Time")) {
              // console.log(res)
              return res.controlCode == this.controlcode

            }
          })

        })*/
        const listaordenada = lista.sort((a,b) => parseInt(a.Result.SplitTime[this.checkpoint.indice].Time) - parseInt(b.Result.SplitTime[this.checkpoint.indice].Time))
        listaordenada.forEach(el => {

        })
        // return lista.sort((a,b) => parseInt(a.Result.SplitTime[this.checkpoint].Time) - parseInt(b.Result.SplitTime[this.checkpoint].Time))
        return listaordenada

      },
      async liveUpdate (nombre, capa, val) {
        let dir = this.url +"API/?Function=SetText&Input=" + nombre + "&SelectedName=" + capa + ".Text&Value=" + val
        const send = await axios.post(dir)
          .catch(err => {
            console.log("Error de conexión " + err)
          })
        // this.status = send.status
      },
      async toggleVisibility (nombre, capa, val) {
        let funcion = 'SetTextVisibleOn'
        if(val === false) funcion = 'SetTextVisibleOff'
        let dir = this.url +"API/?Function=" + funcion + "&Input=" + nombre + "&SelectedName=" + capa + ".Text"
        const send = await axios.post(dir)
          .catch(err => {
            console.log("Error de conexión " + err)
          })
        // this.status = send.status
      },
      async liveUpdateIMG (nombre, capa, val) {
        let dir = this.url +"API/?Function=SetImage&Input=" + nombre + "&SelectedName=" + capa + ".Source&Value=" + val
        const send = await axios.post(dir)
          .catch(err => {
            console.log("Error de conexión " + err)
          })
        // this.status = send.status
      },

      async getInfoVMIX () {
        const dir = `${this.url}API/`
        const send = await axios.post(dir)
          .catch(err => {
            console.log("Error de conexión " + err)
          })
        // console.log(send)

      },
      async liveVmix (payload) {
        let dir = this.url +"API/?Function=OverlayInput2&Input=" + payload
        const send = await axios.post(dir)
          .catch(err => {
            console.log("Error de conexión " + err)
          })
      },

      async PVWVmix(payload) {
        let dir = this.url +"API/?Function=PreviewInput&Input=" + payload
        const send = await axios.post(dir)
          .catch(err => {
            console.log("Error de conexión " + err)
          })
      },
      // async getCsv() {

      // //   const csv = await fetch(this.csvFilePath).then( res => res.text() )

      // //   Papa.parse( csv, {
      // //     download: true,
      // //     complete: function(results, file) {
      // //         console.log("Parsing complete:", results, file);
      // //     }
      // // });


      //   const config = {
      //     delimiter:";"
      //   }
      //   Papa.parse(this.csvFilePath, {
      //     delimiter:";",
      //     encoding: "ISO 8859-1",
      //     header: true,
      //     download: true,
      //     complete: function(res) {
      //       // console.log(res.data[0])
      //     }
      //   })
      //   // console.log(csv)

      // },
      // getCsv1 () {
      //   csvtojson({
      //     delimiter:[";"]
      //   })
      //   .fromFile(this.csvFilePath, { encoding: 'latin1' })
      //   .then((jsonObj)=>{
      //       this.csvData = jsonObj
      //       // console.log(result);
      //       /**
      //        * [
      //        * 	{a:"1", b:"2", c:"3"},
      //        * 	{a:"4", b:"5". c:"6"}
      //        * ]
      //        */ 
        
      //   })
      //   // .then(() => {
      //   //   this.csvData = result
      //   //   let json = JSON.stringify(result);
      //   //   console.log(result)
      //   //   // fs.writeFileSync('output.json', json);
      //   //   // console.log(result)
      //   // })
      //   // let csvData = fs.readFileSync("../xml/test5.csv", "utf-8");
      //   // csvData = csvData.trim().replace(/([^,]+),\s*([^,]+),\s*/gi, '$1,$2\n');
      //   // const json = await csvToJson().fromString(csvData);

      //   // const jsonString = async () => { JSON.stringify(json, null, 2) }

      //   // console.log(jsonString);
        

      // }

      

    } 
})
