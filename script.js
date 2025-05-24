const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "Rome", "Berlin", "Madrid"],
      answer: "Paris"
    },
    {
      question: "Which language is used for web development?",
      options: ["Python", "C++", "JavaScript", "Java"],
      answer: "JavaScript"
    },
    {
      question: "Who wrote 'Hamlet'?",
      options: ["Charles Dickens", "William Shakespeare", "Leo Tolstoy", "Mark Twain"],
      answer: "William Shakespeare"
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  const questionElement = document.getElementById("question");
  const optionsList = document.getElementById("options");
  const nextBtn = document.getElementById("nextBtn");
  const resultElement = document.getElementById("result");
  
  function loadQuestion() {
    resetState();
    const current = questions[currentQuestionIndex];
    questionElement.textContent = current.question;
  
    current.options.forEach(option => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.textContent = option;
      button.classList.add("option-btn");
      button.addEventListener("click", () => selectOption(button, current.answer));
      li.appendChild(button);
      optionsList.appendChild(li);
    });
  }
  
  function resetState() {
    nextBtn.style.display = "none";
    resultElement.classList.add("hidden");
    optionsList.innerHTML = "";
  }
  
  function selectOption(button, correctAnswer) {
    const allButtons = document.querySelectorAll(".option-btn");
  
    allButtons.forEach(btn => {
      btn.disabled = true;
      if (btn.textContent === correctAnswer) {
        btn.classList.add("correct");
      } else {
        if (btn !== button) btn.classList.add("wrong");
      }
    });
  
    if (button.textContent === correctAnswer) {
      score++;
    } else {
      button.classList.add("wrong");
    }
  
    nextBtn.style.display = "block";
  }
  
  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  });
  
  function showResult() {
    resetState();
    questionElement.textContent = "Quiz Completed!";
    resultElement.textContent = `Your score: ${score} / ${questions.length}`;
    resultElement.classList.remove("hidden");
    nextBtn.textContent = "Restart Quiz";
    nextBtn.style.display = "block";
    nextBtn.onclick = () => location.reload();
  }
  
  // Load the first question
  loadQuestion();
  