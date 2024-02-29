import React, { useState, useEffect } from 'react';
import './App.css';

const questions = [
  {
    question: "Çin Seddini oluşturan taşlar birbirine ne ile tutturulmuştur?",
    options: ["Bambu Harcı", "Anne Duası", "Pirinç Unu", "Noodle"],
    answer: "Pirinç Unu",
    media: "cin-seddi.jpg",
  },
  {
    question: "İlk Pamuk şekeri bulan kişinin mesleği nedir?",
    options: ["Gıda Mühendisi", "Diş Doktoru", "Ev Hanımı", "Güzellik Uzmanı"],
    answer: "Diş Doktoru",
    media: "pamuk.jpg",
  },
  {
    question:
      "Tarkan'ın 'Hüp' klibini izledikten sonra gaza gelip 'Tarkan keşke beni hüpletseydi' diye açıklamda bulunan kişi kimdir?",
    options: ["Gülben Ergen", "Hülya Avşar", "Harika Avcı", "Sevtap Parman"],
    answer: "Gülben Ergen",
    media: "tarkan.jpg",
  },
  {
    question: "Pteronofobi nedir?",
    options: [
      "Yeşil ışık yanar yanmaz korna çalacak korkusu",
      "Fakir kalma korkusu",
      "Taksi bulamama korkusu",
      "Kuş tüyüyle gıdıklanma korkusu",
    ],
    answer: "Kuş tüyüyle gıdıklanma korkusu",
    media: "fobi.jpg",
  },
  {
    question:
      "Ortalama ömürleri 5 yıl olan Japon balıklarının en uzun yaşayanı Tish, bütün istatistikleri alt üst ederek kaç yıl boyunca hayata tutunmayı başarmıştır?",
    options: ["43", "78", "23", "99"],
    answer: "43",
    media: "balik.jpg",
  },
  {
    question:
      "90'lara damgasını vuran 'Bandıra Bandıra' şarkısının söz yazarı kimdir?",
    options: ["Sezen Aksu", "Sibel Can", "Mustafa Sandal", "Bülent Ersoy"],
    answer: "Mustafa Sandal",
    media: "bandira.jpg",
  },
  {
    question:
      "Hangi şarkıcımız yine kendisi gibi şarkıcı olan sevgilisinden ayrıldıktan sonra tam evinin karşısındaki apartmanın tamamını kendi posteriyle kaplatmıştır?",
    options: ["Hande Yener", "Hadise", "Gülşen", "Simge"],
    answer: "Hadise",
    media: "billboard.jpg",
  },
  {
    question: "Antik Roma'da kadınlar parfüm olarak ne kullanıyordu?",
    options: ["Gül Suyu", "Bal", "Gladyatör Teri", "Kan"],
    answer: "Gladyatör Teri",
    media: "parfum.jpg",
  },
  {
    question: "T-Rex'in yaşayan en yakın akrabası aşağıdakilerden hangisidir?",
    options: ["İnekler", "Tavuklar", "Timsahlar", "Köpekler"],
    answer: "Tavuklar",
    media: "trex.jpg",
  },
  {
    question:
      "Her şeyin olduğu gibi mutluluğun da fobisi varmış. Bu fobiye ne ad verilir?",
    options: ["Çerofobi", "Euphobia", "Felicifobia", "Mutluluk Korkusu"],
    answer: "Çerofobi",
    media: "fobi.jpg",
  },
];

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(30);
  const [optionsDisplayed, setOptionsDisplayed] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(""));
  const [correctAnswers, setCorrectAnswers] = useState(Array(questions.length).fill(""));

  useEffect(() => {
    let interval;

    if (quizStarted && !showScore) {
      interval = setInterval(() => {
        if (timer > 0) {
          setTimer(timer - 1);
        } else {
          handleAnswerButtonClick('');
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [quizStarted, showScore, timer]);

  useEffect(() => {
    if (quizStarted && !showScore) {
      setOptionsDisplayed(false);

      const optionsDisplayTimeout = setTimeout(() => {
        setOptionsDisplayed(true);
      },10000) 

      return () => clearTimeout(optionsDisplayTimeout);
    }
  }, [currentQuestion, quizStarted, showScore]);

  useEffect(() => {
    if (showScore) {
      let resultMessage;

      if (score === 10) {
        resultMessage = "İMPARATORRRR";
      } else if (score >= 7) {
        resultMessage = "84 ALDIN KALDINNN!!!";
      } else if (score >= 3) {
        resultMessage = "GENEL KÜLTÜR SIFFIR SIFFIR SIFFIR";
      } else {
        resultMessage = "EMAN EMAN EMAN :(";
      }

      setResultMessage(resultMessage);
    }
  }, [score, showScore]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswerButtonClick = (selectedAnswer) => {
    const correctAnswer = questions[currentQuestion].answer;
    setUserAnswers(prevUserAnswers => {
      const newUserAnswers = [...prevUserAnswers];
      newUserAnswers[currentQuestion] = selectedAnswer;
      return newUserAnswers;
    });

    setCorrectAnswers(prevCorrectAnswers => {
      const newCorrectAnswers = [...prevCorrectAnswers];
      newCorrectAnswers[currentQuestion] = correctAnswer;
      return newCorrectAnswers;
    });

    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
    }

    setTimer(30);

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimer(30);
    setOptionsDisplayed(false);
    setResultMessage("");
    setUserAnswers(Array(questions.length).fill(""));
    setCorrectAnswers(Array(questions.length).fill(""));
  };

  return (
    <div className="app">
      {!quizStarted ? (
        <div className="start-screen">
          <h1>Quiz'e Hoş Geldiniz!</h1>
          <p>Heyecan dolu bir yolculuğa hazır mısınız?</p>
          <p className="funny-text">Dipnot: Mentörümüz Ersin hocanın hazırladığı bu 10 soruluk mükemmel testi geçerseniz demekki Ersin hocanın ruh eşisiniz demektir 😅😅😅😅  </p>
          <button id='start' onClick={handleStartQuiz}>START</button>
        </div>
      ) : showScore ? (
        <div className="score-section">
          <h2>Quiz Tamamlandı</h2>
          <p>Puanınız: {score} / {questions.length}</p>
          <div className="result-section">
            <p>{resultMessage}</p>
            <div className="answer-results">
              {questions.map((question, index) => (
                <div key={index} className="answer-result">
                  <p>{index + 1}. Soru:</p>
                  <p>Doğru Cevap: {correctAnswers[index]}</p>
                  <p>Sizin Cevabınız: {userAnswers[index]}</p>
                </div>
              ))}
            </div>
          </div>
          <button onClick={handleRestartQuiz}>Yeniden Başlat</button>
        </div>
      ) : (
        <div>
          <div className="question-section">
            <div className="current-question">Şu anki Soru: {currentQuestion + 1}</div>
            <div className="question-text">{questions[currentQuestion].question}</div>
            <img
              src={`assets/pictures/${questions[currentQuestion].media}`}
              alt={`Question ${currentQuestion + 1}`}
              className="question-image"
            />
            <p>Süre: {timer} saniye</p>
            {optionsDisplayed && (
              <div className="answer-section">
                {questions[currentQuestion].options.map((option, index) => (
                  <button key={index} onClick={() => handleAnswerButtonClick(option)}>
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
