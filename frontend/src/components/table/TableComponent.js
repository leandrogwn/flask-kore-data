import Table from 'react-bootstrap/Table';

function TableComponent({ data }) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Username</th>
                    <th>E-mail</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.usuarios.map((user) => {
                        return (
                            <tr>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.phone}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                            </tr>
                        )
                    })
                }

            </tbody>
        </Table >
    )
}

export default TableComponent