
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<title></title>

<?php 
	include_once("Session.php");	
	$Session = new Sessions();
    
	include_once("Login.php");
	$Account = new Login();
	
	include_once("Core/Db_Core.php");
	$QUERY = new core_db_Query_Handler();
	
	
	
	
	
?>
</head>

<body>

<?php 

		$QUERY->Query_Select("SELECT * FROM USERS");
		
		$row = $QUERY->GetNextSelectRow();
		//echo $row['U_Email'] . "   " . $row['U_Username'];
		
		for ($i = 0; $i < $QUERY->GetSelectNumberOfRows(); $i++)     
		{
			 echo "<p> " . $row['U_Email'] . " ---- " . $row['U_Username'];
			 $row = $QUERY->GetNextSelectRow();
			 if ($i >= 2)
			 {
			 	
			       exit();
			 }
			
		}

?>


</body>
</html>