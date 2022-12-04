const loadPhones= async(searchText,datalimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data,datalimit)
}

const displayPhones = (phones, datalimit) => {
    const phoneContainer = document.getElementById('phone-container');

    const showAll = document.getElementById('show-all');
    if (datalimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none')
    }
    else {
        showAll.classList.add('d-none')
    }

    const noPhone = document.getElementById('no-phone-msg')
    if (phones.length === 0) {
        noPhone.classList.remove('d-none')
    }
    else {
        noPhone.classList.add('d-none')
    }
    phoneContainer.innerHTML = '';
    phones.forEach(phones => {
        const PhoneDiv = document.createElement('div');
        PhoneDiv.classList.add('col');
        PhoneDiv.innerHTML = `
        <div class="card h-100">
            <img src="${phones.image}" class="card-img-top p-5" alt="...">
        <div class="card-body">
            <h3 class="card-title">${phones.brand}</h3>
            <h5 class="card-title">${phones.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <button onclick="loadPhoneDetail('${phones.slug}')" class="btn btn-outline-success px-5" data-bs-toggle="modal" data-bs-target="#phonedetailModal">Show Details</button>
      
        </div>
        </div>
        `
        phoneContainer.appendChild(PhoneDiv)
    });
    toggleSpinner(false)
    // stop loader
}

const loadPhoneDetail = async id => {
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetail(data.data);
}

const displayPhoneDetail = (data) => {
    const modallTitle = document.getElementById('phonedetailModalLabel');
    modallTitle.innerText = data.name;
    const phoneDetails = document.getElementById('phone-detail');
    phoneDetails.innerHTML = `
    <img src="${data.image}" class="card-img-top p-5" alt="...">
    <h4>${data.brand ? data.brand : 'no relese date found'}</h4>
    <p>${data.releaseDate ? data.releaseDate : 'no relese date found'}</p>
    <p>${data.slug ? data.slug : 'no details found'}</p>
    <p>${data.mainFeatures.storage ? data.mainFeatures.storage : 'no relese date found'}</p>
    `
}

const processSearch = (datalimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    loadPhones(searchText,datalimit);
}

document.getElementById('btn-search').addEventListener('click', function () {
    // start loader
    processSearch(10);
})

// enter key hendler
document.getElementById('search-field').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        processSearch(10);
    }
})

document.getElementById('btn-show').addEventListener('click', function () {
    processSearch();
})


const toggleSpinner = isloading => {
    const loaderSection = document.getElementById('loader');
    if (isloading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}

loadPhones()