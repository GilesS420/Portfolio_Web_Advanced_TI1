document.addEventListener("DOMContentLoaded", function() {
    let observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    let observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }else{
                entry.target.classList.remove("visible");
                void entry.target.offsetWidth;
                entry.target.classList.add("fadeIn")
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-title, .element, .all-elements, .title-p').forEach(element => {
        observer.observe(element);
    });
    updateHeader();
});

function updateHeader() {
    const userNameSpan = document.getElementById('userName');
    const userAgeSpan = document.getElementById('userAge');

    const user = JSON.parse(localStorage.getItem('user'));
    if (user){
    userNameSpan.textContent = user.name;
     userAgeSpan.textContent = user.age;
    }
    
}