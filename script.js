console.log("hello world");
const searchInput = document.getElementById("search-input");
const searchbutton = document.getElementById("search");
const main = document.getElementById("main");
const showmoreBtn = document.getElementById("btn");
const downloadButton = document.getElementById("")
// const main2 = document.getElementById("main2");
let page = 1;

async function getdata(query) {
  let url;
  if (query) {
    url = `https://api.unsplash.com/search/photos?page=${page}&per_page=${15}&query=${query}&client_id=OLKLjbCA-0IkVB8pA_HSXI8KwQQoQjEzeWCp4UNtLaU`;
  } else {
    url = `https://api.unsplash.com/search/photos?per_page=${15}&page=${page}&query=everything&client_id=OLKLjbCA-0IkVB8pA_HSXI8KwQQoQjEzeWCp4UNtLaU`;
  }
  const promise = await fetch(url);
  const data = await promise.json();
  console.log(data);

  data.results.forEach((ele) => {
    const image = ele.urls.regular;
    const description = wordLimt(ele.description, 5);

    const divEle = document.createElement("div");
    const elem = `<div class="card mt-4 mr-3" style="width: 18rem">
        <img src="${image}" class="card-img-top" style="height: 14rem" alt="..." />
        <div class="card-body" style="height: 8rem">
          <h5 class="card-title">${description}</h5>
          <button type="button" class="btn btn-primary position-absolute bottom-0 start-1 mb-2 download-btn"
        style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
  View
</button>
        </div>
        </div>`;
    divEle.innerHTML = elem;
    main.append(divEle);

    const downloadBtn = divEle.querySelector('.download-btn');
    downloadBtn.addEventListener('click', () => {
      showImage(image);
    });
  });
}
getdata();

function showImage(imageUrl) {
  // Create an anchor element
  const a = document.createElement('a');
  a.href = imageUrl; 
  // Append the anchor element to the body
  document.body.appendChild(a);
  
  // Programmatically click the anchor element to trigger download
  a.click();
  
  // Remove the anchor element from the body
  document.body.removeChild(a);
}

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
  getdata(searchInput.value);
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
