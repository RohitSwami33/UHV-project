import { useState } from 'react';
import { Brain, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';

export default function ScamQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: 'You receive an email from your bank asking you to verify your account by clicking a link and entering your password. What should you do?',
      options: [
        'Click the link immediately to secure your account',
        'Ignore the email and contact your bank directly through their official website or phone number',
        'Reply to the email asking if it is legitimate',
        'Forward it to your friends to warn them',
      ],
      correctAnswer: 1,
      explanation: 'Banks never ask for passwords via email. Always contact your bank directly through official channels.',
    },
    {
      question: 'A caller claims to be from tech support saying your computer has a virus. They offer to fix it remotely for a fee. What should you do?',
      options: [
        'Give them remote access to fix the issue',
        'Pay them immediately to protect your computer',
        'Hang up - legitimate tech companies do not make unsolicited calls about viruses',
        'Ask them to send an email confirmation first',
      ],
      correctAnswer: 2,
      explanation: 'Tech support scams are common. Real companies do not cold-call about computer issues.',
    },
    {
      question: 'You win a lottery you never entered. The notification asks for a processing fee to claim your prize. What should you do?',
      options: [
        'Pay the fee to claim your winnings',
        'Share your bank details to receive the prize',
        'Recognize this as a scam - legitimate lotteries do not require upfront fees',
        'Forward the message to verify its authenticity',
      ],
      correctAnswer: 2,
      explanation: 'Lottery scams always ask for money upfront. You cannot win a lottery you never entered.',
    },
    {
      question: 'Someone you just met online professes love quickly and asks you to send money for an emergency. What should you do?',
      options: [
        'Send the money to help them',
        'Ask them for more personal details first',
        'Recognize this as a romance scam and stop all communication',
        'Suggest a video call to verify their identity',
      ],
      correctAnswer: 2,
      explanation: 'Romance scammers build fake relationships quickly and always ask for money. Never send money to someone you have not met in person.',
    },
  ];

  const handleAnswer = (selectedIndex: number) => {
    const isCorrect = selectedIndex === questions[currentQuestion].correctAnswer;
    setAnswers([...answers, isCorrect]);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 1500);
    } else {
      setTimeout(() => {
        setShowResults(true);
      }, 1500);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const score = answers.filter((a) => a).length;

  if (showResults) {
    return (
      <section className="bg-slate-800 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-900 border-2 border-cyan-500/20 rounded-xl p-8">
            <div className="text-center mb-8">
              <Brain className="h-16 w-16 text-cyan-400 mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-white mb-4">Quiz Results</h2>
              <div className="text-6xl font-bold mb-4">
                <span className="text-cyan-400">{score}</span>
                <span className="text-gray-400"> / {questions.length}</span>
              </div>
              <p className="text-xl text-gray-300">
                {score === questions.length
                  ? 'Perfect! You are well-prepared to identify scams!'
                  : score >= questions.length / 2
                  ? 'Good job! Keep learning to stay even safer.'
                  : 'Keep learning! Review the safety tips to improve your awareness.'}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {questions.map((q, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    answers[index]
                      ? 'bg-green-500/10 border border-green-500'
                      : 'bg-red-500/10 border border-red-500'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {answers[index] ? (
                      <CheckCircle2 className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
                    )}
                    <div>
                      <p className="text-white font-semibold mb-2">Question {index + 1}</p>
                      <p className="text-gray-400 text-sm">{q.explanation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={resetQuiz}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Take Quiz Again</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  const answeredCurrent = answers.length > currentQuestion;
  const currentAnswer = answeredCurrent ? answers[currentQuestion] : null;

  return (
    <section className="bg-slate-800 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="h-8 w-8 text-cyan-400" />
            <h2 className="text-4xl font-bold text-white">Scam Detection Quiz</h2>
          </div>
          <p className="text-gray-400 text-lg">Test your ability to identify common scams</p>
        </div>

        <div className="bg-slate-900 border-2 border-cyan-500/20 rounded-xl p-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-cyan-400 font-semibold">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <div className="flex space-x-2">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index < answers.length
                        ? answers[index]
                          ? 'bg-green-400'
                          : 'bg-red-400'
                        : index === currentQuestion
                        ? 'bg-cyan-400'
                        : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-6">
              {questions[currentQuestion].question}
            </h3>
          </div>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => {
              const isCorrect = index === questions[currentQuestion].correctAnswer;
              const isSelected = answeredCurrent;
              const showFeedback = isSelected;

              return (
                <button
                  key={index}
                  onClick={() => !answeredCurrent && handleAnswer(index)}
                  disabled={answeredCurrent}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    showFeedback && isCorrect
                      ? 'border-green-500 bg-green-500/10'
                      : showFeedback && !isCorrect && currentAnswer === false
                      ? 'border-red-500 bg-red-500/10'
                      : 'border-slate-700 bg-slate-800 hover:border-cyan-500 hover:bg-slate-700'
                  } ${answeredCurrent ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-cyan-400 font-bold">{String.fromCharCode(65 + index)}.</span>
                    <span className="text-white flex-1">{option}</span>
                    {showFeedback && isCorrect && (
                      <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {answeredCurrent && (
            <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500 rounded-lg">
              <p className="text-gray-300">{questions[currentQuestion].explanation}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
