import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
    width: 100%;
    background: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 800px;
    margin: 20px auto;
    word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;

    @media (max-width: 500px) {
        ${(props) => props.onlyWeb && "display: none"}
    }
`;

export const Td = styled.td`
    padding-top: 15px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width : "auto")};

    @media (max-width: 500px) {
        ${(props) => props.onlyWeb && "display: none"}
    }
`;

const Grid = ({ users, setUsers, setOnEdit }) => {
    const handleEdit = (item) => {
        setOnEdit(item);
    };

    const handleDelete = async (id) => {
        await fetch("http://localhost:8800/" + id, { method: "DELETE" })
        .then(({ data }) => {
            const newArray = users.filter((user) => user.id !== id);

            setUsers(newArray);

            return toast.success("Usuário removido com sucesso!");
        })
        .catch(({ data }) => toast.error(data));

        setOnEdit(null);
    }

    return (
        <Table>
            <Thead>
                <Tr> 
                    <Th>Nome</Th>
                    <Th>E-mail</Th>
                    <Th /* onlyWeb */>Fone</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {users.map((item, i) => (
                    <Tr key={`item-${i}`}>
                        <Td width="30%">
                            {item.name}
                        </Td>
                        <Td width="30%">
                            {item.email}
                        </Td>
                        <Td /* alignCenter */ width="5%">
                            <FaEdit onClick={() => handleEdit(item)} />
                        </Td>
                        <Td /* alignCenter */ width="5%">
                            <FaTrash onClick={() => handleDelete(item.id)} />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
}
 
export default Grid;