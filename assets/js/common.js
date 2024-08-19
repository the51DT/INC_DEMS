document.addEventListener("DOMContentLoaded", () => {
  const headerBtn = document.querySelector(".header_btn")
  const headerFn = () => {
    headerBtn.addEventListener("click", () => {
      const lnb = document.querySelector(".lnb_admin");
      lnb.classList.toggle("on");
    });
  }
  headerBtn ? headerFn() : false;

  const pop = document.querySelectorAll(".popup_wrap")
  const popCloseBtnFn = (btn) => {
    btn.forEach((el) => {
      el.addEventListener("click", () => {
        el.closest(".popup_wrap").classList.remove("on");
      });
    })
  }
  const popupOpenBtnFn = (btn) => {
    btn.forEach((el) => {
      el.addEventListener("click", () => {
        document.querySelector(`#${el.dataset.pop}`).classList.add("on");
      });
    });
  }
  const popFn = function(){
    popCloseBtnFn(document.querySelectorAll(".popClose"));
    popupOpenBtnFn(document.querySelectorAll(".popOpen"));
  }
  pop ? popFn() : false;
})