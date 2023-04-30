

const decodeHTMLEntities =(str : string)=> {

  const txt = new DOMParser().parseFromString(str, "text/html");
  
  return txt.documentElement.textContent;
  
}

export {decodeHTMLEntities}