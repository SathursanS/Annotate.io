
import os
import sys
from flask import Flask, flash, request, redirect, url_for, session
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import logging
import base64
import requests
import pprint
from time import sleep


from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import (Mail, Attachment, FileContent, FileName, FileType, Disposition)



logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')



UPLOAD_FOLDER = 'Upload'
ALLOWED_EXTENSIONS = set(['mp4', 'mp3'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/upload', methods=['POST'])
def fileUpload():
    target=os.path.join(UPLOAD_FOLDER)
    if not os.path.isdir(target):
        os.mkdir(target)
    logger.info("welcome to upload`")
    file = request.files['file'] 
    filename = secure_filename(file.filename)
    destination="/".join([target, filename])
    file.save(destination)
    session['uploadFilePath']=destination
    
    return {'message': filename}

@app.route('/email', methods = ['POST'])
def emailSend():
    toEmail = request.json['toEmail']
    path = request.json['path']
    message = Mail(
        from_email='stockerenghack@gmail.com',
        to_emails=toEmail,
        subject='Sending with Twilio SendGrid is Fun',
        html_content='<strong>and easy to do anywhere, even with Python</strong>')
    with open(f'Upload/{path}', 'rb') as f:
        data = f.read()
        f.close()
    encoded_file = base64.b64encode(data).decode()

    attachedFile = Attachment(
    FileContent(encoded_file),
    FileName('attachment.pdf'),
    FileType('application/pdf'),
    Disposition('attachment')
    )
    message.attachment = attachedFile

    sg = SendGridAPIClient(os.getenv("SENDGRID_API_KEY"))
    response = sg.send(message)
    print(response.status_code)
    print(response.body)
    print(response.headers)
    return {'message': "Email Sent - Powered by Twillio"}

def assemblyAI():
    headers = {
    "authorization": os.getenv("ASSEMBLY_AI_KEY"),
    "content-type": "application/json"
    }
    transcript_endpoint = "https://api.assemblyai.com/v2/transcript"
    upload_endpoint = 'https://api.assemblyai.com/v2/upload'

    def read_file(filename):
        with open(filename, 'rb') as _file:
            while True:
                data = _file.read(5242880)
                if not data:
                    break
                yield data

    upload_response = requests.post(
        upload_endpoint,
        #Replace sys.argv[i] with file name instead
        headers=headers, data=read_file(sys.argv[1])
    )
    print('Audio file uploaded')

    #Call to create transcript from original audio
    transcript_request = {'audio_url': upload_response.json()['upload_url'], "iab_categories": True, "auto_chapters": True}
    transcript_response = requests.post(transcript_endpoint, json=transcript_request, headers=headers)
    print('Transcription Requested')
    pprint.pprint(transcript_response.json())
    polling_response = requests.get(transcript_endpoint+"/"+transcript_response.json()['id'], headers=headers)

    #FILENAME for summarized transcripts
    filename = transcript_response.json()['id'] + '.txt'
    while polling_response.json()['status'] != 'completed':
        sleep(30)
        polling_response = requests.get(transcript_endpoint+"/"+transcript_response.json()['id'], headers=headers)
        print("File is", polling_response.json()['status'])

    with open(filename, 'w') as f:
        f.write( str(polling_response.json()))
    print('Transcript saved to', filename)


    #Might not need whats below this section, paragraphs can be obtained from summary sections
    #Call to split transcript into paragraphs
    paragraph_endpoint = "https://api.assemblyai.com/v2/transcript/%s/paragraphs"%transcript_response.json()['id']

    paragraph_response = requests.get(paragraph_endpoint, headers=headers)
    #print(paragraph_response.json())

    #FILENAME for paragraphs
    filename = transcript_response.json()['id']+"_content" + '.txt'
    with open(filename, 'w') as f:
        for paragraph in paragraph_response.json()['paragraphs']:
            f.write(paragraph['text'])
            f.write("\n")
    print('Transcript saved to', filename)

if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    app.run(debug=True)

# flask_cors.CORS(app, expose_headers='Authorization')