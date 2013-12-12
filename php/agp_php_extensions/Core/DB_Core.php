
<?php

//Includes

include_once("Config.php");

	class core_Utilities_Method
	{  
		
		private 	$checkemail;
		
	    function SanitizeSQL($string)
		{
			$string = trim(strip_tags(addslashes($string)));
			return $string;
		}
		function echoHTML($string)
		{
			$string = addslashes($string);
			return  $string;
		}
		function CheckEMailValid($mail)
		{
			$this->checkemail = "/^[a-z0-9]+([_\\.-][a-z0-9]+)*@([a-z0-9]+([\.-][a-z0-9]+)*)+\\.[a-z]{2,}$/i";
 
			return  preg_match(	$this->checkemail, $mail);
		}
		function TimeDateCurrentServer_PHP_TO_MYSQL()
		{ 
			return date("Y-m-d H:i:s", $_SERVER['REQUEST_TIME']);  
		}

		function ConvertStringToMD5EncriptedKey($string)
		{
			
			return md5($string);
		}
	
	}

//SQL INJECTION PROTECTOR - REMOVES SPACES AT THE BEGINNING AND END, TAKE OUT TAGS, AND ADD \', \"




//Connection Class
	
	class core_db_Connection_Handler
	{
		private 	$host;
		private 	$user;
		private 	$password;
		private 	$db_name;  		
		private 	$Connection;	//Connection Boolean
		
		
		//CUSTOM OBJECT INSTANCES
		private 	$CONFIG;    	//LOADS THE CONFIG FILE
		
		//Used for passing connection values
		function __construct()
		{   
			
			$this->CONFIG 		= 	new config(); //CONFIG FILE OBJECT
			
			$this->host 		= 	$this->CONFIG->Config_DB_HostAddress;
			$this->user		=   	$this->CONFIG->Config_DB_User; 
			$this->password	=   	$this->CONFIG->Config_DB_Password; 
			$this->db_name		=	$this->CONFIG->Config_DB_DataBaseName; 
		    
		}

		//Call this to connect the DB
		public function Connect()
		{
			$this->Connection = mysql_connect(	$this->host,	$this->user,	$this->password) ;
						
			if ($this->Connection)
			{
				mysql_select_db(	$this->db_name	) or die("Problem selecting DB: " . $this->db_name);
				return true;			
			}
			else
			{
				die ("Problem Connecting to DB: " . $this->db_name . " hosted on: " .  $this->host);
				return false;
			}
		}
		//Close connection. Should not be called since php closes the connection automatically
		function Close()
		{
			if ($this->Connection)
			{
				mysql_close($this->Connection) or die ("Problem Closing DB: " . $this->Connection);
			}		
		}

		//Get Variables
		function GetHost(){
			return $this->host;
		}
		
		function GetUser(){
			return $this->user;
		}

		function GetDB(){
			return $this->db_name;
		}

		function GetPassword(){
			return $this->password;
		}
		
		function GetConnection(){
			return $this->Connection;
		}	
	} //END





     //Query class- must exist a connection first
	class core_db_Query_Handler
	{
	
		private  $Select_Query_Result;  //HOLDS THE ENTIRE SELECT RESULT
		private  $Select_Query_Row;     //HOLDS EACH ROW (GetNextSelectRow()) TO GET THE NEXT RESULT 
		
		//CUSTOM OBJECT INSTANCE
		private  $Connection;
		
		function __construct()
		{         
			
		    	$this->Connection = new core_db_Connection_Handler(); //NEW CONNECTION      
			 
		     
               $this->Connection->Connect();						//CONNECTS TO DB
			     
		}
		
		//GET NUMBERS OF FIELDS IN EACH ROW (USEFUL FOR KNOWING HOW MANY FIELDS IN A ROW ARE)
		function GetSelectNumberOfFieldsPerRow()
		{
			return mysql_num_fields($this->Select_Query_Result);		
		}
		
		//GET THE NUMBER OF TOTAL ROWS RETURNED BY THE SELECT QUERY (USEFUL FOR "FOR..LOOPS")
		function GetSelectNumberOfRows()
		{
			return mysql_num_rows($this->Select_Query_Result);
		}
		//Query using select statement
		function Query_Select($Query)
		{                        
			
			$this->Select_Query_Result = mysql_query($Query) or die("Wrong Select Query");	
		}
		//free results 
		function FreeResults()
		{
			mysql_free_result($this->Select_Query_Result);
		}
		
		 //Get select next Item in the row file. need to run a select query first
		function GetNextSelectRow()
		{
			if ( mysql_num_rows($this->Select_Query_Result)>0) 
			{
				return $this->Select_Query_Row = mysql_fetch_array($this->Select_Query_Result, MYSQL_BOTH);
			}		
		}
		//insert query 
		function Query_Insert($Query)
		{                     
			
			mysql_query($Query);
	  
		}
		//delete query
		function Query_Delete($Query)
		{
		            
			mysql_query($Query) or die("Wrong Delete Query");
		
		}
		//update query
		function Query_Update($Query)
		{  
			mysql_query($Query) or die("Wrong Update Query");  
		
		}			
	}
	
//Include in your scripts

 /* 
$Query = new core_db_Query_Handler();
$CoreMethods = new core_Utilities_Method();

         


					    //	$Query->Query_Insert("Insert Into users (U_Email, U_FirstName, U_Password, U_Active) Values ('tacho87@hotmail.com', 'Tacho', 'hotmail87', '1')");

						$Query->Query_Select("SELECT * FROM users");

						for ($i = 0; $i < $Query->GetSelectNumberOfRows(); $i++)
						{
							$row = $Query->GetNextSelectRow();
							echo "<p>" . $row['U_Email'] . " <br />	Name: " . $row['U_FirstName'] . "<br />	Pass: " . $row['U_Password'] .  "</p>";

						}
						//$q->Query_Delete("DELETE FROM users");

  */

?>

