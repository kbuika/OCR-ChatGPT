<h1 style="text-align: center; font-weight: 600;">OCR-GPT </h1>
<div style="text-align: center;"><a href="https://app.tusomeni.com">Live site</a></div>
<hr />

An implementation of an OCR to get questions from an image and queries them on GPT-3.5 turbo

## The WHY

I have been maintaining [tusomeni.com](https://tusomeni.com), an exam paper repository for Computing students at The Technocal University of Kenya. Due to Heroku dropping the hobby tier, we lost all our data accumulated over 2 years -- I rant more about it [here](https://kibuika.com/posts/heroku-chronicles).

Because exams were starting for these students, I thought of the quickest thing I could spin up. 

## The why of the WHY

Most of the times, all students care about are the answer explanations to the questions -- I've been there, I know. As sad as this is, it is true.

ChatGPT enters the room -- Unlike Googling, ChatGPT-ing is a very efficient way of getting explanations.

However, the GPT-3.5 turbo model -- the model used by ChatGPT only accepts text as prompts. 
So I thought, how about I introduce an OCR (Optical Character Recognition) library that will extract the text and pass it as a prompt.

This is it.

## Project Prerequisites

- An API that calls GPT-3.5 turbo

- Cloudinary Account -- Where the images are stored 
    This is optional - I only needed to store the images for future reference.
    You can bypass this by just getting the Blob URL of the images and passing that to Tesseract.js (the OCR library)

- Patience -- The virtue, not the girl. This is optional too :)

## How to run

 - Clone the project

 - Make sure you have ``Nodejs, vite`` installed

 - Install packages with ``yarn`` or ``npm`` -- ``npm install`` or ``yarn install``

 - Check the ``.env.example`` file to see all the required environment variables and provide them in a ``.env`` file

 - Run the project ``yarn dev`` or ``npm run dev``


Viola!!