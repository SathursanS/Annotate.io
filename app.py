
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
from pytube import YouTube

import os
from moviepy.editor import *

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import (Mail, Attachment, FileContent, FileName, FileType, Disposition)



logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')



UPLOAD_FOLDER = 'Upload'
ALLOWED_EXTENSIONS = set(['mp4', 'mp3'])

app = Flask(__name__)
CORS(app)
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

    video = VideoFileClip(os.path.join(f'Upload/{filename}'))
    video.audio.write_audiofile(os.path.join(f'Upload/{filename}.mp3'))

    return {'message': f'Upload/{filename}'}
@app.route('/upload/youtube', methods = ['POST'])
def ytMp3():
    link = request.json['link']
    yt = YouTube(link)
    video= yt.streams.first()
    # download the file
    out_file = video.download(output_path='./Upload')
    
    # save the file
    new_file = 'Upload/attachment.mp4'
    os.rename(out_file, new_file)

    video = VideoFileClip(os.path.join(new_file))
    video.audio.write_audiofile(os.path.join(f'Upload/attachment.mp3'))
    return {'message' :'Upload/attachment.mp3'}

@app.route('/email', methods = ['POST'])
def emailSend():
    toEmail = request.json['toEmail']
    message = Mail(
        from_email='sendgridenv@gmail.com ',
        to_emails=toEmail,
        subject='Curated notes :) ',
        html_content='As you requested here it is!')
    with open('output.pdf', 'rb') as f:
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
@app.route('/assemblyAI', methods = ['POST'])
def assemblyAI():
    filename = request.json['filename']
    # youtube = request.json['youtube']

    # if youtube:
    #     os.remove('Upload/attachment.mp4')
# WHEN CREATING THIS ENDPOINT MAKE SURE I REMOVE THE YT VIDEO IE FOR THIS ENDPOINT WE WOULD NEED A YT TRUE AND FALSE STATE IF TRUE REMOVE THE VIDEO  os.remove('Upload/attachment.mp4')
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
        headers=headers, data=read_file(filename)
    )
    print('Audio file uploaded')
    print(upload_response)

    #Call to create transcript from original audio
    transcript_request = {'audio_url': upload_response.json()['upload_url'], "iab_categories": True, "auto_chapters": True}
    transcript_response = requests.post(transcript_endpoint, json=transcript_request, headers=headers)
    print('Transcription Requested')
    pprint.pprint(transcript_response.json())
    polling_response = requests.get(transcript_endpoint+"/"+transcript_response.json()['id'], headers=headers)

    #FILENAME for summarized transcripts
    filename = filename + '.txt'
    while polling_response.json()['status'] != 'completed':
        sleep(30)
        polling_response = requests.get(transcript_endpoint+"/"+transcript_response.json()['id'], headers=headers)
        print("File is", polling_response.json()['status'])

    with open(filename, 'w') as f:
        f.write( str(polling_response.json()))
    print('Transcript saved to', filename)

    return polling_response.json()

    #Might not need whats below this section, paragraphs can be obtained from summary sections
    #Call to split transcript into paragraphs
    # paragraph_endpoint = "https://api.assemblyai.com/v2/transcript/%s/paragraphs"%transcript_response.json()['id']

    # paragraph_response = requests.get(paragraph_endpoint, headers=headers)
    # #print(paragraph_response.json())

    # #FILENAME for paragraphs
    # filename = transcript_response.json()['id']+"_content" + '.txt'
    # with open(filename, 'w') as f:
    #     for paragraph in paragraph_response.json()['paragraphs']:
    #         f.write(paragraph['text'])
    #         f.write("\n")
    # print('Transcript saved to', filename)

if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    CORS(app, expose_headers='Authorization')
    app.run(debug=True)