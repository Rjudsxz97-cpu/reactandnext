import { useEffect, useState } from 'react';
import { LinhaLivro } from '../componentes/LinhaLivro';
import 'bootstrap/dist/css/bootstrap.css';
import { Table, Button } from 'react-bootstrap';
import styles from '../src/app/page.module.css';
import Menu from '../componentes/Menu';
import Head from 'next/head';
import '../src/app/app.css'

interface Livro {
    codigo: number;
    codEditora: number;
    titulo: string;
    resumo: string;
    autores: string[];
}

const baseURL = "http://localhost:3000/api/livros";

export const LivroLista: React.FC = () => {
    const [livros, setLivros] = useState<Livro[]>([]);
    const [carregado, setCarregado] = useState(false);

    console.log(livros);

    const obter = async () => {
        const response = await fetch(baseURL);
        const data: Livro[] = await response.json();
        setLivros(data);
    };

    const excluirLivro = async (codigo: number) => {
        const response = await fetch(`${baseURL}/${codigo}`, {
            method: 'DELETE',
        });
        return response.ok;
    };

    useEffect(() => {
        if (!carregado) {
            obter().then(() => setCarregado(true));
        }
    }, [carregado]);

    const excluir = async (codigo: number) => {
        await excluirLivro(codigo);
        setCarregado(false);
    };

    return (
        <>
            <Head>
                <title>Lista de Livros</title>
            </Head>
            <Menu />
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
                        {livros.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center">Nenhum livro encontrado.</td>
                            </tr>
                        ) : (
                            livros.map((livro) => (
                                <LinhaLivro
                                    key={livro.codigo}
                                    livro={livro}
                                    excluir={() => excluir(livro.codigo)}
                                />
                            ))
                        )}
                    </tbody>
                </Table>
            </main>
        </>
    );
};

export default LivroLista;
