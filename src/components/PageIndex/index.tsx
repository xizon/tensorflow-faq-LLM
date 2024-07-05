import { useEffect } from "react";
const tf = require('@tensorflow/tfjs');

import apiUrl from '../../config/apiUrls';


const PageIndex = () => {


    useEffect(() => {

        //1. Sample dataset
        //================================================
        const questions = [
            "What is TensorFlow?",
            "How to install TensorFlow?",
            "你喜欢足球吗？",
        ];

        const answers = [
            "TensorFlow is an open-source machine learning library.",
            "You can install TensorFlow using pip: pip install tensorflow.",
            "我对足球没有兴趣。"
        ];

        //2. Data preprocessing. Convert text data into numerical data. 
        // Common methods include Bag of Words and Word Embeddings. 
        //================================================
        // Creating a vocabulary
        const vocabulary = new Set();
        questions.forEach(q => q.split(' ').forEach(word => vocabulary.add(word)));
        answers.forEach(a => a.split(' ').forEach(word => vocabulary.add(word)));


        const vocabArray = Array.from(vocabulary);

        function textToVector(text: string) {
            const vector = new Array(vocabArray.length).fill(0);
            text.split(' ').forEach(word => {
                const index = vocabArray.indexOf(word);
                if (index > -1) vector[index] += 1;
            });
            return vector;
        }


        // Convert labels to numeric values
        const questionVectors = questions.map(q => textToVector(q));
        const answerVectors = answers.map(a => textToVector(a));

        console.log(questionVectors);
        /*
        [
            [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ]
        */



        //3. Create a model. Create a simple neural network model to train the FAQ data:
        //================================================

        const model = tf.sequential();
        model.add(tf.layers.dense({ inputShape: [vocabArray.length], units: 10, activation: 'relu' }));
        model.add(tf.layers.dense({ units: vocabArray.length, activation: 'softmax' }));

        model.compile({ loss: 'categoricalCrossentropy', optimizer: 'adam' });

        const questionTensors = tf.tensor2d(questionVectors);
        const answerTensors = tf.tensor2d(answerVectors);

        console.log(questionTensors);
        /*
        {
            "kept": false,
            "isDisposedInternal": false,
            "shape": [
                3,
                20
            ],
            "dtype": "float32",
            "size": 60,
            "strides": [
                20
            ],
            "dataId": {
                "id": 6
            },
            "id": 12,
            "rankType": "2"
        }
        */

        //4. Train the model. Use the prepared data to train the model:
        //================================================
        (async () => {
            await model.fit(questionTensors, answerTensors, { epochs: 100 });
            console.log('Training complete');


            // 5. Save the model
            //================================================
            await model.save(apiUrl.MODEL_SAVE);
            console.log('Model saved to server');


            // 6. Use the model. Once training is complete, you can use the model to make predictions. 
            // You need to convert the user input into a vector and use the model to make predictions:
            //================================================
            const userInput = "how to install TensorFlow";
            const userVector = textToVector(userInput);
            const prediction = model.predict(tf.tensor2d([userVector]));

            prediction.array().then((array: any[]) => {
                const predictedIndex = array[0].indexOf(Math.max(...array[0]));
                console.log('Predicted answer:', answers[predictedIndex]);  // Often it may be "undefined"
            });


        })();



    }, []);


    return (
        <>

            {/*<!-- CORE -->*/}
            
            {/*<!-- /CORE -->*/}

        </>
    );


}



export default PageIndex;


