import React, { useState, useEffect } from 'react';
import { Header, Image } from 'semantic-ui-react';

function Assessment() {
    const [assessmentData, setAssessmentData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [incorrectAnswer, setIncorrectAnswer] = useState(false); // State to track incorrect answer

    const question_key_order = ['boy', 'men', 'woman', 'girl'];

    useEffect(() => {
        const fetchAssessmentData = async () => {
            const assessmentData = [];
            for (const object of question_key_order) {
                try {
                    const response = await fetch(`http://localhost:3000/api/generateQuestion?key=${object}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    assessmentData.push(data);
                } catch (error) {
                    console.error('Error fetching assessment data:', error);
                }
            }
            setAssessmentData(assessmentData);
        };

        fetchAssessmentData();
    }, []);

    const handleOptionSelect = (selectedOptionKey) => {
        const correctAnswerKey = assessmentData[currentIndex].correctAnswer;
        if (selectedOptionKey === correctAnswerKey) {
            if (incorrectAnswer) {
                setIncorrectAnswer(false); // Reset incorrect answer flag if the answer is correct
            }
            alert('Correct!');
            // Move to the next question
            if (currentIndex < assessmentData.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else {
                alert('Assessment completed!');
                // Optionally, you can navigate to another page or perform any other action when assessment is completed
            }
        } else {
            setIncorrectAnswer(true); // Set incorrect answer flag
            alert('Incorrect! Try again.');
        }
    };

    return (
        <div>
            <Header>Assessment</Header>
            {assessmentData.length > 0 && (
                <div>
                    <Header>{assessmentData[currentIndex].question}</Header>
                    <audio key={currentIndex} controls>
                        <source src={`http://localhost:3000/files/${assessmentData[currentIndex].audio}`} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                    <p>Select the correct option:</p>
                    {assessmentData[currentIndex].optionsImages.map((option, index) => (
                        <Image
                            key={index}
                            src={`http://localhost:3000/files/${option.image}`}
                            style={{ cursor: 'pointer', marginRight: '10px' }}
                            onClick={() => handleOptionSelect(option.key)}
                        />
                    ))}
                    {incorrectAnswer && (
                        <p style={{ color: 'red' }}>Incorrect answer! Please try again.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Assessment;
