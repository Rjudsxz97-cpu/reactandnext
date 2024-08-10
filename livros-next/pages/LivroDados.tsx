import { useState } from 'react';
import { useRouter } from 'next/router';
import { ControleEditora } from '../classes/controle/ControleEditora';
import { Livro } from '../classes/modelo/Livro';
import 'bootstrap/dist/css/bootstrap.css'
import { Container, Form, Button } from 'react-bootstrap';
import styles from '../src/app/page.module.css';
import Head from 'next/head';
import Menu from '../componentes/Menu';

const controleEditora = new ControleEditora();
const baseURL = "http://localhost:3000/api/livros";

const LivroDados: React.FC = () => {
    const [titulo, setTitulo] = useState('');
    const [resumo, setResumo] = useState('');
    const [autores, setAutores] = useState('');
    const [codEditora, setCodEditora] = useState(0);
    const opcoes = controleEditora.getEditoras().map(editora => ({ value: editora.codEditora, text: editora.nome }));

    const router = useRouter();

    const tratarCombo = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCodEditora(Number(e.target.value));
    };

    const incluir = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (codEditora === 0) {
            alert("Escolha a editora.")
        } else {
            const novoLivro = new Livro(0, codEditora, titulo, resumo, autores.split('\n'));
            const response = await fetch(baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoLivro)
            });
            if (response.ok) {
                router.push('/LivroLista');
            }
        }

    };

    return (
        <>
            <Head>
                <title>Dados do Livro</title>
            </Head>
            <Menu />
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
                            {opcoes.map((editora) => (
                                <option key={editora.value} value={editora.value}>{editora.text}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Salvar dados
                    </Button>
                </Form>
            </Container>
        </>
    );
};

export default LivroDados;
