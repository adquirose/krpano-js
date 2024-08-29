export const conHtml = (lotes) => {
    const res= lotes.map(lote => {
      let obj = {}
      switch (lote.codigo_manzana.trim()) {
        case '001':
          obj={...lote, html:'A' + lote.codigo.trim()}
          break;
        case '002':
          obj={...lote, html:'B' + lote.codigo.trim()}
          break;
        case '003':
          obj={...lote, html:'C' + lote.codigo.trim()}
          break;
        case '004':
          obj={...lote, html:'D' + lote.codigo.trim()}
          break;
        case '005':
          obj={...lote, html:'E' + lote.codigo.trim()}
          break;
        case '006':
          obj={...lote, html:'F' + lote.codigo.trim()}
          break;
        case '007':
          obj={...lote, html:'G' + lote.codigo.trim()}
          break;
        case '008':
          obj={...lote, html:'H' + lote.codigo.trim()}
          break;
        case '009':
          obj={...lote, html:'I' + lote.codigo.trim()}
          break;
        case '010':
          obj={...lote, html:'J' + lote.codigo.trim()}
          break;
        case '011':
          obj={...lote, html:'K' + lote.codigo.trim()}
          break;
        case '012':
          obj={...lote, html:'L' + lote.codigo.trim()}
          break;
        case '013':
          obj={...lote, html:'M' + lote.codigo.trim()}
          break;
        case '014':
          obj={...lote, html:'N' + lote.codigo.trim()}
          break;
        case '015':
          obj={...lote, html:'O' + lote.codigo.trim()}
          break;
        case '016':
          obj={...lote, html:'P' + lote.codigo.trim()}
          break;
        case '017':
          obj={...lote, html:'Q' + lote.codigo.trim()}
          break;
        case '018':
          obj={...lote, html:'R' + lote.codigo.trim()}
          break;
        case '019':
          obj={...lote, html:'S' + lote.codigo.trim()}
          break;  
        default:
          break;
      }
      return obj
    })
    return res
  }