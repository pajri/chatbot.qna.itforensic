# Chatbot QnA IT Forensic

## Run App
Choose one of mode that you want to run. Run Command Line for interaction with chatbot in CLI. Run Whatsapp for interaction with chatbot in WhatsApp.

### Run Command Line
1.	Uncomment function `run()` in `history.js`.
    
    ![alt](md_images/uncomment%20run.png)

2.	Run this command
    ```bash
    node history.js
    ```

### Run Whatsapp
1.	Comment function `run` in `history.js`

    ![alt](md_images/comment%20run.png)

2.	Run this command
    ```
    node main.js
    ```

## Prompt Engineering
The prompt design is available here: [data/rule.txt](data/rule.txt)

## About ChatBot
The chatbot is designed to provide a Q&A experience focused on IT Forensics. It strictly refers to the content of the article provided in the data folder. If a question cannot be answered based on the provided article, the chatbot will tell that it does not have the answer even though it may have its own general knowledge about IT Forensics.

Currently, the chatbot uses "Definition and Basic Concepts (en)" from Sir Onno’s Wiki (https://onnocenter.or.id/wiki/index.php/Definition_and_Basic_Concepts_(en)) as its reference. This means it will only answer questions related to the basic definitions and concepts of IT Forensics. It will not answer questions about advanced techniques or in-depth forensic practices.

The chatbot is currently limited to a single article for faster testing and development. But it can be expanded its knowledge base by adding more articles to the data folder. 

![alt](md_images/data%20folder.png)

![alt](md_images/get%20data.png)

## Experiment
![alt](md_images/say%20hi.png)

1. Normal flow. Asking question which answer is available in the article.
   
    Case 1
    ![alt](md_images/normal%20flow%201.png)

    ![alt](md_images/normal%20flow%201%20proof.png)

    Case 2
    ![alt](md_images/normal%20flow%202.png)
    
    ![alt](md_images/normal%20flow%202%20proof.png)

2. Ask question about IT Forensic but the answer is not available in the article.
   <br/> This type of question will be answered with recommendation
    ![alt](md_images/about%20it%20forensic.png)

3. Ask question not about IT Forensic.
   <br/> This type of question will be answered with message that the chatbot can only answer question about IT Forensics
    ![alt](md_images/not%20about%20it%20forensic.png)
