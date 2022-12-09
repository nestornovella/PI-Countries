
export function pageLength (array){
   return array.length/10
}


export function paginado(arr, page) {
  let pages = Math.ceil(arr.length / page) 
  let newArr = []
  for (let i = 0; i < pages; i++) {
    const result = arr.splice(0, page)
    newArr.push(result)
  }
  return newArr
}



export function orderByAlfabet(array, mode = "A_to_Z") {
  function ordena(el1, el2) {
    const aux = array[el1]
    array[el1] = array[el2]
    array[el2] = aux
  }

  for (let i = 0; i < array.length; i++) {
    for (let x = i + 1; x < array.length; x++) {
      if (array[i].name[0] === array[x].name[0]) {
        if (array[i].name[1] > array[x].name[1]) ordena(i, x)
        else if (array[i].name[1] === array[x].name[1]) {
          if (array[i].name[2] > array[x].name[2]) ordena(i, x)
        }
      }
      else if (array[i].name[0] > array[x].name[0]) {
        ordena(i, x)
      }
    }
  }
  if (mode === "A_to_Z") return array
  else if (mode === "Z_to_A") return array.reverse()
}




export function orderByPopulation (array, mode="popAsc"){

  for(let i =0; i < array.length; i++){
    for(let x= i+1 ; x < array.length; x++){
      if(array[i].population > array[x].population){
        let aux = array[i]
        array[i] = array[x]
        array[x] = aux
      }
    }
  }
  if(mode==="popAsc") return array
  
  else if (mode === "popDesc") return array.reverse()
}




export function continents (array, continent = "All continents"){
  
  if (continent === "All continents"){return array}
  else{
    return array.filter( c => c.continents.includes(continent))
  }                                
}



export function filter (array , funct = ""){
  switch(funct){
    case "popAsc":
      return orderByPopulation(array, funct)
    
    case "popDesc":
      return orderByPopulation(array, funct)

    case "A_to_Z":
      return orderByAlfabet(array, funct)

    case "Z_to_A":
      return orderByAlfabet(array, funct)

    default: return orderByAlfabet(array)
  }
}




export function idCreator (change = false){
  let code = ""
  const leterCode = ["A","B","C","D","E","F","G","H","I","J","K","X","Y","Z","W","R"]
  
  for (let x = 0; x < 4; x++){
    for(let i =0; i < 4; i++){
    if(change){
      code += Math.round(Math.random()* 9)
    }else{code += leterCode[Math.round(Math.random()* (leterCode.length-1))]}
    }
    change = !change 
    
  }
 
  return code
}