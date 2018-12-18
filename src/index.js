document.addEventListener('DOMContentLoaded', () => {

  let table = document.querySelector("#table-body")
  fetch("http://localhost:3000/dogs")
    .then(res => res.json())
    .then(data => {
      data.forEach(dog => {
        const dogTr = showDog(dog.name, dog.breed, dog.sex, dog.id)
        table.append(dogTr)
      })
    })


function showDog(name, breed, sex, id){
  let tr = document.createElement("tr")
  tr.innerHTML =
  `<td class="dog-name">${name}</td>
  <td class="dog-breed">${breed}</td>
  <td class="dog-sex">${sex}</td>
  <td><button data-id="${id}" class="edit-button">Edit</button></td>`
  return tr
}




const editDogForm = document.querySelector("#dog-form")

editDogForm.addEventListener("submit", function(e){
  e.preventDefault()
  let nameInput = document.querySelector(".name-input")
  let breedInput = document.querySelector(".breed-input")
  let sexInput = document.querySelector(".sex-input")
  let dogId = e.target.querySelector("#dog-id").value
  fetch(`http://localhost:3000/dogs/${dogId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "name": nameInput.value,
      "breed": breedInput.value,
      "sex": sexInput.value
    })
  }).then(res => {
    let dogDataId = document.querySelector(`[data-id="${dogId}"]`)
    dogDataId.parentNode.parentNode.querySelector(".dog-name").innerText = nameInput.value
    dogDataId.parentNode.parentNode.querySelector(".dog-breed").innerText = breedInput.value
    dogDataId.parentNode.parentNode.querySelector(".dog-sex").innerText = sexInput.value
  })
})


  let tableDiv = document.querySelector(".dog-table")

  tableDiv.addEventListener("click", function(e){
  if (e.target.classList.contains("edit-button")){
    let button = e.target
    let parent = button.parentNode.parentNode
    let dogName = parent.querySelector(".dog-name").innerText
    let dogBreed = parent.querySelector(".dog-breed").innerText
    let dogSex = parent.querySelector(".dog-sex").innerText

    let nameInput = document.querySelector(".name-input")
    let breedInput = document.querySelector(".breed-input")
    let sexInput = document.querySelector(".sex-input")

    nameInput.value = dogName
    breedInput.value = dogBreed
    sexInput.value = dogSex
    let dogId = document.querySelector("#dog-id")
    dogId.value = button.dataset.id
  }
  })

})
