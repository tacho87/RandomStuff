<?php
//DATA BASE CONNECTION
	//Edit Here with your DB info
	   class config  //Dont change name
	   {
	   	
	   
	   //DATABASE CONFIG
		public $Config_DB_HostAddress 	= 	"127.0.0.1"; 		//Your Webserver Address where the Data Base is hosted. For local use 127.0.0.1
		public $Config_DB_User		= 	"root";		//DataBase User for accessing the Database. Use user with basic priviledges (Dont use root User in production)
		public $Config_DB_Password	= 	"";		//DataBase User Password
			
		public $Config_DB_DataBaseName =	"";		//DataBase to use (Supporting single DB at the moment)
		
	   }

?>