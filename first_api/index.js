const URL = "https://api.thecatapi.com/v1/images/search?limit=2";

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

  await fetch(URL, options)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);

      const img1 = document.querySelector("#img_1");
      const img2 = document.querySelector("#img_2");

      img1.src = data[0].url;
      img2.src = data[1].url;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

const loadFavoritesMichis = async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key":
        "live_aCULxXarZdDfjky1JoyauJ8E7CfDnJrb7JcehmMcQ8ej1pfQJTMMWSl3aUHdxPDl",
    },
  };

  await fetch(URL, options)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);

      const img1 = document.querySelector("#img_1");
      const img2 = document.querySelector("#img_2");

      img1.src = data[0].url;
      img2.src = data[1].url;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

loadRandomMichis();

btn.addEventListener("click", getKitten.bind(this));
