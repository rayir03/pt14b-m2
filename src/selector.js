var traverseDomAndCollectElements = function (matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  var domTree = function(element) {
    if(matchFunc(element)){
      resultSet.push(element);
    }
    for(let i = 0; i < element.children.length; i++) {
      domTree(element.children[i]);
    }
  }
  
  

  domTree(startEl);
  return resultSet;
  
};
traverseDomAndCollectElements
// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag

var selectorTypeMatcher = function (selector) {
  // tu código aquí
  if(selector[0] === "#") return "id";
  if(selector[0] === ".") return "class";
  if(selector[0] !== "#" && selector[0] !== ".") {
    if(selector.includes(".")) {
      return "tag.class";
    } else {
      return "tag";
    }
  } 

};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function (selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    
    let id = selector.slice(1);
    matchFunction = function (element) {
      return element.id === id;
    }
  } else if (selectorType === "class") {
    let className = selector.slice(1);
    matchFunction = function (element) {
      return element.classList.contains(className);

    }
  } else if (selectorType === "tag.class") {
    var parts = selector.split(".");
    var tag = parts[0];
    var className = parts[1];
    matchFunction = function(element) {
      return element.tagName.toLowerCase() === tag && element.classList.contains(className);
    }

  } else if (selectorType === "tag") {
    let tag = selector;
    matchFunction = function (element) {
      return element.tagName.toLowerCase() === tag;
    }
  }
  return matchFunction;
}

var $ = function (selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
