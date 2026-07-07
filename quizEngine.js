class QuizEngine {
    constructor() {
        this.currentModule = null;
        this.currentQIndex = 0;
        this.score = 0;
        this.questions = [];
        this.modal = document.getElementById('quiz-modal');
        this.container = document.getElementById('quiz-container');

        document.getElementById('close-quiz').addEventListener('click', () => this.close());
    }

    startQuiz(moduleId) {
        this.currentModule = modules.find(m => m.id === moduleId);
        // Deep copy and shuffle questions
        this.questions = this.currentModule.quiz.map(q => ({...q})).sort(() => Math.random() - 0.5);
        this.currentQIndex = 0;
        this.score = 0;
        this.modal.classList.remove('hidden');
        this.renderQuestion();
    }

    renderQuestion() {
        if (this.currentQIndex >= this.questions.length) {
            this.showResults();
            return;
        }

        const q = this.questions[this.currentQIndex];
        
        let html = `
            <div style="margin-top: 20px;">
                <span style="color:var(--accent);font-weight:bold;margin-bottom:15px;display:block; letter-spacing: 1px;">
                    QUESTION ${this.currentQIndex + 1} OF ${this.questions.length}
                </span>
                <div class="quiz-question">${q.q}</div>
                <div class="options-container">
        `;

        q.options.forEach((opt, idx) => {
            html += `<button class="quiz-option" data-idx="${idx}">${opt}</button>`;
        });

        html += `</div></div>`;
        this.container.innerHTML = html;

        this.container.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleAnswer(parseInt(e.target.dataset.idx), q.a));
        });
    }

    handleAnswer(selectedIdx, correctIndex) {
        const options = this.container.querySelectorAll('.quiz-option');
        options.forEach(opt => opt.disabled = true);

        // Find correct text to avoid referencing by shuffled index
        const currQ = this.questions[this.currentQIndex];
        const selectedText = currQ.options[selectedIdx];
        
        // Find original question in module to get correct option text
        const origQ = this.currentModule.quiz.find(q => q.q === currQ.q);
        const correctText = origQ.options[origQ.a];

        if (selectedText === correctText) {
            options[selectedIdx].classList.add('correct');
            this.score++;
        } else {
            options[selectedIdx].classList.add('wrong');
            // Highlight the correct one
            for (let i = 0; i < options.length; i++) {
                if (currQ.options[i] === correctText) {
                    options[i].classList.add('correct');
                }
            }
        }

        setTimeout(() => {
            this.currentQIndex++;
            this.renderQuestion();
        }, 1200);
    }

    showResults() {
        const percentage = Math.round((this.score / this.questions.length) * 100);
        
        let progress = JSON.parse(localStorage.getItem('chemsoul_progress') || '{}');
        const existingScore = progress[this.currentModule.id] ? progress[this.currentModule.id].score : 0;
        
        // Only keep highest score
        if (percentage >= existingScore) {
            progress[this.currentModule.id] = { score: percentage, completed: true };
            localStorage.setItem('chemsoul_progress', JSON.stringify(progress));
            window.dispatchEvent(new Event('progressUpdated'));
        }

        this.container.innerHTML = `
            <div style="text-align:center; padding: 40px 20px;">
                <h2 style="color:var(--accent); font-size:2.5rem; margin-bottom:15px;">Quiz Complete!</h2>
                <div style="font-size:4rem; font-weight:800; margin-bottom: 20px;">${percentage}%</div>
                <p style="font-size:1.2rem; color:var(--text-muted);">You scored ${this.score} out of ${this.questions.length}</p>
                <div style="margin-top: 40px;">
                    <button class="btn" onclick="quizEngine.close()" style="width: 100%;">Return to Module</button>
                </div>
            </div>
        `;
    }

    close() {
        this.modal.classList.add('hidden');
        if(window.scriptApp && typeof window.scriptApp.refreshView === 'function') {
            window.scriptApp.refreshView();
        }
    }
}

const quizEngine = new QuizEngine();
