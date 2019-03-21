// Hace una solicitud a randomUser para obtener una lista de usuarios
async function getUser(url)
{
    const response = await fetch(url);
    const data = await response.json();

    // console.log(data.results);
    return data.results;
};

// Crea el template ("list item" (li)), que será agregado a la lista de amigos (<ul class="list friends">...</ul>)
function generateUserItem({ name, picture: { thumbnail: avatar } })
{
    const list_item_user =
        `<li>
            <figure class="avatar">
                <img = src="${avatar}" alt="User's avatar"/>
            </figure>
            <p>${name.first + " " + name.last}</p>
        </li>`;

    return list_item_user;
};

// Hace una solicitud a yts.ag para obtener una lista de películas del genero que le especiquemos
async function getMovies(genre)
{
    const baseURLCategories = `https://yts.am/api/v2/list_movies.json?genre=`;
    const opts = `&limit=10&sort_by=like_count&order_by=desc`;
    // console.log(`${baseURLCategories}${genre}${opts}`);
    const response = await fetch(`${baseURLCategories}${genre}${opts}`);
    const movies = await response.json();

    // console.log(movies.data.movies);
    return movies.data.movies;
}

//Genera el template de la Categoría donde añadiremos las películas
function generateCategory({ title, name })
{
    const category =
        `<div class="category-container">
            <h3 class="category-title">${title}</h4>
            <h4 class="category-copy">${name}</h3>
            <div class="content" id="${title + "-content"}" data-category="${title}">
            <!--Contenido de la categoria generado pro JS-->
            </div>
            </div>`;

    return category;
}

//Genera el template del contenedor de cada pelicula.
function generateCategoryContent({ title, medium_cover_image })
{
    const content =
        `<div class="movie-container">
            <figure class="cover">
                <img src="${medium_cover_image}" alt="Video's Cover"/>
            </figure>
            <h4 class="content-title">${title}</h4>
         </div>`

    return content;
}

//Obtenemos los nodos de los eleementos del DOM que necesitemos modificarle o añadirle elementos.
const $list_friends = document.getElementById(`list-friends`);
const $categories = document.getElementById(`categories`);

const UserRandomURL = `https://randomuser.me/api/1.2/?inc=name,picture&results=10`;

// const genre = ["comedy", "sci-fi", "horror", "romance", "action", "thriller", "drama", "mystery", "crime", "animation", "adventure", "fantasy", "comedy-romance", "action-comedy", "superhero"];
const genre =
    [
        {
            title: "sci-fi",
            name: "Porque hay quien nos defienda de las grandes amenazas. Conocelos en:"
        },
        // {
        //     title: "sci-fi",
        //     name: "No estamos solos. Tu vision del universo puede cambiar viendo:"
        // },
        {
            title: "animation",
            name: "Para chicos y grandes. De comedia hasta de acción. Para todos los gustos tenemos:"
        },
        // {
        //     title: "superhero",
        //     name: "Porque hay quien nos defienda de las grandes amenazas. Conocelos en:"
        // }
        {
            title: "action",
            name: "Preparate para un día lleno de adrenalina viendo:"
        }
    ];

(async function load()
{
    //Hacemos la solicitud para traer los datos de los usuarios (Nombre y Foto)
    const usrs = await getUser(UserRandomURL);

    usrs.forEach(item =>
    {
        //Añadimos al usuario a la lista de amigos.
        list_item_created = generateUserItem(item);
        $list_friends.innerHTML += list_item_created;
    });

    // Generamos los divs correpondientes donde se agregara el contenido.
    const categories = genre.map(item =>
    {
        return generateCategory(item);
    });

    //Agregamos en la sección "categories" los divs de cada categoria.
    categories.forEach(item =>
    {
        $categories.innerHTML += item;
    });

    //Se hace la solicitud del contenido y se agrega a cada categoria.
    let categoriesContent
    for ({ title } of genre)
    {
        //Solicitamos el contenido de la categoria indicada por "title"
        categoriesContent = await getMovies(title);

        //Agregamos el contenido al contenedor div correspondiente.
        categoriesContent.map((item) =>
        {
            //Traemos el nodo al que se le agregara el contenido
            $divContentCategory = document.getElementById(`${title}-content`);
            //Agregamos el contenido al nodo.
            $divContentCategory.innerHTML += generateCategoryContent(item);
        })
    }
})();
