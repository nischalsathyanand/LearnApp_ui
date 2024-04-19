import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import {
  GridRow,
  GridColumn,
  Grid,
  Button,
  Header,
  StepTitle,
  StepGroup,
  StepContent,
  Icon,
  Step,
  Menu,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Segment,
  Container
} from "semantic-ui-react";

const Home = () => {
  const [firstButtonCompleted, setFirstButtonCompleted] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/training");
    setFirstButtonCompleted(false);
  };

  return (
    <div>
      <Grid celled>
        <GridRow centered style={{ height: "100vh" }} >
          <GridColumn width={3}>
            <div style={{ textAlign: "center" }}>
              <Header as="h1" style={{ color: "#FB9E05" }}>
                LERAN APP
              </Header>
              <div style={{ marginTop: "5em" }}>
                <StepGroup vertical size="big">
                  <Step active>
                    <Icon  name="home"  />
                    <StepContent>
                      <StepTitle>Home</StepTitle>
                    </StepContent>
                  </Step>

                  <Step>
                    <Icon name="winner" />
                    <StepContent>
                      <StepTitle>LeaderBoard</StepTitle>
                    </StepContent>
                  </Step>
                </StepGroup>
              </div>
              <Button
                size="big"
                style={{
                  marginTop: "2em",
                  color: "white",
                  fontWeight: "bold",
                  backgroundColor: "#FB9E05",
                  border: "2px solid #FB9E05", // Adding border to maintain consistency
                }}
              >
                LOGOUT
              </Button>
            </div>
          </GridColumn>
          <GridColumn width={13} height="100%">
            <Menu style={{ height: "80px", backgroundColor: "#FB9E05", fontSize: "1.2rem", color: "white" }}>
              <Dropdown item text="Languages" size="large" style={{ color: "white" }}>
                <DropdownMenu style={{ fontSize: "1.2rem" }}>
                  <DropdownItem>ENGLISH</DropdownItem>
                  <DropdownItem>SPANISH</DropdownItem>
                  <DropdownItem>FRENCH</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Menu>
            <Container style={{ marginTop: "2em" }}>
              <Segment padded='very' style={{ backgroundColor: "#34ebd8" }}>
                <h2 style={{ textAlign: "center", color: "white" }}>LESSON 1</h2>
              </Segment>
              <div style={{ textAlign: "center", marginTop: '2em' }}>
                <div style={{ marginBottom: "1em" }}>
                  <Button
                    icon='star'
                    size="massive"
                    onClick={handleClick}
                    style={{
                      color: "white",
                      backgroundColor: "#FB9E05",
                      borderRadius: "50%",
                      width: "100px",
                      height: "100px",
                    }}
                  />
                </div>
                <div>
                  <Button
                    icon='star'
                    size="massive"
                    disabled={!firstButtonCompleted} // Disable the second button until the first button is completed
                    style={{
                      color: "white",
                      backgroundColor: firstButtonCompleted ? "#FB9E05" : "#808080", // Change button color based on completion state
                      borderRadius: "50%",
                      width: "100px",
                      height: "100px",
                    }}
                  />
                </div>
              </div>
            </Container>
          </GridColumn>
        </GridRow>
      </Grid>
    </div>
  );
};

export default Home;
