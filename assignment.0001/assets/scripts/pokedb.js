function showSidebar (){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}
function hideSidebar (){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
}
function givesendgo (){
    document.location='https://givesendgo.com/ilts4huffpint3/'
}

const faqItemHeaders = document.querySelectorAll(".faq-item-header");
faqItemHeaders.forEach(faqItemHeader => {
    faqItemHeader.addEventListener("click", event => {
	faqItemHeader.classList.toggle("active");
    }); 
});
