const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=2";
const API_URL_FAVORITES = "https://api.thecatapi.com/v1/favourites";

const spanError = document.getElementById("error");

const btn = document.querySelector(".btn");

const loadRandomMichis = async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key":
        "live_aCULxXarZdDfjky1JoyauJ8E7CfDnJrb7JcehmMcQ8ej1pfQJTMMWSl3aUHdxPDl",
    },
  };

  try {
    const res = await fetch(API_URL_RANDOM, options);
    const data = await res.json();

    console.log("RANDOM", { res, data });

    if (res.status != 200) {
      spanError.textContent = data.message;
    } else {
      const img1 = document.querySelector("#img_1");
      const img2 = document.querySelector("#img_2");
      const btn1 = document.querySelector("#btn1");
      const btn2 = document.querySelector("#btn2");

      img1.src = data[0].url;
      img2.src = data[1].url;

      btn1.onclick = () => saveFavouriteMichi(data[0].id);
      btn2.onclick = () => saveFavouriteMichi(data[1].id);

    }
  } catch (error) {
    throw new Error(err);
  }
};

const loadFavouriteMichis = async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "live_aCULxXarZdDfjky1JoyauJ8E7CfDnJrb7JcehmMcQ8ej1pfQJTMMWSl3aUHdxPDl",
    },
  };

  const resp = await fetch(API_URL_FAVORITES, options);
  const data = await resp.json();

  console.log("DELETE", { data, resp });

  if (resp.status != 200) {
    spanError.textContent = data.message;
  } else {
    const section = document.getElementById("favoritesMichis");
    const title = "<h2>Michis favoritos</h2>";
    section.innerHTML = title;

    data.forEach((michi) => {
      const article = document.createElement("article");
      const img = document.createElement("img");
      const btn = document.createElement("button");
      const btnText = document.createTextNode("Quitar de favoritos");

      btn.appendChild(btnText);
      btn.onclick = () => deleteFavouriteMichi(michi.id)
      img.src = michi.image.url;
      img.width = "150";

      article.appendChild(img);
      article.appendChild(btn);

      section.appendChild(article);
    });
  }
};

async function saveFavouriteMichi(id) {
  const res = await fetch(API_URL_FAVORITES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key":
        "live_aCULxXarZdDfjky1JoyauJ8E7CfDnJrb7JcehmMcQ8ej1pfQJTMMWSl3aUHdxPDl",
    },
    body: JSON.stringify({
      image_id: `${id}`,
    }),
  });

  const data = await res.json();

  console.log(data);

  loadFavouriteMichis();

  if (res.status != 200) {
    spanError.textContent = data.message;
  }
}

async function deleteFavouriteMichi(id) {
  const res = await fetch(API_URL_FAVORITES + `/${id}`, {
    method: "DELETE",
    headers: {
      "x-api-key":
        "live_aCULxXarZdDfjky1JoyauJ8E7CfDnJrb7JcehmMcQ8ej1pfQJTMMWSl3aUHdxPDl",
    }
  });

  const data = await res.json();

  loadFavouriteMichis();

  if (res.status != 200) {
    spanError.textContent = data.message;
  }
}



loadFavouriteMichis();

loadRandomMichis();

btn.addEventListener("click", loadRandomMichis.bind(this));
