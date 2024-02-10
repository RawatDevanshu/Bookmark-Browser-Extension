let myLeads = []
const saveCurrentBtn = document.getElementById("saveCurrent-btn")
const ulEl = document.getElementById("ul-el")
const deleteAllBtn = document.getElementById("deleteAll-btn")
const saveAllBtn = document.getElementById("saveAll-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
  myLeads = leadsFromLocalStorage
  render(myLeads)
}

function render(leads){
let listItems = ""
for(let i=0; i<leads.length; i++){
  listItems += `
    <li>
      <a target=_blank href= ${leads[i]} >${leads[i]}</a>
    </li>
  `
  }
ulEl.innerHTML = listItems
}


saveCurrentBtn.addEventListener("click", function(){
  browser.tabs.query({active: true,currentWindow: true}).then((tabs) => {
    if(!myLeads.includes(tabs[0].url)){
      myLeads.push(tabs[0].url)
    }

    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
  })
})

deleteAllBtn.addEventListener("dblclick", function(){
  localStorage.clear()
  myLeads = []

  render(myLeads)
})

saveAllBtn.addEventListener("click", function(){
  browser.tabs.query({}).then((tabs) => {
  for(let i=0;i<tabs.length;i++){
    if(!myLeads.includes(tabs[i].url)){
      myLeads.push(tabs[i].url)
    }
  }
  localStorage.setItem("myLeads", JSON.stringify(myLeads))
  render(myLeads)
  }, console.error) 
})

