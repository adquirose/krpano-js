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
  arrFinal.forEach( item => {
    if(scene === item.escena){
      const nameFicha = `spot${item.idgi_lote}`
      krpano.call(`crear_hs(${nameFicha},${item.ath},${item.atv},'disponible',${item.html},${item.preciovtacontado})`)
    }
    
  }) 
}

embedpano({ 
  xml:'./kr/tour.xml', 
  target:'pano', 
  html5:"only",
  onready: krpano_onready_interface
})


