try:
	import pymysql
	pymysql.install_as_MySQLdb()
except ImportError:
	# MySQL compatibility is optional for this project setup.
	pass