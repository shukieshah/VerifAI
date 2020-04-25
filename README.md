# VerifAI

## Natural Language Fake News Detection

Developed by [Shukan Shah](https://github.com/shukieshah)

VerifAI is a web application that uses natural language processing to verify the authenticity of news articles. It is specifically built to distinguish between human-written fake news and real news. The tool uses the state-of-the-art [BERT](https://arxiv.org/pdf/1810.04805.pdf) language model to classify articles. For more details regarding the NLP research and development behind this project, please refer to the [parent repository](https://github.com/jpyneni3/Fake_News_Detector).

You can view the live version of VerifAI at: https://shukieshah.github.io/VerifAI/

We hope that VerifAI serves as a useful tool for the wider community. Please note that the tool is, by no means, perfect. The tool is not meant for neural fake news detection and sometimes classifies fake news as real. This is due to the wide variance of fake news in the real world that our model was not trained to detect. After all, this is precisely what makes reliable fake news detection such a difficult problem to solve!

## Instructions for running VerifAI in development mode

This repository contains the front-end and server-side development code for the tool. It also contains a Python notebook inspired by [Chris McCormick](https://mccormickml.com/2019/07/22/BERT-fine-tuning/) and the necessary data to train and fine-tune your own BERT model. Due to GitHub file size limits, our final trained model has not been uploaded.

In order to run the Flask server successfully in development, you should train your own model using the code and guidelines in the [BERT_Hybrid notebook](./server/Model-Training/BERT_Hybrid.ipynb). We highly recommend running the notebook on the free GPU provided by [Google Colaboratory](https://colab.research.google.com/notebooks/intro.ipynb#recent=true). All the necessary data is already provided to you in the directory.

Once the model is finished training, upload the saved_model folder to the server directory.

### Front-End

The front-end was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In order to run the front-end application, ensure you have [Node.js](https://nodejs.org/en/) and npm installed.

First, install the node modules:

#### `npm install`

Then, in the project directory, you can run:

#### `npm start`

Runs the front-end app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### Python Flask Server

To run the Flask server (called by the React app), navigate to the server directory and ensure the necessary dependencies are installed via:

#### `pip3 install -r requirements.txt`

Then simply run:

#### `python3 app.py`

*Note: You must have the necessary model files present within the directory.
