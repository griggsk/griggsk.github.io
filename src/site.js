 fetch("../layout/header.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector("header").innerHTML = data;
  });

fetch("../layout/footer.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector("footer").innerHTML = data;
  });

etch("../layout/connect.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector("#contactMe").innerHTML = data;
  });