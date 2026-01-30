
// نجيب جميع الصفحات باستعمال الصفوف page, page1, page2 ...
const pages = document.querySelectorAll('.page, .page1, .page2, .page3, .page4,page5');
let current = 0;

// دالة باش تعرض الصفحات حسب الرقم الحالي
function showPage(index) {
  pages.forEach((page, i) => {
    if (i <= index) {
      page.style.transform = "rotateY(-180deg)"; // تقليب الصفحة
    } else {
      page.style.transform = "rotateY(0deg)";
    }
  });
}

// الزر "التالي"
document.getElementById('next').addEventListener('click', () => {
  if (current < pages.length - 1) {
    current++;
    showPage(current);
  }
});

// الزر "السابق"
document.getElementById('prev').addEventListener('click', () => {
  if (current > 0) {
    current--;
    showPage(current);
  }
});

