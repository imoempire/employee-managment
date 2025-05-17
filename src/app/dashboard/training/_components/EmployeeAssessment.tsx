import React, { useState } from "react";
import { Radio, Button, Text, Progress, Stack } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

// Sample quiz questions data
const quizQuestions = [
  {
    id: 1,
    question: "What is the primary goal of project management?",
    options: [
      "To complete projects on time and within budget",
      "To maximize team size",
      "To create detailed documentation",
      "To minimize communication needs",
    ],
    correctAnswer: 0,
  },
  {
    id: 2,
    question: "Which of the following is a key principle of Agile methodology?",
    options: [
      "Detailed planning up front",
      "Responding to change over following a plan",
      "Comprehensive documentation",
      "Contract negotiation over collaboration",
    ],
    correctAnswer: 1,
  },
  // Add more questions as needed to reach 20
  // ...
];

export default function EmployeeAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(quizQuestions.length).fill(null)
  );

  const totalQuestions = quizQuestions.length;
  const answeredCount = selectedAnswers.filter(
    (answer) => answer !== null
  ).length;

  const handleAnswerSelect = (index: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = index;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <Stack align="center" mb={24}>
          <Text size="xl" fw={700} className="text-3xl">
            Employee Knowledge Assessment
          </Text>
          <Text c="dimmed" className="text-gray-600">
            Complete all {totalQuestions} questions and submit to see your score
          </Text>
        </Stack>

        {/* Progress Bar */}
        <Progress
          value={((currentQuestion + 1) / totalQuestions) * 100}
          radius="xl"
          size="sm"
          color="#e0e0e0"
          className="bg-gray-200 mb-6"
        />

        {/* Question Counter */}
        <div className="flex justify-between mb-4">
          <Text className="text-gray-800 font-medium">
            Question {currentQuestion + 1} of {totalQuestions}
          </Text>
          <Text className="text-gray-800 font-medium">
            Answered: {answeredCount} / {totalQuestions}
          </Text>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-6">
          <Text fw={600} size="lg" mb={24} className="text-xl">
            Question {currentQuestion + 1}:{" "}
            {quizQuestions[currentQuestion].question}
          </Text>

          <Radio.Group
            value={selectedAnswers[currentQuestion]?.toString()}
            onChange={(value) => handleAnswerSelect(parseInt(value))}
          >
            <Stack>
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <div key={index} className="py-2">
                  <Radio
                    value={index.toString()}
                    label={option}
                    classNames={{
                      root: "flex items-center",
                      radio: "border-gray-400",
                      label: "text-base ml-2",
                    }}
                  />
                </div>
              ))}
            </Stack>
          </Radio.Group>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            leftSection={<IconChevronLeft size={14} />}
            variant="outline"
            color="gray"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            Previous
          </Button>

          <Button
            rightSection={<IconChevronRight size={14} />}
            variant="filled"
            color="dark"
            onClick={handleNext}
            className="px-4 py-2 bg-gray-900 text-white rounded-md"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
