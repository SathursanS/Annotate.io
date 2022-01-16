# Annotate.io
## Inspiration 💡
With school being remote, and online lectures being prominent. It is sometimes hard making clear and concise notes because profs may have a hard accent you are not used to, or perhaps your audio on your laptop is not the best or even because the house is too loud! What if there was an application that can transcribe your online lectures and summarize as well as point out key concepts! This would improve your study productivity and even promote active learning! Well that's exactly what we wanted to build! Using Assembly AI and Twilio we built a notes assistant to help build concise and elegant study sheets based on your lectures! Our product boosts productivity, as we create interactive study sheets to increase active learning and recall! 

## What it does 🤔
Annotate AI is an education & productivity platform that allows users to create dynamic notes based on lecture content, users are able to submit a .mp4 file or even a YouTube link and get interactive notes! We use Assembly AI to perform topic analysis to summarize content and highlight key topics that are in the material! Users can also email a pdf version of their notes to themselves and also share their notes to others (thanks Twillio!). 

## How we built it 🖥️
When building out Annotate AI, we chose 3 key design principles to help ensure our product meets the design challenge of productivity! Simplicity, Elegance and Scalability.

We wanted Annotate AI to be simple to design, upgrade and debug. This led to us harnessing the lightweight framework of Flask and the magic of Python to design our backend infrastructure. To ensure our platform is scalable and efficient we harnessed Assembly AI  to perform both our topic and summary analysis harnessing its topic-detection and speech API respectively. Using Assembly AI  as our backbone allowed our NLP analysis to be efficient and responsive! We then used various python libraries to create our YouTube and file conversion services, enabling us to integrate into the Assembly AI infrastructure. We then use Twilio to harness the output from Assembly AI to rapidly send pdfs of their notes to our users’ emails!

To create an elegant and user-friendly experience we leveraged React and various design libraries to present our users with a new, productivity focused platform to create dynamic and interactive study notes! React also worked seamlessly with our Flask backend and our third party APIs. This integration also allowed for a concurrent development stream for both our front end and back end teams.

## Challenges we ran into 🔧
One of the first challenges we faced was trying to integrate with Assembly AI, at first we weren’t having much success interfacing with Assembly AI API, however going through their documentation and looking over some sample code they provided we were able to leverage Assembly AI in our project. 

Another issue we initially didn’t anticipate was communicating both backend and frontend services together, due to cross-origin resource policy we initially couldn’t pass information between the two. However we managed to implement CORS which solved the issue.

This year was the first time we decided to use Figma to mock up our UI although tedious it definitely helped the frontend team speed up their development process. The hackathon really challenged our normal development process. We had to make quick decisions and factor the pros and cons of various decisions.

Sleep or technically the lack of sleep, was another challenge we had to overcome. Luckily now that we are done we can get some.

## What we learned 🤓
In this hack we definitely learnt a lot about the development process and bringing the best out of each of our abilities. Figma was a design tool we used for the first time and it definitely helped us with our frontend development and is a skill we will definitely be taking with us for our future careers. We also got greater insights into integrating third-party APIs and http requests. To pass our audio and video files we used ‘formdata’ which had some nuances we never knew.

We also learned the importance of git ignore and managing keys correctly, and how leaking a key can be really annoying to remove :(((

## What's next for Annotate AI 🏃‍♂️
For the future we have many ideas to improve the accessibility and scalability of Annotate AI. A feature we weren’t able to develop currently but are planning to is add image recognition to handle detailed diagrams and drawings.  Diagrams often paint a better picture and improve one's understanding which is something we would want to take advantage of in Annotate AI.  This feature would be a game changer as annotated diagrams based on the video would improve productivity even more!
