function onReseponse() {
  if (xhr.readyState === 4) {
    alert(xhr.response);
  }
}

function formatParams(params) {
  return "?" + Object
    .keys(params)
    .map(function (key) {
      return key + "=" + encodeURIComponent(params[key])
    })
    .join("&")
}

function isFormsValidated() {
  if (!document.getElementById('cement') || document.getElementById('cement').value < 0) {
    return false;
  }
  if (!document.getElementById('water') || document.getElementById('water').value < 0) {
    return false;
  }
  if (!document.getElementById('fine_aggregate') || document.getElementById('fine_aggregate').value < 0) {
    return false;
  }
  if (!document.getElementById('coarse_aggregate') || document.getElementById('coarse_aggregate').value < 0) {
    return false;
  }
  if (!document.getElementById('fly_ash') || document.getElementById('fly_ash').value < 0) {
    return false;
  }
  if (!document.getElementById('slag') || document.getElementById('slag').value < 0) {
    return false;
  }
  if (!document.getElementById('plasticizer') || document.getElementById('plasticizer').value < 0) {
    return false;
  }
  if (!document.getElementById('age') || document.getElementById('age').value < 0) {
    return false;
  }
  return true;
}

function getQueryParams() {
  return {
    cement: document.getElementById('cement').value,
    water: document.getElementById('water').value,
    fine: document.getElementById('fine_aggregate').value,
    coarse: document.getElementById('coarse_aggregate').value,
    flyAsh: document.getElementById('fly_ash').value,
    slag: document.getElementById('slag').value,
    plasticizer: document.getElementById('plasticizer').value,
    age: document.getElementById('age').value,
  }
}

function getFcClass(fc) {
  if (fc < 20) {
    return 'SEM_CLASSE'
  }
  else if (fc < 25) {
    return 'C20'
  }
  else if (fc < 30) {
    return 'C25'
  }
  else if (fc < 35) {
    return 'C30'
  }
  else if (fc < 40) {
    return 'C35'
  }
  else if (fc < 45) {
    return 'C40'
  }
  else if (fc < 50) {
    return 'C45'
  }
  else {
    return 'C50'
  }
}
function getSlumpClass(slump) {
  if (slump < 50) {
    return 'S10'
  }
  else if (slump < 100) {
    return 'S50'
  }
  else if (slump < 160) {
    return 'S100'
  }
  else if (slump < 220) {
    return 'S160'
  }
  else {
    return 'S220'
  }
}
function submit() {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log(JSON.parse(xhr.response).prediction);
      const fc = JSON.parse(xhr.response)["prediction-fc"];
      const slump = JSON.parse(xhr.response)["prediction-slump"];
      document.getElementById('fc-predicted').innerHTML = '<b>Resistência à Compressão</b>: ' + fc.toFixed(2) + 'MPa' + ' (' + getFcClass(fc) + ')';
      document.getElementById('slump-predicted').innerHTML = '<b>Abatimento</b>: ' + slump.toFixed(2) + ' mm' + ' (' + getSlumpClass(slump) + ')';
    }
  }

  const isValidated = isFormsValidated();

  if (isValidated) {
    const endpoint = "http://127.0.0.1:8000/predict";
    const params = getQueryParams();
    const url = endpoint + formatParams(params)
    xhr.open('get', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.setRequestHeader('Response-Type', 'json');
    xhr.send();
  }
}