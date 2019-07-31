
class Matrix{
    constructor(linha, coluna){
        this.linha = linha;
        this.coluna = coluna;
        this.array = [];
        this.construirMatrix();
    }

    construirMatrix = () => {
        for (let i=0; i < this.linha; i++){
            let dados = [];
            for (let j=0; j < this.coluna; j++){
                dados.push(Math.floor(Math.random() * 10));
            }
            this.array.push(dados);
        }
    }

    /* Sobreescrevendo o map, o mesmo recebe uma função, e retorna um objeto tipo Matrix */
    map = (funcao) => {
        this.array = this.array.map((return_array, indice_i) => {
            return return_array.map((return_elemento, indice_j) => {
                return funcao(return_elemento, indice_i, indice_j);
            });
        });
        return this;
    }

    randomize = () => {
        this.map((elemento, indice_i, indice_j) => {
            return Math.random() * 2 - 1;
        });
    }

    print = () => {
        console.table(this.array);
    }

                        /* OPERAÇÕES STATICAS  */

    static matrixTransposta = (matrix_a) => {
        let matrix = new Matrix(matrix_a.coluna, matrix_a.linha);

        matrix.map((elemento, indice_i, indice_j) => {
            return matrix_a.array[indice_j][indice_i];
        });
        return matrix;
    }

    static subtrairMatrix = (matrix_a , matrix_b) => {
        let matrix = new Matrix(matrix_a.linha, matrix_a.coluna);

        matrix.map((elemento, indice_i, indice_j) => {
            return matrix_a.array[indice_i][indice_j] - matrix_b.array[indice_i][indice_j];
        });
        return matrix;
    }

    static multiplicaEscalar = (matrix_a , escalar) => {
        let matrix = new Matrix(matrix_a.linha, matrix_a.coluna);

        matrix.map((elemento, indice_i, indice_j) => {
            return matrix_a.array[indice_i][indice_j] * escalar;
        });
        return matrix;
    }

    static productHardamard = (matrix_a , matrix_b) => {
        let matrix = new Matrix(matrix_a.linha, matrix_a.coluna);

        matrix.map((elemento, indice_i, indice_j) => {
            return matrix_a.array[indice_i][indice_j] * matrix_b.array[indice_i][indice_j];
        });
        return matrix;
    }

    /* retorna uma nova matrix, com elementos somados, de duas matrix. */
    static novaMatrix = (matrix_a , matrix_b) => {
        let matrix = new Matrix(matrix_a.linha, matrix_a.coluna);

        matrix.map((elemento, indice_i, indice_j) => {
            return matrix_a.array[indice_i][indice_j] + matrix_b.array[indice_i][indice_j];
        });
        return matrix;
    }

    static multiplicarMatrix = (matrix_a, matrix_b) => {
        let matrix = new Matrix(matrix_a.linha, matrix_b.coluna);

        matrix.map((elemento, indice_i, indice_j) => {
            let soma = 0;
            for (let i=0; i < matrix_a.coluna; i++){
                let elemento1 = matrix_a.array[indice_i][i];
                let elemento2 = matrix_b.array[i][indice_j];
                soma += elemento1 * elemento2;
            }
            return soma;
        });
        return matrix;
    }

    /* O tamanho da array, sera a quantidade de linhas na matrix, e no caso será sempre 
    1 coluna, e retonar um obj, então esse metodo transforma uma array em um objeto. */
    static arrayToMatrix = (array) => {
        let matrix = new Matrix(array.length, 1);
        matrix.map((elemento, indice_i, indice_j) => {
            return array[indice_i];
        }); 
        return matrix;
    }

    static matrixToArray = (obj) => {
        let array = [];
        obj.map((elemento, indice_i, indice_j) => {
            array.push(elemento);
        });
        return array;
    }

    static map = (matrix_referencia, funcao) => {
        let matrix = new Matrix(matrix_referencia.linha, matrix_referencia.coluna);
        
        matrix.array = matrix_referencia.array.map((return_array, indice_i) => {
            return return_array.map((return_elemento, indice_j) => {
                return funcao(return_elemento, indice_i, indice_j);
            });
        });
        return matrix;
    }
}

/*  
    
    Class onde constroi uma matrix, no caso como atributo temos uma array,
    que recebera outra array com dados, atravez da function construirMatrix.
    No proprio construtor chamamos o metodo, dentro do metodo, damos dois for
    e o primeiro dele é com o loop atravez da linha, logo em seguida com outro
    loop atravez da coluna, no ultimo loop agente itera uma variavel de nome dados
    que é um vetor, que recebe os valores atravez do loop. Quando termina esse ultimo
    for abaixo pegamos a arrey principal que esta como atributo, e damos um push com 
    a array dados que contem valores adicionados pelo ultimo loop, e assim ira se 
    repetindo até que a quantidade de linhas sejá satisfeita.

    map no caso é sobreescrito, onde pega o atributo array do objeto, que
    recebera outra array, porem modificada quando for usar o map. Primeiro
    usamos o map normal no atributo array, no caso ele sempre retorna 3 
    coisas, uma array e o indice do elemento. Lembrando que estamos percorrendo
    uma matrix, então no primeiro loop iremos retornar uma array, já no segundo 
    poderemos acessar e retornar um elemento, isso é nada mais nada menos, que 
    um for comum, porém mais eficiente. Ao final, agente usa o paramentro que
    no caso é uma função que ele ira receber, e podera utilizar os valores
    do return_elemento, indice_i, indice_j. Portanto o map, sera capaz que 
    percorrer uma matriz e acessar seus elemento, e retornar um objeto matrix
    modificado ao seu criterio.


*/



