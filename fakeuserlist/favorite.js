const BASE_URL = 'https://user-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/users/'

const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')

const friends = JSON.parse(localStorage.getItem('favoriteFriends'))|| []

function renderFriendList(data){
  let rawHTML = ''
  data.forEach(item => {
    rawHTML += `    <div class="col-sm-3 d-flex align-items-stretch">
          <div class="mb-2">
            <div class="card h-100 text-white bg-dark mb-3">
              <img src="${item.avatar}"
                class="card-img-top"
                alt="user"
              />
              <div class="card-body">
                <h5 class="card-title">${item.name} ${item.surname}</h5>
              </div>
              <div class="card-footer">
                <button class="btn btn-primary btn-show-info" data-bs-toggle="modal" data-bs-target="#info-modal" data-id = "${item.id}" >About</button>
                <button class="btn btn-danger btn-remove-favorite" data-id = "${item.id}">X</button>
              </div>
            </div>
          </div>
        </div>`
  })
  dataPanel.innerHTML = rawHTML
}

function showInfoModal(id) {
  const modalTitle = document.querySelector('#info-modal-title')
  const modalBody = document.querySelector('#info-modal-body')

  axios.get(INDEX_URL + id).then(response => {
    const data = response.data
    modalTitle.innerText = `${data.name} ${data.surname}`
    modalBody.innerHTML = `
    <div class="row">
            <div class="col-sm-4" id="info-modal-image">
              <img
                src="${data.avatar}"
                alt="info-avatar" class="img-fluid" />
            </div>
            <div class="col-sm-8">
              <p id="modal-age">age: ${data.age}</p>
              <p id="modal-gender">gender: ${data.gender}</p>
              <p id="modal-region">region: ${data.region}</p>
              <p id="modal-birthday">birthday: ${data.birthday}</p>
              <p id="modal-email">email: ${data.email}</p>            
            </div>
          </div>
    `
  })
}

function removeToFavorite(id){
  const friendIndex = friends.findIndex(friend => friend.id === id)
  if (friendIndex === -1) return
  
  friends.splice(friendIndex, 1)
  localStorage.setItem('favoriteFriends', JSON.stringify(friends))
  renderFriendList(friends)
}

dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.btn-show-info')){
    showInfoModal(event.target.dataset.id)
  } else if (event.target.matches('.btn-remove-favorite')) {
    removeToFavorite(Number(event.target.dataset.id))
  }
})

renderFriendList(friends)