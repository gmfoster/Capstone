import re

emails = ['grahammfoster96@gmail.com', 'gmfoster@umail.ucsb.edu', 'linda-k-martin@sbcglobal.net', 'gmfoster@umail.edu', '123-3_343@gmail.com', 'g_g_gabc@yahoo.com', 'adbcedkel_e-erer@ucsb.uc.edu']


for i in emails:
	email = i
	print (email)
	if not re.match("(\w+[-|.|\w])*@(\w+[.])*\w+", email, re.IGNORECASE):
		print ("not a valid email")
	else:
		print("valid")


bad_emails = ['abced.erert', '12323@43r44', 'tct', 'grahammfoster96@gmail,com', 'grahammfoster2gmail.com']


for i in bad_emails:
	email = i
	print (email)
	if not re.match("(\w+[-|.|\w])*@(\w+[.])+\w+", email, re.IGNORECASE):
		print ("not a valid email")
	else:
		print("valid")