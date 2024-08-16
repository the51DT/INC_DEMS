document.addEventListener("DOMContentLoaded", function(){
  const headerBtn = document.querySelector(".header_btn")
  headerBtn.addEventListener("click", function() {
    const lnb = document.querySelector(".lnb_admin")
    lnb.classList.toggle("on")
  })
})