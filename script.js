console.log("hello world");
const searchInput = document.getElementById("search-input");
const searchbutton = document.getElementById("search");
const main = document.getElementById("main");
const showmoreBtn = document.getElementById("btn");
// const main2 = document.getElementById("main2");
let page = 2;

async function getdata(query) {
  let url;
  if (query) {
    url = `https://api.unsplash.com/search/photos?page=${page}&per_page=${15}&query=${query}&client_id=OLKLjbCA-0IkVB8pA_HSXI8KwQQoQjEzeWCp4UNtLaU`;
  } else {
    url = `https://api.unsplash.com/search/photos?per_page=${15}&query=everything&client_id=OLKLjbCA-0IkVB8pA_HSXI8KwQQoQjEzeWCp4UNtLaU`;
  }
  const promise = await fetch(url);
  const data = await promise.json();
  console.log(data);

  data.results.forEach((ele) => {
    const image = ele.urls.regular;
    const description = wordLimt(ele.description, 5);

    const divEle = document.createElement("div");
    const elem = `<div class="card mt-4 mr-3" style="width: 18rem">
        <img src="${image}"
        class="card-img-top" style="height: 14rem" alt="..." />
        <div class="card-body" style="height: 5rem">
        <h5 class="card-title">${description}</h5>
        </div>
        </div>`;
    divEle.innerHTML = elem;
    main.append(divEle);
  });
}
getdata();

searchbutton.addEventListener("click", (event) => {
  const inputvalue = searchInput.value;
  console.log(inputvalue);
  main.innerHTML = "";
  event.preventDefault();
  getdata(inputvalue);
});
showmoreBtn.addEventListener("click", () => {
  // main.innerHTML = "";
  page++;
  getdata();
});

function wordLimt(text, limit) {
  if (!text) {
    return "hello how are you";
  }
  const words = text.split(' ');
  if (words.length > limit) {
    return words.slice(0, limit).join(' ');
  }
  return text;
}
