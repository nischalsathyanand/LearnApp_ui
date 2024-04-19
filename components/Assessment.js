import React, { useState, useEffect } from 'react';
import { Header, Image, Card, Message, MessageHeader, Container, Button } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";

function Assessment({ question_key_order, handleNext }) {
    const [assessmentData, setAssessmentData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [incorrectAnswer, setIncorrectAnswer] = useState(false); // State to track incorrect answer
    const [audioPlaying, setAudioPlaying] = useState(false); // State to track audio playback

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
    }, [question_key_order]);

    const navigate = useNavigate();

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
                //alert('Assessment completed!');
                handleNext();
                //navigate("/home");
            }
        } else {
            setIncorrectAnswer(true); // Set incorrect answer flag
            alert('Incorrect! Try again.');

            // Shuffle the options for the current question
            const shuffledOptions = shuffleArray(assessmentData[currentIndex].optionsImages);
            // Update the random image URL in the assessmentData state with the shuffled image
            const shuffledImage = shuffledOptions[0].image;
            const updatedAssessmentData = [...assessmentData];
            updatedAssessmentData[currentIndex].randomImageUrl = shuffledImage;
            updatedAssessmentData[currentIndex].optionsImages = shuffledOptions;
            setAssessmentData(updatedAssessmentData);
        }
    };

    // Function to shuffle an array
    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    const handlePlayAudio = () => {
        const audioElement = document.getElementById("assessmentAudio");
        if (audioElement.paused) {
            audioElement.play();
            setAudioPlaying(true);
        } else {
            audioElement.pause();
            setAudioPlaying(false);
        }
    };

    useEffect(() => {
        const audioElement = document.getElementById("assessmentAudio");
        if (audioElement && !audioElement.paused) {
            setAudioPlaying(true);
        }
    }, [currentIndex]); // Run this effect whenever currentIndex changes

    useEffect(() => {
        const audioElement = document.getElementById("assessmentAudio");
        if (audioElement && audioElement.paused && audioPlaying) {
            audioElement.play();
        }
    }, [audioPlaying]); // Run this effect whenever audioPlaying changes

    useEffect(() => {
        const audioElement = document.getElementById("assessmentAudio");
        if (audioElement && audioElement.paused) {
            audioElement.play();
            setAudioPlaying(true);
        }
    }, [assessmentData]); // Autoplay the audio when assessmentData changes

    useEffect(() => {
        const audioElement = document.getElementById("assessmentAudio");
        if (audioElement && audioElement.paused) {
            audioElement.play();
            setAudioPlaying(true);
        }
    }, []); // Autoplay the audio when the component mounts

    return (
        <Container textAlign='center'>
            {assessmentData.length > 0 && (
                <div>
                    <Header style={{ textTransform: 'uppercase' }}>{assessmentData[currentIndex].correctAnswer}</Header>

                    <div> <h3>Select the correct option:</h3></div>
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {assessmentData[currentIndex].optionsImages.map((option, index) => (
                            <Card key={index} style={{ margin: '10px', width: '200px', textAlign: 'center' }}>
                                <Image
                                    src={`http://localhost:3000/files/${option.image}`}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleOptionSelect(option.key)}
                                />
                            </Card>
                        ))}
                    </div>

                    <audio 
                        id="assessmentAudio" 
                        src={`http://localhost:3000/files/${assessmentData[currentIndex].audio}`} 
                        style={{ display: 'none' }} // Add this style to hide the audio element
                    />
                    <Button 
                        circular 
                        icon={audioPlaying ? "pause" : "play"} 
                        onClick={handlePlayAudio} 
                        primary 
                        style={{ margin: '1em', fontSize: '2em' }} 
                    />

                    {incorrectAnswer && (
                        <Message negative>
                            <MessageHeader>We're sorry you selected an incorrect option</MessageHeader>
                            <p>Choose the correct answer to proceed</p>
                        </Message>
                    )}
                </div>
            )}
        </Container>
    );
}

export default Assessment;
