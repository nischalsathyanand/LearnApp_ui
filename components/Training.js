import React, { useState, useEffect } from "react";
import { Container, Header, Image, Button, Card, Transition, Message, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

function Training({ question_key_order, handleNext }) {
  const [trainingMaterial, setTrainingMaterial] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [audioPlaying, setAudioPlaying] = useState(false); // State to track audio playback

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const trainingData = [];
        for (const object of question_key_order) {
          const response = await fetch(`http://localhost:3000/api/getObjectDetails?object=${object}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          // Add the 'object' property to the data before pushing it
          data.object = object;
          trainingData.push(data);
        }
        setTrainingMaterial(trainingData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [question_key_order]); // Empty dependency array to ensure useEffect runs only once on component mount

  const navigate = useNavigate();
  const handleTrainingNext = () => {
    if (currentIndex < trainingMaterial.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleNext();
    }
  };

  const handlePlayAudio = () => {
    const audioElement = document.getElementById("trainingAudio");
    if (audioElement.paused) {
      audioElement.play();
      setAudioPlaying(true);
    } else {
      audioElement.pause();
      setAudioPlaying(false);
    }
  };

  useEffect(() => {
    const audioElement = document.getElementById("trainingAudio");
    if (audioElement && !audioElement.paused) {
      setAudioPlaying(true);
    }
  }, [currentIndex]); // Run this effect whenever currentIndex changes

  useEffect(() => {
    const audioElement = document.getElementById("trainingAudio");
    if (audioElement && audioElement.paused && audioPlaying) {
      audioElement.play();
    }
  }, [audioPlaying]); // Run this effect whenever audioPlaying changes

  return (
    <Container textAlign="center">
      {loading && <Icon loading name='spinner' />}
      {error && <Message negative>{error}</Message>}
      {trainingMaterial.length > 0 && currentIndex < trainingMaterial.length && !loading && !error && (
        <div>
          <Header style={{ textTransform: "uppercase" }}>
            {trainingMaterial[currentIndex].object}
          </Header>
          <Card centered>
            <Transition animation='drop' duration='500' visible={true}>
              <Image bordered src={`http://localhost:3000${trainingMaterial[currentIndex].randomImageUrl}`} />
            </Transition>
          </Card>
          <audio id="trainingAudio" src={`http://localhost:3000${trainingMaterial[currentIndex].audioUrl}`} autoPlay />
          <Button circular icon={audioPlaying ? "pause" : "play"} onClick={handlePlayAudio} primary style={{ margin: '1em', fontSize: '2em' }} />
          <div>
            <Button size="huge" onClick={handleTrainingNext} primary>Next</Button>
          </div>
        </div>
      )}
    </Container>
  );
}

export default Training;
