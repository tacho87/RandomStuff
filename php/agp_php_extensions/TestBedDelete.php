
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
	
	
?>
</head>

<body>

	<?php
	
   
         
		$Session->LoginLogoutWindow("?test=LOGIN","?test=LOGOUT","?test=CREATEACCOUNT", "?test=FORGOTPASSWORD", "?test=ACCOUNT", "?test=ADMINACCOUNT", "TestBedDelete.php");
	          
	       
		   if (isset($_GET['test']))
		   {
				if ($_GET['test'] == 'LOGIN')
				{   
					$Account->LoginUser("a","TestBedDelete.php");
					
				}
				else if($_GET['test'] == 'LOGOUT') 
				{
					$Account->LogoutUser("TestBedDelete.php");
				}
				else if($_GET['test'] == 'CREATEACCOUNT') 
				{           
					$Account->RegisterAccount("A");
				}
				else if($_GET['test'] == 'FORGOTPASSWORD') 
				{       
					$Account->RecoverPassword();
						
				}
				else 
				{
					
					echo "<br /><br />Please Do Something...";
				 
				}  
			    
		   }
		   else
		   {
		   
		   	$Account->ActivateAccount();
			
	        }
        ?>
</body>
</html>