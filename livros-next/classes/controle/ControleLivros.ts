import { Livro } from "../modelo/Livro";

const livros: Array<Livro> = [
    { codigo: 1, codEditora: 1, titulo: "Livro 1", resumo: "Resumo do livro 1", autores: ["Autor 1", "Autor 2"] },
    { codigo: 2, codEditora: 2, titulo: "Livro 2", resumo: "Resumo do livro 2", autores: ["Autor 3"] },
    { codigo: 3, codEditora: 3, titulo: "Livro 3", resumo: "Resumo do livro 3", autores: ["Autor 4", "Autor 5"] },
];

export class ControleLivro {
    obterLivros(): Livro[] {
        return [...livros]; // Retorna uma cópia do array para garantir imutabilidade
    }

    incluir(livro: Livro): void {
        livro.codigo = livros.length ? Math.max(...livros.map(l => l.codigo)) + 1 : 1;
        livros.push({ ...livro }); // Adiciona uma cópia do livro para evitar mutações acidentais
    }

    excluir(codigo: number): boolean {
        const index = livros.findIndex(l => l.codigo === codigo);
        if (index >= 0) {
            livros.splice(index, 1);
            return true; // Indica que a exclusão foi bem-sucedida
        }
        return false; // Indica que o livro com o código fornecido não foi encontrado
    }
}
