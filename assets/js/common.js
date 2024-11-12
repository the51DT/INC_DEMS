document.addEventListener("DOMContentLoaded", () => {
  const textArea = document.querySelectorAll(".checklist_text")
  textArea.forEach((el) => {
    el.addEventListener("input", () => {
      el.style.height = "53px";
      el.style.height = el.scrollHeight + "px";
    });
    window.addEventListener("resize", () => {
      el.style.height = "53px";
      el.style.height = el.scrollHeight + "px";
    });
  })

  const headerBtn = document.querySelector(".header_btn")
  if (headerBtn) {
    headerBtn.addEventListener("click", () => {
      const lnb = document.querySelector(".lnb_admin");
      if (lnb) {
        lnb.classList.toggle("on");
        if (lnb.classList.contains("on")) {
          const adminCon = document.querySelector(".contents_admin");
          adminCon.addEventListener("click", () => {
            lnb.classList.remove("on");
          });
        }
      }
    });
  }
  /* 추후 개발을 위해 querySelector 체크하여 if문으로 변경 - 기존 소스 주석 문제있음 얘기주시고 */
  /* querySelector if문 처리로 변경전 소스 const headerFn = () => {
    headerBtn.addEventListener("click", () => {
      const lnb = document.querySelector(".lnb_admin");
      lnb.classList.toggle("on");
    });
  }
  headerBtn ? headerFn() : false; */

  const popCloseBtnFn = (btns) => {
    btns.forEach((el) => {
      el.addEventListener("click", () => {
        const popup = el.closest(".popup_wrap");
        if (popup) {
          popup.classList.remove("on");
        }
      });
    });
  };

  const popupOpenBtnFn = (btns) => {
    btns.forEach((el) => {
      el.addEventListener("click", () => {
        const popup = document.querySelector(`#${el.dataset.pop}`);
        if (popup) {
          popup.classList.add("on");
          resizeCanvas(); // 팝업 열 때 캔버스 크기 조정
        }
      });
    });
  };
  const pop = document.querySelectorAll(".popup_wrap");
  if (pop.length > 0) {
    popCloseBtnFn(document.querySelectorAll(".popClose"));
    popupOpenBtnFn(document.querySelectorAll(".popOpen"));
  }

  /* 
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
  pop ? popFn() : false;  */
  /* [S]2024.0821 Sign area */
  const canvas = document.getElementById('signCanvas');
  if (canvas) {
    const sign = canvas.getContext('2d');
    let isDrawing = false;
    function startPosition(e) {
      isDrawing = true;
      draw(e);
    }

    function endPosition() {
      isDrawing = false;
      sign.beginPath();
    }

    function draw(e) {
      if (!isDrawing) return;
      sign.lineWidth = 2;
      sign.lineCap = 'round';
      sign.strokeStyle = 'black';

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      sign.lineTo(x, y);
      sign.stroke();
      sign.beginPath();
      sign.moveTo(x, y);
    }

    function clearCanvas() {
      sign.clearRect(0, 0, canvas.width, canvas.height);
      showPlaceholder(); // 캔버스 지울 때 플레스홀더 다시 표시
    }

    function resizeCanvas() {
      const signWrap = document.querySelector(".sign_wrap");
      if (signWrap) {
        const rect = signWrap.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    }

    function showPlaceholder() {
      const placeholder = document.querySelector('.sign_placeholder');
      if (placeholder) {
        placeholder.style.display = 'block';
      }
    }

    function hidePlaceholder() {
      const placeholder = document.querySelector('.sign_placeholder');
      if (placeholder) {
        placeholder.style.display = 'none';
      }
    }

    function handleTouch(e) {
      e.preventDefault(); // 터치 관련
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      if (isDrawing) {
        sign.lineTo(x, y);
        sign.stroke();
        sign.beginPath();
        sign.moveTo(x, y);
      }
    }

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);

    canvas.addEventListener('touchstart', startPosition);
    canvas.addEventListener('touchend', endPosition);
    canvas.addEventListener('touchmove', handleTouch);

    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', clearCanvas);
    }

    /* 저장 필요하면 쓰고 const saveBtn = document.getElementById('saveBtn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'signature.png';
        link.click();
      });
    } */

    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', clearCanvas);
    }
    showPlaceholder();
    canvas.addEventListener('mousedown', () => {
      hidePlaceholder();
    });
    canvas.addEventListener('touchstart', () => {
      hidePlaceholder();
    });

  } 

  /* [E]2024.08.21 Sign area */
});