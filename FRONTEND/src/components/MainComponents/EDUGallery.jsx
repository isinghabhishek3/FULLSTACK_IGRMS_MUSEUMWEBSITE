import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled, { createGlobalStyle } from "styled-components";
import AdminNavbar from "./AdminNavbar";
import Footer from "../MainComponents/AdminFooter";

// Global styles
const GlobalStyle = createGlobalStyle`
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

  *{
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
  min-height: 100vh;

  @media screen and (max-width: 340px) {
    margin-inline: 1rem;
  }

  @media screen and (min-width: 1120px) {
    min-height: 100vh;
  }
`;

const DropdownContainer = styled.div`
  margin-bottom: 2rem;
  margin-left: 90%;
  margin-right: 5%;
`;

const Dropdown = styled.select`
  padding: 0.5rem;
  font-size: var(--small-font-size);
  border-radius: 0.5rem;
  border: 1px solid var(--text-color);
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
`;

const CardDescription = styled.span`
  display: block;
  font-size: var(--small-font-size);
  margin-bottom: 0.25rem;
`;

const CardTitle = styled.h2`
  font-size: var(--h2-font-size);
  font-weight: 500;
  color: var(--title-color);
  margin-bottom: 0.75rem;
`;

const CardButton = styled.a`
  text-decoration: none;
  font-size: var(--small-font-size);
  font-weight: 500;
  color: var(--first-color);

  &:hover {
    text-decoration: underline;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
`;

const Icon = styled.i`
  cursor: pointer;
  color: var(--first-color);
  transition: color 0.3s;

  &:hover {
    color: var(--title-color);
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

// Styled component for the loading spinner
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


const EDUGallery = () => {
  const history = useNavigate(); // Initialize useNavigate
  const [stuffs, setStuffs] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("All");
  const [loading, setLoading] = useState(true); // State to handle loading

  const UserId = localStorage.getItem("userId");

  const handleEdit = (id) => {
    console.log(`Edit item with id: ${id}`);
    localStorage.setItem("selectedItemId", id); // Save the selected ID to local storage
    console.log(
      "selectedItemId in localStorage:",
      localStorage.getItem("selectedItemId")
    );
    history(`/editData/${UserId}`); // Navigate to the edit page
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/stuffs");
        setStuffs(response.data.stuffs);

        const uniqueStates = [
          ...new Set(response.data.stuffs.map((stuff) => stuff.state)),
        ];
        setStates(uniqueStates);
      } catch (error) {
        console.error("Error fetching stuffs:", error.message);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
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

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/stuffs/stuffstodelete/${id}`
      );
      if (response.data.success) {
        setStuffs(stuffs.filter((stuff) => stuff._id !== id)); // Remove the deleted item from the state
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting stuff:", error.message);
    }
  };

  return (
    <>
      <AdminNavbar />
      <GlobalStyle />
      {loading ? (
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      ) : (
        <Container
          style={{
            background: "linear-gradient(to right, rgb(0 0 0), rgb(0 0 0 / 79%), rgb(0 0 0))",
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
              <p>No stuff found</p>
            ) : (
              stuffs.map((stuff) => (
                <CardArticle key={stuff._id}>
                  <CardImg src={stuff.imageSrc} alt={stuff.name} />
                  <CardData className="card__data">
                    <CardDescription>{stuff.state}</CardDescription>
                    <CardTitle>{stuff.name}</CardTitle>
                    {/* <CardButton href={stuff.videoSrc}>Watch Video</CardButton> */}
                    <IconContainer>
                      <Icon
                        style={{ fontSize: "20px" }}
                        className="fas fa-edit"
                        onClick={() => handleEdit(stuff._id)}
                      ></Icon>
                      <Icon
                        style={{ fontSize: "20px" }}
                        className="fas fa-trash-alt"
                        onClick={() => handleDelete(stuff._id)}
                      ></Icon>
                    </IconContainer>
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

export default EDUGallery;
