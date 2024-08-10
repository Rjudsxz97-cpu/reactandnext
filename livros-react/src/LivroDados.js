import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ControleLivros } from './controle/ControleLivros';
import { ControleEditora } from './controle/ControleEditora';
import { Container, Form, Button } from 'react-bootstrap';

const controleLivro = new ControleLivros();
const controleEditora = new ControleEditora();

const LivroDados = () => {
    const [titulo, setTitulo] = useState("");
    const [resumo, setResumo] = useState("");
    const [codEditora, setCodEditora] = useState(0);
    const [autores, setAutores] = useState("");
    const navigate = useNavigate();

    const tratarCombo = (event) => {
        setCodEditora(Number(event.target.value));
    };

    const incluir = (event) => {
        event.preventDefault();
        const livro = {
            codigo: 0,
            titulo,
            resumo,
            codEditora,
            autores: autores.split('\n')
        };
        controleLivro.incluir(livro);
        navigate("/"); 
    };

    const opcoes = controleEditora.getEditoras().map(e => (
        <option key={e.codEditora} value={e.codEditora}>{e.nome}</option>
    ));

    return (
        <Container>
            <h1 className="my-4">Dados do Livro</h1>
            <Form onSubmit={incluir}>
                <Form.Group controlId="formTitulo" className="mb-3">
                    <Form.Label>Título</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={titulo} 
                        onChange={(e) => setTitulo(e.target.value)} 
                        placeholder="Digite o título do livro" 
                    />
                </Form.Group>
                <Form.Group controlId="formResumo" className="mb-3">
                    <Form.Label>Resumo</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={resumo} 
                        onChange={(e) => setResumo(e.target.value)} 
                        placeholder="Digite um resumo do livro" 
                    />
                </Form.Group>
                <Form.Group controlId="formAutores" className="mb-3">
                    <Form.Label>Autores</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        value={autores} 
                        onChange={(e) => setAutores(e.target.value)} 
                        placeholder="Digite os autores, um por linha" 
                    />
                </Form.Group>
                <Form.Group controlId="formEditora" className="mb-3">
                    <Form.Label>Editora</Form.Label>
                    <Form.Control as="select" value={codEditora} onChange={tratarCombo}>
                        {opcoes}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Salvar dados
                </Button>
            </Form>
        </Container>
    );
};

export default LivroDados;
