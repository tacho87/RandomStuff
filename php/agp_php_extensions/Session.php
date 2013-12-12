<?php

	session_start();
	
	class Sessions
	{    	
		
		
		private function CreateSessions()
		{
			
			$_SESSION['U_Email'] 	= "";
		   	$_SESSION['U_ID'] 		= "";
		   	$_SESSION['U_FirstName'] = ""; 
			$_SESSION['U_LastName'] 	= ""; 
		   	$_SESSION['U_Priviledge']= "";
			$_SESSION['U_State'] 	= ""; 
			 
		}
		function LoginLogoutWindow ($loginLink, $logoutLink, $CreateAccountLink, $ForgotPasswordLink, $MyAccountLink, $AdminAccountLink, $HomePageLink)
		{     
			
		    
			
			 
		  if (isset($_SESSION['U_ID']))
		   {
				
			   if (strcmp($_SESSION['U_Email'],"") == 0)
			   {   
			   		echo " <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\">
											<tr>	
												<td>Welcome: (Guest) |</td>								
												<td><a href=\"".$loginLink. "\">Login</a> | </td>
												<td><a href=\"".$CreateAccountLink. "\">Create Account</a> | </td>
												<td><a href=\"".$ForgotPasswordLink. "\">Forgot Password</a> | </td>
											</tr>";   
			   
			   }
			   else if ($_SESSION['U_Priviledge'] == '2')  //ADMIN
			   {   
			   	    	echo " <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\">	
											<tr>	
												<td>Welcome Admin: ".$_SESSION['U_Email'] ." | </td>  
												
												<td><a href=\"".$AdminAccountLink. "\">Manage</a> | </td>
												<td><a href=\"".$logoutLink. "\">Logout</a>  |</td>   
											</tr>"; 
			   	
			   }
			   else
			   {        
			   	
			   		echo " <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\">
											<tr>	
												<td>Welcome: ".$_SESSION['U_Email'] ." | </td> 										    
												<td><a href=\"".$MyAccountLink. "\">Account</a> | </td>
												<td><a href=\"".$logoutLink. "\">Logout</a>  |</td>   
											</tr>";   
			   	
			   }
		   }
		   else
		   {
		   	   $this->CreateSessions();
			   header('Location: '.$HomePageLink);
			   
		   	
		   }
			
		
		
		
		
		}
		function ClearSessionAttributes()
		{
			
		 	$_SESSION['U_Email'] 	= "";
		   	$_SESSION['U_ID'] 		= "";
		   	$_SESSION['U_FirstName'] = ""; 
			$_SESSION['U_LastName'] 	= ""; 
		   	$_SESSION['U_Priviledge']= "";
			$_SESSION['U_State'] 	= "";  	
		
		}
		function GetUserID()
		{
			return $_SESSION['U_ID'];
		}
		function GetUserEmail()
		{
			return  $_SESSION['U_Email'];
		}
		function GetPriviledge()
		{
			return   $_SESSION['U_Priviledge'];
		}
		
		
	
	
	}



   /*	
	$Session = new Sessions();
	$Session->LoginLogoutWindow("a","b","c","d","e","s");
   */

?>
