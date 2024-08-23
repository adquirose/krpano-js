import './style.css'
import axios from 'axios'

const obtenerLotes = async() => {
  const response = await axios.get('https://rodan.com.py/propiedades/fraccion/375/lotes')
  console.log(response)
}
obtenerLotes()
embedpano({ xml:'./krpano/tour.xml', target:'pano', html5:"only" })


