const pro_container = document.getElementById('pro-container')
const project_count = 20
const colors = {
    normal:'#DDCBD0',
    rock: '#C5AEA8',
    water: '#CBD5ED',
    dragon: '#CADCDF',
    fighting: '#FCC1B0',
    bug: '#C1E0C8',
    grass: '#C0D4C8',
    dark:'#C6C5E3',
    flying: '#B2D2E8',
    ghost: '#D7C2D7',
    electric: '#E2E2A0',
    fairy: '#E4C0CF',
    poison: '#CFB7ED',
    steel: '#C2D4CE',
    psychic: '#DDC0CF',
    unknown: '#C0DFDD',
    ground: '#F4D1A6',
    fire: '#EDC2C4',
    ice: '#EDC2C4',
    shadow: '#CACACA',
}
const main_types = Object.keys(colors)

// get projects using list api
let projectsListData = [];
const getProjectsList = async() => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon`
        const res = await fetch(url);
        const data = await res.json();
        projectsListData = data.results.map((obj, index) => ({...obj, _id: index+1 }));
        console.log("::::::::::::",projectsListData);
    } catch(err) {
        console.log(`API error: ${err}`);
    } 
};
getProjectsList();

const fetchProjects = async () => {
    for(let i = 1; i <= project_count; i++) {
        await getProject(i)
    }
}

const getProject = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()
    createProjectCard(data)
}

const createProjectCard = (project) => {
    const projectEl = document.createElement('div')
    projectEl.classList.add('project')

    const name = project.name[0].toUpperCase() + project.name. slice(1)
    const id = project.id.toString().padStart(3,'0')
    const pro_types = project.types.map(type => type.type.name)
    const type = main_types.find(type => pro_types.indexOf(type) > -1)
    const color = colors [type]

    projectEl.style.backgroundColor = color
    

    const projectInnerHTML = `
    <div class="project">
    <div class="img-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${project.id}.svg" alt="">
    </div>
    <div class="info">
        <h3 class="name">${name}</h3>
        <span class="number">${id}</span>
    </div>
    </div>
    `
    projectEl.innerHTML = projectInnerHTML

    pro_container.appendChild(projectEl)

}
fetchProjects()

const searchBoxEl = document.getElementById('search-box');

// let projectList;
// (async () => {
//     projectList = await projectsListData;
// })(); 

searchBoxEl.addEventListener('change', async (event) => {
    debugger;
    let searchStr = event.target.value;
    let projectList = await projectsListData;
    // console.log("list data::::::", projectList);
    let searchResults = [];
    if (searchStr * 1) {
        searchStr *= 1;
        searchResults = projectList.filter((_, index) => index === searchStr);
    } else {
        searchStr = searchStr.toLowerCase();
        searchResults = projectList.filter(project => project.name.includes(searchStr));
    }
    // createProjectCard(searchResults);
    searchResults.forEach(async (project) => await getProject(project._id));
});