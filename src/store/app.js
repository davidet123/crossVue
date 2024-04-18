// Utilities
import { defineStore } from 'pinia'

import axios from "axios"
import Papa from 'papaparse'
// import fs from 'fs'
// import csvtojson from 'csvtojson'
// import csv from '../xml/1media.csv'

// import jsondata from '../xml/BADAJOZ_SPRINT.json'
// import jsondata from '../xml/BADAJOZ_MEDIA.json'
import jsondata from '../xml/BADAJOZ_LARGA.json'


export const useAppStore = defineStore('app', {
  state: () => ({
    datos_carrera: null,
    xmlData: null,
    // url: "../src/xml/test5.xml",
    // url: "http://169.254.20.87:8088/",


    // PONER URL VMIX AQUI
    // url: "http://192.168.28.33:8088/",
    url: "http://192.168.50.200:8088/",
    // xml_url: "../src/xml/tests/larga_sevilla.xml",
    // xml_url: "../src/xml/tests/test8parciales.xml",
    xml_url: "../src/xml/PARCIALES_AVILA.xml",
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
      "Camara Dron",
      "Camara runner",
      "Salida",
      "Punto intermedio",
      "César Rodríguez",
      "Cosme Sánchez",
      "Punto TV 1",
      "Punto TV 2",
      "Siguiente texto"
    ],
    csvData: null,
    csvFilePath: '../src/xml/tests/test_parciales.csv'
  }),
  getters: {
    getXmlData() {
      // console.log(this.xmlData)
      return this.xmlData
    },
    getCorredorActivo: state => {
      // console.log(state.categorias)
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
      console.log(this.datos_carrera)
      
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
          const elemento = {
            Dorsal: corredor.Dorsal,
            Nombre: corredor.Nombre,
            Apellidos: corredor.Apellidos,
            CheckPoints: checkPoints,
            id_corredor: (Math.random() * Date.now()).toString()
          }
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
    loadData() {
      // console.log(jsondata)
      // console.log(csv)
      let tempCat = []
      let tempTotal = []

      
      const filtrarDEN = jsondata.filter(el => {
        // console.log(el.Nac !== "DEN")
        
        return el.Nac === "ESP"
      })
      

      const filtrarFEDO = filtrarDEN.filter(el => {
        return el.Ciudad !== "FEDO"
      })
      // console.log(jsondata.length - filtrarFEDO.length )


      filtrarFEDO.forEach(el => {
        // console.log(el)
        // console.log(el["Corto"])
        if (!tempCat.includes(el["Corto"])) {
          tempCat.push(el["Corto"])
          // console.log(el["Largo"])
        }
      })

      // const dorsalesAFiltrar = ['46','45','43','41','40','39','38','37','36','35','33','32']
      // const filtroTempParcial = tempParcial.filter(el => {
      //   // console.log(typeof(el.Result.BibNumber))
      //   return !dorsalesAFiltrar.includes(el.Result.BibNumber)
      // })


      this.listadoCategorias = tempCat
      tempCat.forEach (cat => {
        tempTotal.push({
          "categoria": cat,
          "componentes":[]
        })
      })
      // console.log(tempCat)
      tempTotal.forEach (cat => {
        // console.log(cat)
        filtrarFEDO.forEach(el => {
          // console.log(el["Corto"]== cat.categoria)
          if(el["Corto"] == cat.categoria) {
            // console.log(el)
            cat.componentes.push(el)
          }
        })
      })
      this.categorias = tempTotal
      localStorage.setItem("listado_corredores", JSON.stringify(tempTotal))
      // console.log(this.categorias)

    },
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
        // console.log(categoria)
        this.categorias.forEach(el => {
          // console.log(el.categoria)
          if(el.categoria == categoria) {
            el.componentes.forEach(comp => {
              // console.log(this.tiemposParciales)
              let tempComp = this.tiemposParciales.find(corredor => {
                // console.log(corredor.Result.BibNumber)
                return comp.Dorsal == corredor.Result.BibNumber
              })
              // console.log(tempComp)
              tempListado.push(tempComp)
            })
          }
          // console.log(tempListado)
        })
        const filtrarUndefined = tempListado.filter(el => {
          return el !== undefined
        } )
        // objs.sort((a,b) => (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0))
        // const result = tempListado.sort((a,b) => parseInt(a.Result.SplitTime[this.checkpoint].Time) - parseInt(b.Result.SplitTime[this.checkpoint].Time))
        // console.log(filtrarUndefined)


        const lista = filtrarUndefined.filter(el => {
          // console.log(el.Result.SplitTime)
          // console.log(el.Result.SplitTime[this.checkpoint].hasOwnProperty("Time"))
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

          // console.log(el.Result.SplitTime[this.checkpoint]) 
        })
        // return lista.sort((a,b) => parseInt(a.Result.SplitTime[this.checkpoint].Time) - parseInt(b.Result.SplitTime[this.checkpoint].Time))
        return listaordenada

      },
      async liveUpdate (nombre, capa, val) {
        // console.log("liveupdate")
        let dir = this.url +"API/?Function=SetText&Input=" + nombre + "&SelectedName=" + capa + ".Text&Value=" + val
        const send = await axios.post(dir)
          .catch(err => {
            console.log("Error de conexión " + err)
          })
        // this.status = send.status
      },
      async liveUpdateIMG (nombre, capa, val) {
        // console.log("liveupdate")
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
        // console.log(payload)
        let dir = this.url +"API/?Function=OverlayInput2&Input=" + payload
        const send = await axios.post(dir)
          .catch(err => {
            console.log("Error de conexión " + err)
          })
        // console.log(send)
      },

      async PVWVmix(payload) {
        // console.log(payload)
        let dir = this.url +"API/?Function=PreviewInput&Input=" + payload
        const send = await axios.post(dir)
          .catch(err => {
            console.log("Error de conexión " + err)
          })
      },
      async getCsv() {

      //   const csv = await fetch(this.csvFilePath).then( res => res.text() )

      //   Papa.parse( csv, {
      //     download: true,
      //     complete: function(results, file) {
      //         console.log("Parsing complete:", results, file);
      //     }
      // });


        const config = {
          delimiter:";"
        }
        Papa.parse(this.csvFilePath, {
          delimiter:";",
          encoding: "ISO 8859-1",
          header: true,
          download: true,
          complete: function(res) {
            // console.log(res.data[0])
          }
        })
        // console.log(csv)

      },
      getCsv1 () {
        csvtojson({
          delimiter:[";"]
        })
        .fromFile(this.csvFilePath, { encoding: 'latin1' })
        .then((jsonObj)=>{
            this.csvData = jsonObj
            // console.log(result);
            /**
             * [
             * 	{a:"1", b:"2", c:"3"},
             * 	{a:"4", b:"5". c:"6"}
             * ]
             */ 
        
        })
        // .then(() => {
        //   this.csvData = result
        //   let json = JSON.stringify(result);
        //   console.log(result)
        //   // fs.writeFileSync('output.json', json);
        //   // console.log(result)
        // })
        // let csvData = fs.readFileSync("../xml/test5.csv", "utf-8");
        // csvData = csvData.trim().replace(/([^,]+),\s*([^,]+),\s*/gi, '$1,$2\n');
        // const json = await csvToJson().fromString(csvData);

        // const jsonString = async () => { JSON.stringify(json, null, 2) }

        // console.log(jsonString);
        

      }

      

    } 
})
