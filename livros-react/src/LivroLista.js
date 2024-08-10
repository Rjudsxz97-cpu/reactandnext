import React, { useEffect, useState } from 'react';
import { ControleLivros } from './controle/ControleLivros';
import { ControleEditora } from './controle/ControleEditora';
import { Table, Button } from 'react-bootstrap';

const controleLivro = new ControleLivros();
const controleEditora = new ControleEditora();

const LinhaLivro = ({ livro, excluir }) => {
    const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);
    return (
        <tr key={livro.codigo}>
            <td>{livro.titulo}</td>
            <td>{livro.resumo}</td>
            <td>{nomeEditora}</td>
            <td>{livro.autores.join(', ')}</td>
            <td>
                <Button variant="danger" onClick={() => excluir(livro.codigo)}>Excluir</Button>
            </td>
        </tr>
    );
};

const LivroLista = () => {
    const [livros, setLivros] = useState([]);
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        if (!carregado) {
            setLivros(controleLivro.obterLivros());
            setCarregado(true);
        }
    }, [carregado]);

    const excluir = (codigo) => {
        controleLivro.excluir(codigo);
        setCarregado(false);
    };

    return (
        <main className="container mt-5">
            <h1 className="mb-4">Catálogo de Livros</h1>
            <Table className="table table-striped table-bordered" variant="dark">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Resumo</th>
                        <th>Editora</th>
                        <th>Autores</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {livros.map(livro => (
                        <LinhaLivro key={livro.codigo} livro={livro} excluir={excluir} />
                    ))}
                </tbody>
            </Table>
        </main>
    );
};

export default LivroLista;
