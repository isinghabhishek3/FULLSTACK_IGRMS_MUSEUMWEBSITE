import React, { useEffect, useState } from "react";
import axios from "axios";
import styled, { createGlobalStyle } from "styled-components";
import Navbar from "../Navbar";
import Footer from "../Footer";

// Global styles
const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap");

  :root {
    --first-color: hsl(82, 60%, 28%);
    --title-color: hsl(0, 0%, 15%);
    --text-color: hsl(0, 0%, 35%);
    --body-color: hsl(0, 0%, 95%);
    --container-color: hsl(0, 0%, 100%);
    --body-font: "Poppins", sans-serif;
    --h2-font-size: 1.25rem;
    --small-font-size: .813rem;
  }

  @media screen and (min-width: 1120px) {
    :root {
      --h2-font-size: 1.5rem;
      --small-font-size: .875rem;
    }
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    font-family: var(--body-font);
    background-color: var(--body-color);
    color: var(--text-color);
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-inline: 1.5rem;
  padding-block: 5rem;
  min-height: 100vh; /* Ensure the container takes at least full viewport height */
`;

const DropdownContainer = styled.div`
  margin-bottom: 2rem;
  margin-left: 90%;
  margin-right: 5%;

  @media screen and (max-width: 600px) {
    margin-left: 70%;
    margin-right: 5%;
  }

  @media screen and (max-width: 480px) {
    margin-left: 50%;
    margin-right: 5%;
  }

  @media screen and (max-width: 360px) {
    margin-left: 30%;
    margin-right: 5%;
  }

  @media screen and (max-width: 300px) {
    margin-left: 10%;
    margin-right: 5%;
  }
`;

const Dropdown = styled.select`
  padding: 0.5rem;
  font-size: var(--small-font-size);
  border-radius: 0.5rem;
  border: 1px solid var(--text-color);

  @media screen and (max-width: 300px) {
    padding: 0.4rem;
    font-size: 0.7rem;
  }
`;

const CardContainer = styled.div`
  display: grid;
  row-gap: 3.5rem;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 1.5rem;
  }

  @media screen and (min-width: 1120px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 768px) {
    row-gap: 2rem;
  }
`;

const CardArticle = styled.article`
  position: relative;
  overflow: hidden;

  &:hover .card__data {
    animation: show-data 1s forwards;
    opacity: 1;
    transition: opacity 0.3s;
  }

  &:hover {
    animation: remove-overflow 2s forwards;
  }

  &:not(:hover) {
    animation: show-overflow 2s forwards;
  }

  &:not(:hover) .card__data {
    animation: remove-data 1s forwards;
  }

  @keyframes show-data {
    50% {
      transform: translateY(-10rem);
    }
    100% {
      transform: translateY(-7rem);
    }
  }

  @keyframes remove-overflow {
    to {
      overflow: initial;
    }
  }

  @keyframes remove-data {
    0% {
      transform: translateY(-7rem);
    }
    50% {
      transform: translateY(-10rem);
    }
    100% {
      transform: translateY(0.5rem);
    }
  }

  @keyframes show-overflow {
    0% {
      overflow: initial;
      pointer-events: none;
    }
    50% {
      overflow: hidden;
    }
  }
`;

const CardImg = styled.img`
  width: 328px;
  border-radius: 1.5rem;

  @media screen and (min-width: 1120px) {
    width: 348px;
    height: 244px;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    height: auto;
  }

  @media screen and (max-width: 300px) {
    width: 90%;
    height: auto;
    border-radius: 1rem;
  }
`;

const CardData = styled.div`
  width: 280px;
  background-color: var(--container-color);
  padding: 1.5rem 2rem;
  box-shadow: 0 8px 24px hsla(0, 0%, 0%, 0.15);
  border-radius: 1rem;
  position: absolute;
  bottom: -9rem;
  left: 0;
  right: 0;
  margin-inline: auto;
  opacity: 0;
  transition: opacity 1s 1s;

  @media screen and (max-width: 340px) {
    width: 250px;
    padding: 1rem;
  }

  @media screen and (min-width: 1120px) {
    width: 316px;
    padding-inline: 2.5rem;
  }

  @media screen and (max-width: 300px) {
    width: 230px;
    padding: 0.8rem;
  }
`;

const CardDescription = styled.span`
  display: block;
  font-size: var(--small-font-size);
  margin-bottom: 0.25rem;

  @media screen and (max-width: 300px) {
    font-size: 0.7rem;
  }
`;

const CardTitle = styled.h2`
  font-size: var(--h2-font-size);
  font-weight: 500;
  color: var(--title-color);
  margin-bottom: 0.75rem;

  @media screen and (max-width: 300px) {
    font-size: 1rem;
  }
`;

const CardButton = styled.a`
  text-decoration: none;
  font-size: var(--small-font-size);
  font-weight: 500;
  color: var(--first-color);

  &:hover {
    text-decoration: underline;
  }

  @media screen and (max-width: 300px) {
    font-size: 0.7rem;
  }
`;

// Styled component for the loading spinner
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: black; /* Black background */
`;

const LoadingSpinner = styled.div`
  border: 8px solid #fff; /* White border */
  border-top: 8px solid #000; /* Black spinner */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Gallery = () => {
  const [stuffs, setStuffs] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/stuffs");
        setStuffs(response.data.stuffs);

        const uniqueStates = [
          ...new Set(response.data.stuffs.map((stuff) => stuff.state)),
        ];
        setStates(uniqueStates);

        // Set loading to false after 1 second
        setTimeout(() => setLoading(false), 1000);
      } catch (error) {
        console.error("Error fetching stuffs:", error.message);
        setLoading(false); // Ensure loading is false even if there's an error
      }
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    const fetchStuffs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/stuffs${
            selectedState === "All" ? "" : `/${selectedState}`
          }`
        );
        setStuffs(response.data.stuffs);
      } catch (error) {
        console.error("Error fetching stuffs:", error.message);
      }
    };

    fetchStuffs();
  }, [selectedState]);

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  return (
    <>
      <Navbar />
      <GlobalStyle />
      {loading ? (
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      ) : (
        <Container
          style={{
            background:
              "linear-gradient(to right, rgb(0 0 0), rgb(0 0 0 / 79%), rgb(0 0 0))",
            width: "100%",
            marginLeft: "0%",
          }}
        >
          <DropdownContainer>
            <Dropdown value={selectedState} onChange={handleStateChange}>
              <option value="All">All</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </Dropdown>
          </DropdownContainer>
          <CardContainer>
            {stuffs.length === 0 ? (
              <p>No items available</p>
            ) : (
              stuffs.map((stuff) => (
                <CardArticle key={stuff._id}>
                  <CardImg src={stuff.imageSrc} alt={stuff.name} />
                  <CardData className="card__data">
                    <CardDescription>{stuff.state}</CardDescription>
                    <CardTitle>{stuff.name}</CardTitle>
                    <CardButton href={`/data/${stuff._id}`}>Read more</CardButton>
                  </CardData>
                </CardArticle>
              ))
            )}
          </CardContainer>
        </Container>
      )}
      <Footer />
    </>
  );
};

export default Gallery;
