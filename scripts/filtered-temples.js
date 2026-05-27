const templeData = [
    {
        name: 'Salt Lake Temple',
        location: 'Salt Lake City, USA',
        dedicated: 'April 6–24, 1893',
        year: 1893,
        area: 382207,
        image: 'images/salt-lake-temple.jpg'
    },
    {
        name: 'florida Temple',
        location: 'florida, USA',
        dedicated: 'May 4, 2014 ',
        year: 2014,
        area: 1682,
        image: 'images/fort-lauderdale-florida-temple-3792-main.jpg'
    },
    {
        name: 'Rome Temple',
        location: 'Rome, Italy',
        dedicated: ' March 10–12, 2019',
        year: 2019,
        area: 14500,
        image: 'images/rome-temple.jpg'
    },
    {
        name: 'Lagos Temple',
        location: 'Lagos, Nigeria',
        dedicated: '10 May, 2025 ',
        year: 2025,
        area: 19800,
        image: 'images/lagos-temple.jpg'
    },
    {
        name: 'Kyoto Temple',
        location: 'Kyoto, Japan',
        dedicated: ' October 27–29, 1980',
        year: 1980,
        area: 12200,
        image: 'images/kyoto-temple.jpg'
    },
    {
        name: 'Abidjan Temple',
        location: 'Abidjan, Côte d’Ivoire',
        dedicated: 'May 25, 2025',
        year: 2025,
        area: 16130,
        image: 'images/abidjan-temple.jpg'
    },
    {
        name: 'Aba Temple',
        location: 'Aba, Nigeria',
        dedicated: 'August 7, 2005',
        year: 2005,
        area: 1068,
        image: 'images/Aba-temple.jpg'
    },
    {
        name: 'Sydney Temple',
        location: 'Sydney, Australia',
        dedicated: 'September 20–23, 1984',
        year: 1984,
        area: 2793,
        image: 'images/sydney-temple.jpg'
    },
    {
        name: 'Guadalajara Temple',
        location: 'Guadalajara, Mexico',
        dedicated: 'April 29, 2001',
        year: 2001,
        area: 11000,
        image: 'images/guadalajaramexico_large.jpg'
    },
    {
        name: 'Adelaide Temple',
        location: 'Adelaide, Australia',
        dedicated: ' June 15, 2000',
        year: 2000,
        area: 994,
        image: 'images/Adelaide-Australia-Temple.jpg'
    },
    {
        name: 'Madrid Spain Temple',
        location: 'Madrid, Spain',
        dedicated: 'March19–21, 1999',
        year: 1999,
        area: 4225,
        image: 'images/Madrid-Spain-Temple.jpg'
    },
    {
        name: 'Barcelona Spain Temple',
        location: 'Barcelona, Spain',
        dedicated: 'July 17, 2010',
        year: 2010,
        area: 2555,
        image: 'images/Barcelona-Spain-Temple.jpg'
    }, 
    // let's add some more temples to make the gallery more interesting
    {
        name: 'Brazzaville Republic of the Congo Temple',
        location: 'Brazzaville, Republic of the Congo',
        dedicated: 'May 25, 2025',
        year: 2025,
        area: 16130,
        image: 'images/Brazzaville-Republic-of-the-Congo-Temple.jpg'
    },
    {
        name: 'Dallas Texas Temple',
        location: 'Dallas, Texas, USA',
        dedicated: '5 March, 1989',
        year: 1989,
        area: 4107,
        image: 'images/Dallas-Texas-Temple.jpg'
    },
    {
        name: 'Sacramento California Temple',
        location: 'Sacramento, California, USA',
        dedicated: 'May 4, 2006',
        year: 2006,
        area: 11000,
        image: 'images/Sacramento-California-Temple.jpg'
    },
    {
        name: 'Caracas Venezuela Temple',
        location: 'Caracas, Venezuela',
        dedicated: ' August 20, 2000',
        year: 2000,
        area: 1424,
        image: 'images/Caracas-Venezuela-Temple.jpg'
    }
];

const galleryElement = document.getElementById('templeGallery');
const statusElement = document.getElementById('filterStatus');
const filterButtons = document.querySelectorAll('[data-filter]');

const filters = {
    home: () => templeData,
    old: () => templeData.filter((temple) => temple.year < 1900),
    new: () => templeData.filter((temple) => temple.year > 2000),
    large: () => templeData.filter((temple) => temple.area > 90000),
    small: () => templeData.filter((temple) => temple.area < 10000)
};

function formatArea(area) {
    return `${area.toLocaleString()} sq ft`;
}

function renderTempleCard(temple) {
    const article = document.createElement('article');
    article.className = 'temple-card';
    article.innerHTML = `
        <img src="${temple.image}" alt="${temple.name}" loading="lazy">
        <div class="card-body">
            <h3 class="card-title">${temple.name}</h3>
            <div class="card-meta">
                <div class="meta-row"><span class="meta-label">Location:</span><span>${temple.location}</span></div>
                <div class="meta-row"><span class="meta-label">Dedicated:</span><span>${temple.dedicated}</span></div>
                <div class="meta-row"><span class="meta-label">Area:</span><span>${formatArea(temple.area)}</span></div>
            </div>
        </div>
    `;
    return article;
}

function updateFilterStatus(filterKey, results) {
    const filterName = filterKey.charAt(0).toUpperCase() + filterKey.slice(1);
    const countText = results.length === 1 ? 'temple displayed' : 'temples displayed';
    statusElement.textContent = `${filterName}: ${results.length} ${countText}`;
}

function renderGallery(filterKey = 'home') {
    const results = filters[filterKey]();
    galleryElement.innerHTML = '';

    if (results.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'empty-state';
        empty.textContent = 'No temples found in this category.';
        galleryElement.appendChild(empty);
    } else {
        const fragment = document.createDocumentFragment();
        results.forEach((temple) => fragment.appendChild(renderTempleCard(temple)));
        galleryElement.appendChild(fragment);
    }

    updateFilterStatus(filterKey, results);
}

function updateActiveButton(selectedKey) {
    filterButtons.forEach((button) => {
        const isSelected = button.dataset.filter === selectedKey;
        button.classList.toggle('active', isSelected);
    });
}

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const filterKey = button.dataset.filter;
        renderGallery(filterKey);
        updateActiveButton(filterKey);
    });
});

renderGallery();
