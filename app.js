const lessons = [
  "مقدمه‌ای بر نانومقیاس و تاریخچه",
  "ساختار بلوری و نقص‌ها در مواد نانو",
  "روش‌های سنتز: Sol-Gel، CVD و لیتوگرافی",
  "آنالیز با XRD، SEM و AFM",
  "خواص الکتریکی و کوانتومی در نانو",
  "نانوکامپوزیت‌ها و کاربردهای صنعتی",
  "نانوفوتونیک و حسگرهای زیستی",
  "اخلاق پژوهش و ایمنی نانومواد"
];

const state = {
  completed: 2,
  xpPerLesson: 25
};

const lessonPath = document.getElementById("lessonPath");
const template = document.getElementById("lessonTemplate");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const xpValue = document.getElementById("xpValue");

function renderLessons() {
  lessonPath.innerHTML = "";

  lessons.forEach((title, index) => {
    const lessonNumber = index + 1;
    const node = template.content.cloneNode(true);
    const btn = node.querySelector(".lesson-btn");

    node.querySelector(".lesson-index").textContent = lessonNumber;
    node.querySelector(".lesson-title").textContent = title;

    if (lessonNumber <= state.completed) {
      btn.classList.add("completed");
      node.querySelector(".lesson-state").textContent = "تکمیل شد";
    } else if (lessonNumber === state.completed + 1) {
      btn.classList.add("unlocked");
      node.querySelector(".lesson-state").textContent = "قابل شروع";
      btn.addEventListener("click", () => completeLesson());
    } else {
      btn.classList.add("locked");
      node.querySelector(".lesson-state").textContent = "قفل";
      btn.disabled = true;
    }

    lessonPath.appendChild(node);
  });

  updateStats();
}

function completeLesson() {
  if (state.completed < lessons.length) {
    state.completed += 1;
    renderLessons();
  }
}

function updateStats() {
  const progress = Math.round((state.completed / lessons.length) * 100);
  progressBar.style.width = `${progress}%`;
  progressText.textContent = `${progress}%`;
  xpValue.textContent = `${state.completed * state.xpPerLesson} XP`;
}

renderLessons();
