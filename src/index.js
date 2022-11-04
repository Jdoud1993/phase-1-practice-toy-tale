let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  getAllToys()

  document.querySelector(".add-toy-form").addEventListener("submit", handleNewToy)

});

// fetch and post requests

function getAllToys () {
  fetch("http://localhost:3000/toys")
  .then((resp) => resp.json())
  .then((data) => handleToys(data))
}

function addToys(toyObject) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body:JSON.stringify(toyObject)
  })
  .then(res => res.json())
  .then(data => console.log(data))
}

function addLike(e) {
  let currentValue = e.target.parentNode.querySelector('P').querySelector("Span").innerText++

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH", 
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": ++currentValue
    })
   })
   .then(resp => resp.json())
   
}

// handle functions

function handleToys(toyObj) {
  let toyArr = [...toyObj];
  toyArr.forEach(createToyCard)
}

function handleNewToy(e) {
  e.preventDefault()
  let toyObj = {
    image:e.target.image.value,
    likes: 0,
    name:e.target.name.value
  }
  createToyCard(toyObj)
  addToys(toyObj)
}


//create toy card

function createToyCard(toy) {
  let toyCollection = document.querySelector("#toy-collection")
  let toyCard = document.createElement("div");
  let toyName = document.createElement("h2");
  let toyImg = document.createElement("img");
  let toyLikes = document.createElement("p");
  let likeBtn = document.createElement("button");
  toyCard.classList = "card";
  toyName.innerText = `${toy.name}`;
  toyImg.src = `${toy.image}`;
  toyImg.classList = "toy-avatar";
  toyLikes.innerHTML = `Likes <span>${toy.likes}</span>`;
  likeBtn.classList = "like-btn";
  likeBtn.id = `${toy.id}`;
  likeBtn.innerText = "Like ❤️";
  likeBtn.addEventListener("click", addLike)
  toyCard.appendChild(toyName);
  toyCard.appendChild(toyImg); 
  toyCard.appendChild(toyLikes); 
  toyCard.appendChild(likeBtn);
  toyCollection.appendChild(toyCard);
}