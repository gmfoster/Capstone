import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from twilio.rest import Client

class alert():
    def __init__(self):
        ACCOUNT_SID = "AC11b7513e541b54673230d8c5bbfc9a7f" #quintin
        AUTH_TOKEN = "7a030cf16277e88e6c5f451d50c52612"#quintin
        #ACCOUNT_SID = "AC094c339aa3e51d84a3057a10ed4660d2" #graham
        #AUTH_TOKEN = "35625b83cdca34b25a358e9fd2aea4c9" #graham
        self.client = Client(ACCOUNT_SID, AUTH_TOKEN)

    def sendText(self, name, phone,link):
        message = self.client.messages.create(
            body = " " +name+ "\nYou are being alerted because a sensor from NovaSight has been triggered by: " + link + " For more information visit your NovaSight Dashboard" ,
            from_ = '+19152283110',
            to = '+17147475699')
            # need to authorize a phone number with twilio before you're able to send to it
            
        print(message.sid)

    def sendEmail(self, name, email):
        toaddr = email
        fromaddr = "quintinhill1316@gmail.com"
        msg = MIMEMultipart()
        msg['From'] = fromaddr
        msg['To'] = toaddr
        msg['Subject'] = "NovaSight Alert"
        body = "\n"+name+"\n 1 OR MORE SENSORS HAVE FOUND DATA\n"

        msg.attach(MIMEText(body, 'plain'))

        toaddr = email
        server = smtplib.SMTP('smtp.gmail.com:587')
        server.starttls()
        server.login(fromaddr, "30261316Sss")
        server.sendmail(fromaddr, toaddr, text)
        server.quit()

#if __name__ == "__main__":
#    alert = alert()
#    alert.sendText("graham", "+18315885781")
