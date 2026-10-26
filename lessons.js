// ============================================================
// سجل الدروس - أضف سطراً واحداً لكل درس جديد
// ============================================================
window.LESSONS_REGISTRY = [
    {
        title: "النعت",
        description: "50 سؤالاً شاملاً في النعت الحقيقي والسببي والجملة وشبه الجملة.",
        file: "lesson1.js",
        varName: "LESSON1_DATA"   // ← اسم المتغير الذي يعيّنه الملف
    },
    {
        title: "التوكيد",
        description: "20 سؤالاً في التوكيد اللفظي والمعنوي مع تطبيقات متنوعة.",
        file: "lesson2.js",
        varName: "LESSON2_DATA"
    },
    {
        title: "المدرسة الرومانسية",
        description: "40 سؤالاً في الأدب الرومانسي: النشأة، الخصائص، أعلامه، ومدارسه.",
        file: "lesson3.js",
        varName: "LESSON3_DATA"
    }
];

// ============================================================
// تحميل ملفات الدروس تلقائياً
// ============================================================
(function loadLessons() {
    const promises = window.LESSONS_REGISTRY.map(lesson => {
        return new Promise(resolve => {
            const script = document.createElement('script');
            script.src = lesson.file;
            script.onload = () => {
                // نأخذ البيانات من المتغير المخصص لهذا الدرس
                lesson.questions = window[lesson.varName] || [];
                if (!lesson.questions.length) {
                    console.error('لم يتم العثور على بيانات الدرس:', lesson.varName, 'في', lesson.file);
                }
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
