import './style.css'
import axios from 'axios'
import { conHtml } from './utils'

let data = []
let xmlSpots = []
var krpano = null

const obtenerLotes = async() => {
  const response = await axios.get('https://rodan.com.py/propiedades/fraccion/344/lotes')
  return response.data
}

const obtenerSpotsXml = async() => {
  const response = await fetch('kr/skin/spots.xml')
  const data = await response.text()
  return data
}

try {
  const xmlData = await obtenerSpotsXml()
  const lotes = await obtenerLotes()
  data = lotes
  const parser = new DOMParser()
  const xml = parser.parseFromString(xmlData, "application/xml")
  const spots = xml.getElementsByTagName('spot')    
  
  for( const spot of spots){
    const ath = spot.attributes.ath.textContent
    const atv = spot.attributes.atv.textContent
    const html = spot.attributes.html.textContent
    const escena = spot.attributes.escena.textContent
    const newSpot = { ath, atv, html, escena }
    xmlSpots.push(newSpot)
  }
  
} catch (error) {
    console.log(`ocurrio un error ${error}`)
}

const arr = conHtml(data)

const arrFinal = arr.map(item => {
  const obj = xmlSpots.find( el => el.html === item.html)
  const newObj = { ...obj, ...item }
  return newObj
})

function krpano_onready_interface(krpano_interface){
  krpano = krpano_interface 
  if(krpano){
    loadScene('scene_master')
    krpano.events.addListener('onnewscene',renderSpotsPorEscena)

  }
}
function renderSpotsPorEscena(){
  const scene = krpano.get('xml.scene')
  loadSpots(scene)
}
function loadScene(nameScene){
  krpano.call(`loadscene(${nameScene}, null, MERGE);`)
}

const loadSpots = (scene) => {
  // console.log(arrFinal)
  arrFinal.forEach( item => {
    if(scene === item.escena){
      const nameFicha = `spot_${item.html}`
      // krpano.call(`crear_hs(${nameFicha},${item.ath},${item.atv},${item.idgi_loteestado}, ${item.html})`)
      krpano.call(`addhotspot(${nameFicha})`)
      krpano.set(`hotspot[${nameFicha}].ath`,item.ath)
      krpano.set(`hotspot[${nameFicha}].atv`,item.atv)
      krpano.set(`hotspot[${nameFicha}].html`,item.html)
      if(item.idgi_loteestado === '1' || item.idgi_loteestado === '2'){
        krpano.call(`hotspot[${nameFicha}].loadstyle(hs_pro_disponible)`)
        krpano.set(`hotspot[${nameFicha}].onclick`, () => mostrarFicha(item))
      }else if(item.idgi_loteestado !== null){
        krpano.call(`hotspot[${nameFicha}].loadstyle(hs_pro_nodisponible)`)
      }   
    }
    
  }) 
}

const mostrarFicha = (item) => {

  const { html, cuotas_cnt, importecuota, superficie_m2, preciovtacontado } = item

  const importecuotaPY = new Intl.NumberFormat('es-PY', { style: 'currency', currency: 'PYG' }).format(importecuota)
  const preciovtacontadoPY = new Intl.NumberFormat('es-PY', { style: 'currency', currency: 'PYG' }).format(preciovtacontado)
  const superficie = new Intl.NumberFormat("de-DE").format(superficie_m2)
  const card = document.createElement('div')
  const pano = document.getElementById('pano')

  
  card.innerHTML = `
    <div style="width:300px; height:320px; position:absolute; left: 10px; top:calc(50vh - 200px); z-index: 20; ">
      <div class="card" style="width: 18rem; background-color:rgba(0,0,0,0.75);">
        <div class="card-body">
          <h5 class="card-title text-white">${html}</h5>
          <p class="text-white">Estado: Disponible</p>
          <p class="text-white">Superficie: ${superficie} M2</p>
          <p class="text-white">Valor Cuota ${cuotas_cnt} Meses: ${importecuotaPY}</p>
          <p class="text-white">Precio Contado a 12 Cuotas: ${preciovtacontadoPY}</p>
          <div class="btn-group d-flex justify-content-evenly" role="group">
            
          </div>
        </div>
      </div>
    </div>
  `
  const buttonContinuar = document.createElement('button')
  const buttonPlano = document.createElement('button')

  buttonPlano.classList.add('btn', 'btn-outline-success')
  buttonPlano.textContent = 'Plano'

  buttonContinuar.classList.add('btn', 'btn-success')
  buttonContinuar.textContent = 'Continuar'

  buttonContinuar.addEventListener('click', () => card.remove())
  
  pano.appendChild(card)
  const buttonGroup = document.querySelector('.btn-group')
  buttonGroup.appendChild(buttonPlano)
  buttonGroup.appendChild(buttonContinuar)
}

embedpano({ 
  xml:'./kr/tour.xml', 
  target:'pano', 
  html5:"only",
  onready: krpano_onready_interface
})


