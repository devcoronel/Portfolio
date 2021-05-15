let url = window.location.href;
let split = url.split("/");
let route = split[split.length -1]

if(route == "studies") {
    let studies = document.getElementById("studies");
    studies.innerHTML = `<a class="nav-link fw-bold" href="/studies">Studies</a>`;
}else if (route == "proyects") {
    let proyects = document.getElementById("proyects");
    proyects.innerHTML = `<a class="nav-link fw-bold" href="/proyects">Proyects</a>`;
}else if (route == "contactme") {
    let contactme = document.getElementById("contactme");
    contactme.innerHTML = `<a class="nav-link fw-bold" href="/contactme">Contact Me</a>`;
}else {
    let aboutme = document.getElementById("aboutme");
    aboutme.innerHTML = `<a class="nav-link fw-bold" href="/">About Me</a>`;
};