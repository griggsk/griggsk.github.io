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

fetch("../layout/connect.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector("#contactMe").innerHTML = data;
  });
fetch("../layout/skills.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    const skillsElement = document.querySelector("#mySkills");
    if (skillsElement) {
      skillsElement.innerHTML = data;
    } 
  });
fetch("../layout/projects.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    const projectElement = document.querySelector("#projectList");
    if (projectElement) {
      projectElement.innerHTML = data;
    } 
  });