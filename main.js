// This is the content for main.js
document.addEventListener("DOMContentLoaded", function() {
    // Fetch and insert the header
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;
        });

    // Fetch and insert the footer
    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-placeholder").innerHTML = data;
        });
});
