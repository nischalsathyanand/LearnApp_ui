import React, { useState, useEffect } from 'react';
import { Header, Image, Progress, Menu, Button, Container } from 'semantic-ui-react';
import Training from './Training';
import Assessment from './Assessment';
import { useNavigate } from "react-router-dom";
import Confetti from 'react-confetti'

function TrainingAndLearningContainer() {
    const question_key_order = ["boy", "bridge","car","girl", "tree"];
    const PART_SIZE = 2; // This can be changed to any number as per your requirement
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTraining, setIsTraining] = useState(true);
    const [progressPercent, setProgressPercent] = useState(10);
  
    const navigate = useNavigate();

    const handleQuit = () => {
        navigate("/home");
    };

    const handleNext = () => {
        setIsTraining(!isTraining);
        if (!isTraining) {
            if (currentIndex + PART_SIZE < question_key_order.length) {
                setCurrentIndex(currentIndex + PART_SIZE);
                setProgressPercent((currentIndex + PART_SIZE) / question_key_order.length * 100);
            } else {
                setCurrentIndex(0);
                setProgressPercent(100);
            }
        }
    };

    useEffect(() => {
        if (progressPercent === 100) {
            setTimeout(() => {
                navigate("/home");
            }, 4000); // Delay of 2 seconds
        }
    }, [progressPercent]);

  
    const currentPart = question_key_order.slice(currentIndex, currentIndex + PART_SIZE);
  
    return (
      <div>
       <Container style={{ marginTop: '50px' }}>
          <Progress percent={progressPercent} indicating />
          {progressPercent < 100 ? (
            isTraining ? (
              <Training
                question_key_order={currentPart}
                handleNext={handleNext}
              />
            ) : (
              <Assessment
                question_key_order={currentPart}
                handleNext={handleNext}
              />
            )
          ) : (
            <div>
              <Header as="h2">Congratulations! You have completed all parts.</Header>
              <Confetti />
            </div>
          )}
        </Container>
      </div>
    );
  }
  
export default TrainingAndLearningContainer
