import mysql.connector

mydb = mysql.connector.connect(
	host="172.17.0.4",
	user="root",
	passwd="admin",
	port=3306
);

print(mydb)
