// ============================================================
// سجل الدروس - أضف سطراً واحداً لكل درس جديد
// ============================================================
window.LESSONS_REGISTRY = [
    {
        title: "النعت",
        description: "50 سؤالاً شاملاً في النعت الحقيقي والسببي والجملة وشبه الجملة.",
        file: "lesson1.js"
    },
    {
        title: "التوكيد",
        description: "20 سؤالاً في التوكيد اللفظي والمعنوي مع تطبيقات متنوعة.",
        file: "lesson2.js"
    },
    {
        title: "المدرسة الرومانسية",
        description: "40 سؤالاً في الأدب الرومانسي: النشأة، الخصائص، أعلامه، ومدارسه.",
        file: "lesson3.js"
    }
];

// ============================================================
// تحميل ملفات الدروس تلقائياً بعد تحميل الصفحة
// ============================================================
(function loadLessons() {
    const promises = window.LESSONS_REGISTRY.map(lesson => {
        return new Promise(resolve => {
            const script = document.createElement('script');
            script.src = lesson.file;
            script.onload = () => {
                // الملف يجب أن يُعيّن: window.LESSON_DATA = [...]
                lesson.questions = window.LESSON_DATA;
                window.LESSON_DATA = null; // تصفير للدرس التالي
                resolve();
            };
            script.onerror = () => {
                console.error('فشل تحميل:', lesson.file);
                lesson.questions = [];
                resolve();
            };
            document.body.appendChild(script);
        });
    });
    Promise.all(promises).then(() => {
        console.log('✅ تم تحميل جميع الدروس:', window.LESSONS_REGISTRY.length);
        window.dispatchEvent(new Event('lessonsReady'));
    });
})();
