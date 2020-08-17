import escape from 'lodash/escape';

const villageList = document.getElementById('villagelist');
var villageListTable = document.querySelector('#villagelist table');

export function updateVillageList(data) {
  // This is a bit of a hacky way to do this and can get dangerous if you don't escape usernames
  // properly. You would probably use something like React instead if this were a bigger project.
  let newTbody = document.createElement("tbody");
  for (let i = 0; i < data.length; i++) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");

    let text1 = document.createTextNode(data[i].id);
    let text2 = document.createTextNode(data[i].ressources);
    let text3 = document.createTextNode(data[i].menAtArms);
    
    td1.appendChild(text1);
    td2.appendChild(text2);
    td3.appendChild(text3);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    newTbody.appendChild(tr);
  }
  villageListTable.replaceChild(newTbody, villageListTable.querySelector("tbody"));
}

export function setVillageListHidden(hidden) {
  if (hidden) {
    villageList.classList.add('hidden');
  } else {
    villageList.classList.remove('hidden');
  }
}
