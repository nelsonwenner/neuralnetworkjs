
class RedeNeural{
    constructor(qnt_camada_entrada, qnt_camada_oculta, qnt_camada_saida){
        this.qnt_camada_entrada = qnt_camada_entrada;
        this.qnt_camada_oculta = qnt_camada_oculta;
        this.qnt_camada_saida = qnt_camada_saida;

        this.bias_entra_oculta = new Matrix(this.qnt_camada_oculta, 1);
        this.bias_entra_oculta.randomize();
        this.bias_oculta_saida = new Matrix(this.qnt_camada_saida, 1);
        this.bias_oculta_saida.randomize();

        this.pesos_entrada_oculta = new Matrix(this.qnt_camada_oculta, this.qnt_camada_entrada);
        this.pesos_entrada_oculta.randomize();
        this.pesos_oculta_saida = new Matrix(this.qnt_camada_saida, this.qnt_camada_oculta);
        this.pesos_oculta_saida.randomize();

        this.learning_rate = 0.1;
    }
    
    sigmoid = (x) => {
        return 1 / (1 + Math.exp(-x));
    }

    derivadaSigmoid = (x) => {
        return x * (1 - x);
    }

    train = (array, dados_treino) => {
        /* FEEDFORWARD */

        // CAMADA ENTRADA -> OCULTA
        let input_array = Matrix.arrayToMatrix(array);
        let camada_escondida = Matrix.multiplicarMatrix(this.pesos_entrada_oculta, input_array);
        camada_escondida = Matrix.novaMatrix(camada_escondida, this.bias_entra_oculta);
        camada_escondida.map(this.sigmoid); //Passando o metodo sigmoid, para ser usado no map como função recebendo seu parametro..

        // CAMADA OCULTA -> SAIDA
        let saida =  Matrix.multiplicarMatrix(this.pesos_oculta_saida, camada_escondida);
        saida = Matrix.novaMatrix(saida, this.bias_oculta_saida);
        saida.map(this.sigmoid);

        /* BACKPROPAGATION */

        // CAMADA SAIDA -> OCULTA
        let espectativa_result = Matrix.arrayToMatrix(dados_treino);
        let saida_error = Matrix.subtrairMatrix(espectativa_result, saida);
        let derivada_saida = Matrix.map(saida, this.derivadaSigmoid);
        let transposta_camada_escondida = Matrix.matrixTransposta(camada_escondida);

        let gradiente = Matrix.productHardamard(saida_error, derivada_saida);
        gradiente = Matrix.multiplicaEscalar(gradiente, this.learning_rate);

        // AJUSTAR BIAS CAMADA SAIDA -> OCULTA
        this.bias_oculta_saida = Matrix.novaMatrix(this.bias_oculta_saida, gradiente);
        
        //AJUSTAR PESOS SAIDA -> OCULTA
        let pesos_camada_escondida_saida_delta = Matrix.multiplicarMatrix(gradiente, transposta_camada_escondida);
        this.pesos_oculta_saida = Matrix.novaMatrix(this.pesos_oculta_saida, pesos_camada_escondida_saida_delta);

        // CAMADA OCULTA -> ENTRADA
        let pesos_oculta_saida_transposta = Matrix.matrixTransposta(this.pesos_oculta_saida);
        let oculta_error = Matrix.multiplicarMatrix(pesos_oculta_saida_transposta, saida_error);
        let derivada_oculta = Matrix.map(camada_escondida, this.derivadaSigmoid);
        let entrada_transposta = Matrix.matrixTransposta(input_array);

        let gradiente_oculta = Matrix.productHardamard(derivada_oculta, oculta_error);
        gradiente_oculta = Matrix.multiplicaEscalar(gradiente_oculta, this.learning_rate);

        // AJUSTAR BIAS CAMADA SAIDA -> OCULTA
        this.bias_entra_oculta = Matrix.novaMatrix(this.bias_entra_oculta, gradiente_oculta);

        // AJUSTAR PESOS CAMADA OCULTA -> ENTRADA
        let pesos_oculta_entrada_delta = Matrix.multiplicarMatrix(gradiente_oculta, entrada_transposta);
        this.pesos_entrada_oculta = Matrix.novaMatrix(this.pesos_entrada_oculta, pesos_oculta_entrada_delta);

    }

    executar = (array) => {
        // CAMADA ENTRADA -> OCULTA
        let input_array = Matrix.arrayToMatrix(array);
        let camada_escondida = Matrix.multiplicarMatrix(this.pesos_entrada_oculta, input_array);
        camada_escondida = Matrix.novaMatrix(camada_escondida, this.bias_entra_oculta);
        camada_escondida.map(this.sigmoid); //Passando o metodo sigmoid, para ser usado no map como função recebendo seu parametro..

        // CAMADA OCULTA -> SAIDA
        let saida =  Matrix.multiplicarMatrix(this.pesos_oculta_saida, camada_escondida);
        saida = Matrix.novaMatrix(saida, this.bias_oculta_saida);
        saida.map(this.sigmoid);
        saida = Matrix.matrixToArray(saida);
        return saida;
    }

}
