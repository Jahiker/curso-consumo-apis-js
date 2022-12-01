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

    console.log("RANDOM", {res, data});
  
    const img1 = document.querySelector("#img_1");
    const img2 = document.querySelector("#img_2");
  
    img1.src = data[0].url;
    img2.src = data[1].url;

    if(res.status != 200) {
      spanError.textContent = data.message
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
      "x-api-key":
        "live_aCULxXarZdDfjky1JoyauJ8E7CfDnJrb7JcehmMcQ8ej1pfQJTMMWSl3aUHdxPDl",
    },
  };

  await fetch(API_URL_FAVORITES, options)
    .then((resp) => resp.json())
    .then((data) => {
      console.log("FAVORITES",data);

      // const img1 = document.querySelector("#img_1");
      // const img2 = document.querySelector("#img_2");

      // img1.src = data[0].url;
      // img2.src = data[1].url;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

async function saveFavouriteMichis() {
  const res = await fetch(API_URL_FAVORITES, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "x-api-key":
        "live_aCULxXarZdDfjky1JoyauJ8E7CfDnJrb7JcehmMcQ8ej1pfQJTMMWSl3aUHdxPDl",
    },
    body: JSON.stringify({
      image_id: "935"
    })
  });

  const data = await res.json();

  console.log(data);

  if(res.status != 200) {
    spanError.textContent = data.message
  }
}

loadFavouriteMichis();

loadRandomMichis();

btn.addEventListener("click", loadRandomMichis.bind(this));
