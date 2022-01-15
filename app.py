
import os
from flask import Flask, flash, request, redirect, url_for, session
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import logging

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail



logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')



UPLOAD_FOLDER = 'Delta Hacks'
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
    

    message = Mail(
        from_email='emailsendingpdf@gmail.com',
        to_emails='emailsendingpdf@gmail.com',
        subject='Sending with Twilio SendGrid is Fun',
        html_content='<strong>and easy to do anywhere, even with Python</strong>')

    sg = SendGridAPIClient('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')
    response = sg.send(message)
    print(response.status_code)
    print(response.body)
    print(response.headers)
  
    return {'message': "Test"}

if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    app.run(debug=True)

# flask_cors.CORS(app, expose_headers='Authorization')