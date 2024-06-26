import { Component } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


class Usuarios extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            name: '',
            phone: '',
            username: '',
            email: '',
            password: '',
            usuarios: [],
            modalUsuario: false
        }
    }

    componentDidMount() {
        this.buscarUsuario();
    }

    buscarUsuario = () => {
        fetch("http://localhost:4000/api/usuarios")
            .then(resposta => resposta.json()).then(dados => {
                this.setState({ usuarios: dados })

            })
    }

    deletarUsuario = (id) => {
        fetch("http://localhost:4000/api/usuarios/" + id, { method: 'DELETE' })
            .then(resposta => {
                if (resposta.ok) {
                    this.buscarUsuario()
                }
            })
    }

    editarUsuario = (id) => {
        fetch("http://localhost:4000/api/usuarios/" + id, { method: 'GET' })
            .then(resposta => resposta.json())
            .then(usuario => {
                this.setState({
                    id: usuario.user.id,
                    name: usuario.user.name,
                    phone: usuario.user.phone,
                    username: usuario.user.username,
                    email: usuario.user.email,
                    password: usuario.user.password
                })
                this.abrirModal();
            })
    }

    cadastraUsuario = (usuario) => {
        fetch("http://localhost:4000/api/usuarios", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario)
        })
            .then(resposta => {
                if (resposta.ok) {
                    this.buscarUsuario();
                } else {
                    alert('Não foi possível inserir o usuário!');
                }
            })
    }

    atualizarUsuario = (usuario) => {
        fetch("http://localhost:4000/api/usuarios/" + usuario.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario)

        })
            .then(resposta => {
                if (resposta.ok) {
                    this.buscarUsuario();
                } else {
                    alert('Não foi possível atualizar o usuário!');
                }
            })
    }

    atualizaNome = (e) => {
        this.setState({ name: e.target.value })
    }

    atualizaPhone = (e) => {
        this.setState({ phone: e.target.value })
    }

    atualizaEmail = (e) => {
        this.setState({ email: e.target.value })
    }

    atualizaUsername = (e) => {
        this.setState({ username: e.target.value })
    }

    atualizaPassword = (e) => {
        this.setState({ password: e.target.value })
    }

    submit = () => {

        if (this.state.id == 0) {
            const usuario = {
                name: this.state.name,
                phone: this.state.phone,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }
            this.cadastraUsuario(usuario);
        } else {
            const usuario = {
                id: this.state.id,
                name: this.state.name,
                phone: this.state.phone,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }
            this.atualizarUsuario(usuario);

        }
        this.fecharModal();
    }

    reset = () => {
        this.setState({
            id: 0,
            name: "",
            phone: "",
            email: "",
            username: "",
            password: ""
        })
    }

    fecharModal = () => {
        this.reset();
        this.setState({ modalUsuario: false })
    }
    abrirModal = () => {
        this.setState({ modalUsuario: true })
    }

    render() {
        return (
            <div>
                <h4>Usuários cadastrados</h4>
                <div className="btn-new-user">
                    <Button variant="primary" type="submit" onClick={this.abrirModal}>
                        Novo usuario
                    </Button>
                </div>

                <Modal show={this.state.modalUsuario} onHide={this.fecharModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cadastro de usuário</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" placeholder="Informe seu nome" value={this.state.name} onChange={this.atualizaNome} />
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control type="text" placeholder="Informe seu telefone" value={this.state.phone} onChange={this.atualizaPhone} />

                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control type="email" placeholder="Informe seu e-mail" value={this.state.email} onChange={this.atualizaEmail} />
                                <Form.Label>Nome de usuário</Form.Label>
                                <Form.Control type="text" placeholder="Informe seu nome de usuário" value={this.state.username} onChange={this.atualizaUsername} />
                                <Form.Label>Senha</Form.Label>
                                <Form.Control type="password" placeholder="Informe sua senha" value={this.state.password} onChange={this.atualizaPassword} />
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.fecharModal}>
                            Fechar
                        </Button>
                        <Button variant="primary" type="submit" onClick={this.submit}>
                            Salvar
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th>Username</th>
                            <th>E-mail</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.usuarios.map((user) => {
                                return (
                                    <tr>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td className="btn-action">
                                            <Button variant="primary" onClick={() => this.editarUsuario(user.id)}>Editar</Button>
                                            <Button variant="danger" onClick={() => this.deletarUsuario(user.id)}>Excluir</Button>

                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </Table >

            </div >
        )
    }
}

export default Usuarios;