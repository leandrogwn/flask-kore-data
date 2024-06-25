import { Component } from "react";
import TableComponent from "../components/table/TableComponent";

class Usuarios extends Component {

    constructor(props) {
        super(props);

        this.state = {
            usuarios: [
                {
                    "id": 1,
                    "name": "Jaqueline do Nascimento Zimolong",
                    "phone": "45999670209",
                    "username": "jaquezimolong",
                    "email": "jaquezimolong@gmail.com",
                    "password": "12345678"
                }
            ]
        }
    }

    componentDidMount(){
        
    }

    render() {
        return (
            <div>
                <p>Esta é a página Usuários</p>
                <TableComponent data={this.state} />
            </div>
        )
    }
}

export default Usuarios;