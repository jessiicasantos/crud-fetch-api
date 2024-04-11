import GlobalStyle from "./styles/global.js";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:8800/");
      const data = await response.json();

      setUsers(data.sort((a, b) => (a.name >  b.name ? 1 : -1)));
    } catch(error) {
      console.error("Erroooor teesst !@#$¨&*(!!!", error);
      throw toast.error(error);
    }
  }

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <>
      <Container>
        <Title>Usuários</Title>
      </Container>
      <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
      <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
      <ToastContainer autoClose={3000} position={"toast.POSITION.BOTTOM_LEFT"} />
      <GlobalStyle />
    </>
  );
}

export default App;
