
    // تحقق واش المستخدم رجع من صفحة الكتاب
    if (localStorage.getItem("fromBook") === "true") {
      document.body.style.backgroundImage = "url('BONO.jpg.jpg')"; // صورة جديدة
      localStorage.removeItem("fromBook"); // نفرغ القيمة
    } else {
      document.body.style.backgroundImage = "url('ANWAR.jpg.jpg')"; // الصورة الأصلية
    }

    function goToBook() {
      window.location.href = "BOTO.html";
    }
  

