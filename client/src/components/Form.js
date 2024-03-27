import { useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius 5px;
    height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
`;

const formatDateToYYYYMMDD = (date) => {
    // Getting date components
    var day = date.getDate();
    var month = date.getMonth() + 1; // Remember that months start from zero
    var year = date.getFullYear();

    // Adding leading zero if day or month is less than 10
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    // Desired format: mm/dd/yyyy
    var formattedDate = year + '-' + month + '-' + day;
    
    return formattedDate;
}

// // Example of usage
// var currentDate = new Date();
// formattedDate = formatDateToYYYYMMDD(currentDate);

const Form = ({ getUsers, onEdit, setOnEdit }) => {
    const ref = useRef();

    if(onEdit) {
        const user = ref.current;

            if (onEdit.date_birth) { // Verify if onEdit.date_birth is defined
                const userDate_birth = new Date(onEdit.date_birth);
                const formattedDate = formatDateToYYYYMMDD(userDate_birth);

                user.date_birth.value = formattedDate;
                console.log("user formatted Date: " + user.date_birth.value);
            }

            user.name.value = onEdit.name;
            user.email.value = onEdit.email;
            user.phone.value = onEdit.phone;
    }


    const handleSubmit = async (e) => {
        e.preventDefault(); 

        const user = ref.current;

        if(
            !user.name.value ||
            !user.email.value ||
            !user.phone.value ||
            !user.date_birth.value
        ) {
            return toast.warn("Preencha todos os campos!");
        }

        if(onEdit) {
            const user = ref.current;
            
            try {
                if(onEdit.date_birth) {
                    let userDate_birth = new Date(user.date_birth.value);
                    let formattedDate = formatDateToYYYYMMDD(userDate_birth);

                    let requestOptions = {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(
                            {
                                name: user.name.value,
                                email: user.email.value,
                                phone: user.phone.value,
                                date_birth: formattedDate
                            }
                        )
                    }

                    console.log(requestOptions);

                    console.log(onEdit.id);

                    let response = await fetch(`http://localhost:8800/${onEdit.id}`, requestOptions);
                    
                    let data = await response.json();

                    toast.success(data);
                }
            } catch(error) {
                console.error("Errooo!!! !@#$% \n", error);
                toast.error(error);
            }
        }

        setOnEdit(null);
        getUsers();
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nome</Label>
                <Input name="name" />
            </InputArea>
            <InputArea>
                <Label>E-mail</Label>
                <Input name="email" type="email" />
            </InputArea>
            <InputArea>
                <Label>Telefone</Label>
                <Input name="phone" />
            </InputArea>
            <InputArea>
                <Label>Data de Nascimento</Label>
                <Input name="date_birth" type="date" />
            </InputArea>

            <Button type="submit">Salvar </Button>
        </FormContainer>
    );
}
 
export default Form;