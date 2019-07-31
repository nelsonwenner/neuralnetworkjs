let train = true;

function setup() {
    createCanvas(2000, 2000);
    background(0);

    let rn = new RedeNeural(2, 3, 1);

    // XOR Problem
    dataset = {
        inputs:
            [[1, 1],
            [1, 0],
            [0, 1],
            [0, 0]],
        outputs:
            [[0],
            [1],
            [1],
            [0]]
    }

    while (train == true) {
        for (var i = 0; i < 10000; i++) {
            var index = floor(random(4));
            rn.train(dataset.inputs[index], dataset.outputs[index]);
        }
        if (rn.executar([0, 0])[0] < 0.04 && rn.executar([1, 0])[0] > 0.98) {
            train = false;
            console.log("terminou");
        }
    }

    let result = rn.executar([0, 1]);
    console.table("Saida: ", result);
    console.log("Resultado: ", result > 0.5 ? 1: 0);
    
}

function draw(){

}