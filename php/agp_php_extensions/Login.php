
	<?php

	include_once("Core/DB_Core.php");
	include_once("Session.php");
	
	//Using Classes
	    


		//Login module 
		class Login
		{
			
			private 	$CSS; 			//Holds the current Css for div
			private 	$email;    		//Login name
			private 	$password;      	//Password
			private 	$queryDummyTemp;
			private	$row;
			private	$passwordconff;
			private	$firstname;
			private	$lastname;
			private	$Username;
			private	$address;
			private	$state;
			private	$city;
			private	$DOB;
			private	$country;
			private	$phone;
			private 	$activationKeyTemp;
			private 	$code;		//Sent for activate account
			
			
			//Custom Object Intances
		     private	$CoreMethods;		//Instance of core methods
			private   $Query;		
			
		     function __construct()
			{     
			    
				$this->CoreMethods = new core_Utilities_Method(); 
				$this->Query = new core_db_Query_Handler(); 
			
			} 
			
			
			private function FormLogin()
			{
				 return " <div class=\"" . $this->CSS . "\" >   			  
				           	<form action=\"\" method=\"post\" > 
							
								<table cellpadding=\"5\" cellspacing=\"6\" border=\"0\">
									<tr>									
										<td>Email: </td>
										<td><input type=\"text\" name=\"Email\" /> </td>
									</tr><tr>									
										<td>Password: </td>
										<td><input type=\"password\" name=\"password\" /> </td>
									</tr><tr>
										<td colspan=\"0\" align=\"right\"><input type=\"submit\" name=\"SubmitLogin\" value=\"Login\" /> </td>
									</tr> 
								</table></form></div> 	";    
			        
			}
			
			function LoginUser($css, $defaultSite)
			{  
				
				$this->CSS = $css;  
			    
			    
				
				if (isset($_POST['SubmitLogin']))
				{                                
					$this->email 		= $this->CoreMethods->SQLInjection($_POST['Email']);
					$this->password 	= $this->CoreMethods->SQLInjection($_POST['password']);
					
				  
					if (!$this->email || !$this->password)//CHECK IS FIELDS ARE NOT EMPTY
					{    
						 echo "<p style=\"color:red\">Warning: please insert your email and password...</p>";        
						
					}
					else
					{ 
						$this->queryDummyTemp = "Select * from users where U_Email = '". $this->email . "'" ;
					     $this->Query->Query_Select($this->queryDummyTemp);
						
						
						//Check if user exist
						if($this->Query->GetSelectNumberOfRows() == 0)
						{
						    echo "<p style=\"color:red\">Warning: The user does not exist...</p>";        
						
						}
						else
						{
						     $this->Query->FreeResults();
							$this->queryDummyTemp = "Select * from users where U_Email = '". $this->email . "' AND U_Password = '" . $this->password . "'" ;
						     $this->Query->Query_Select($this->queryDummyTemp);
							
							if($this->Query->GetSelectNumberOfRows() == 0)
							{
							    echo "<p style=\"color:red\">Warning: The Password is Incorrect..</p>";        
							
							}
							else
							{  
								
								$this->row = $this->Query->GetNextSelectRow();
								
							    	if ($this->row['U_Active'] != 1)
								{
									echo "<p style=\"color:red\">Account not activated, please check your email...</p>";   
								}	
								else
								{   
									//Logged in
									
									$_SESSION['U_Email'] = $this->row['U_Email'];
									$_SESSION['U_ID'] = $this->row['U_ID'];
									$_SESSION['U_FirstName'] = $this->row['U_FirstName']; 
									$_SESSION['U_LastName'] = $this->row['U_LastName']; 
									$_SESSION['U_Priviledge'] = $this->row['P_ID'];
									$_SESSION['U_State'] = $this->row['U_State']; 
									
									echo "<p style=\"color:blue\">You Have Logged in...</p>";       
									 
									header('Location: '.$defaultSite );
								
								} 							
							} 
						}  
					}  
				}		
				
			// Form  LOGIN
			   echo	$this->FormLogin();
				   
				
			} //End Class  
			
			function RegisterAccount($css)
			{ 
				$this->CSS = $css;  
			    
				 
			    
				
				if (isset($_POST['SubmitRegister']))
				{  
					$this->email 			= $this->CoreMethods->SQLInjection($_POST['Email']);
					$this->password 		= $this->CoreMethods->SQLInjection($_POST['password']); 
					$this->passwordconff 	= $this->CoreMethods->SQLInjection($_POST['passconf']);
					$this->Username 		= $this->CoreMethods->SQLInjection($_POST['Username']);
					$this->firstname 		= $this->CoreMethods->SQLInjection($_POST['FirstName']);
					$this->lastname 		= $this->CoreMethods->SQLInjection($_POST['LastName']);  
					$this->DOB 			= $this->CoreMethods->SQLInjection($_POST['DOB']); 
					$this->address 		= $this->CoreMethods->SQLInjection($_POST['Address']);
					$this->city 			= $this->CoreMethods->SQLInjection($_POST['City']);
					$this->country 		= $this->CoreMethods->SQLInjection($_POST['Country']); 
					$this->state 			= $this->CoreMethods->SQLInjection($_POST['State']);  
					$this->phone 			= $this->CoreMethods->SQLInjection($_POST['Phone']);                                
					
					
					
					if (!$this->email || !$this->password || !$this->passwordconff || !$this->Username || !$this->firstname || !$this->lastname || !$this->DOB || !$this->state  )
				      {
				      	
					 	echo "<p style=\"color:red;\"> Warning: there are empty fields...</p>";
				      
					 }
				      else
					 {
					 	
					     if(!$this->CoreMethods->CheckEMailValid($this->email))
						{
					     	//if not display error message
					          echo "Warning: enter a valid email";
					     }
						else
						{      
							
						     $this->queryDummyTemp = "SELECT U_Email FROM users WHERE U_Email = '". $this->email ."'"; 
							$this->Query->Query_Select($this->queryDummyTemp);
							
							if ($this->Query->GetSelectNumberOfRows() > 0)
							{  
							    echo	"<p style=\"color:red;\"> Warning: Email Already Exist.</p>"; 
								
							}
							else
							{
							   if (strlen($this->password) < 6)
							   {
							   	    echo 	"<p style=\"color:red;\"> Warning: Password Too Short. (6 to 30 characters)</p>";
							   
							   }	
							   else if (strlen($this->password) > 30)
							   {
							   	
							       	echo "<p style=\"color:red;\"> Warning: Password Too Long.(6 to 30 characters)</p>";      
							   }
							   else
							   {
							         if ($this->password != $this->passwordconff)
								    {
								    	  	echo "<p style=\"color:red;\"> Warning: Passwords Do Not Match. Please Verify</p>";
								    
								    }
								    else
								    {     
								    		$this->queryDummyTemp = "SELECT U_Username FROM users WHERE U_Username = '". $this->Username."'";
								    		$this->Query->Query_Select($this->queryDummyTemp);
										                                                                                                                                                                                                                                                            
										if ($this->Query->GetSelectNumberOfRows() > 0)
										{
										   	echo "<p style=\"color:red;\"> Warning: Username Already Taken.</p>";	
								    
										}                                                                                
										else
										{  
										
										//Register	
										
											$this->activationKeyTemp = $this->CoreMethods->ConvertStringToMD5EncriptedKey($this->email . $this->Username . date('U'));
										   
										    
											$this->queryDummyTemp =  "INSERT INTO users (U_Email, U_FirstName, U_LastName, U_Username, U_Password, U_DOB, U_DateCreated, U_HomePhone, U_Country, U_State, U_City, U_Address, U_ActivationCode) VALUES ('". $this->email ."','". $this->firstname ."','" . $this->lastname ."','". $this->Username ."','". $this->password ."','". $this->DOB ."','". $this->CoreMethods->TimeDateCurrentServer_PHP_TO_MYSQL()."','". $this->phone ."','" . $this->country ."','". $this->state ."','" . $this->city ."','" . $this->address ."','" .	$this->activationKeyTemp  ."')";
											$this->Query->Query_Insert($this->queryDummyTemp);	    
							       			                                                                                                                                                                                                                                                                                                                                                                                      
											//Mail user the activation key
											mail($this->email, "Registration Information","Thanks for registering with us " . $this->firstname . " " . $this->lastname  . ". \n\nIn order to activate your account go to this link. (If the link does not work, copy and paste into your browser address bar. \n\nhttp://127.0.0.1:8888/agp_php_extensions/activate.php?code=" . $this->activationKeyTemp . "\n\n\nThanks,","From: noreply@agp.com" );
										      
								    			echo   "<p style=\"color:blue\"> Account created. Please check your email for instruction on how to activate your account.</p>";
								    
										} 
								    } 
							   } 
							}  
						} 
					 }
				}
				
				echo $this->FormRegister();  
			  
			}
			private function FormRegister()
			{
				
			   return "<div id=\"" . $this->CSS ."\">
							<form action=\"\" method=\"post\">
								<table cellpadding=\"6\" cellspacing=\"6\" border=\"0\">
									<tr>
										<td>Email: (Used for login)  </td>
										<td><input type=\"text\" name=\"Email\" size=\"30\" /></td>
									</tr>
									<tr>
										<td>Username: (nickname) </td>
										<td><input type=\"text\" name=\"Username\" size=\"30\" /></td>
									</tr>
									<tr>
										<td>Password: </td>
										<td><input type=\"password\" name=\"password\" size=\"30\" /></td>
									</tr>
									<tr>
										<td>Confirm Password: </td>
										<td><input type=\"password\" name=\"passconf\" size=\"30\" /></td>
									</tr>
									<tr>
										<td>First Name: </td>
										<td><input type=\"text\" name=\"FirstName\" size=\"30\"/></td>
									</tr>
									<tr>
										<td>Last Name: </td>
										<td><input type=\"text\" name=\"LastName\" size=\"30\"/></td>
									</tr> 									
									<tr>
										<td>Date Of Birth: (MM/DD/YYYY) </td>
										<td><input type=\"text\" name=\"DOB\" size=\"30\"/></td>
									</tr>
									<tr>
										<td>Address: </td>
										<td><input type=\"text\" name=\"Address\" size=\"30\"/></td>
									</tr>
									<tr>
										<td>Country: </td>
										<td><input type=\"text\" name=\"Country\" size=\"30\"/></td>
									</tr>
									<tr>
										<td>City: </td>
										<td><input type=\"text\" name=\"City\" size=\"30\"/></td>
									</tr>
									<tr>
										<td>State: </td>
										<td><input type=\"text\" name=\"State\" size=\"30\"/></td>
									</tr>
									<tr>
										<td>Phone: </td>
										<td><input type=\"text\" name=\"Phone\" size=\"30\"/></td>
									</tr>
									<tr>
										<td colspan=\"2\" align=\"right\"><input type=\"submit\" name=\"SubmitRegister\" value=\"Create Account\" /></td>
									</tr>
									
								</table>
							</form>
						</div>   
				
				
						";    
			
			}
			
		     private function FormForgotPassword()
			{
				
				 return " <div class=\"" . $this->CSS . "\" >   			  
				           	<form action=\"\" method=\"post\" > 
							
								<table cellpadding=\"5\" cellspacing=\"6\" border=\"0\">
									<tr>									
										<td>Email: </td>
										<td><input type=\"text\" name=\"Email\" /> </td>
									</tr><tr>
										<td colspan=\"2\" align=\"right\"><input type=\"submit\" name=\"SubmitForget\" value=\"Send Password\" /> </td>
									</tr> 
								</table></form></div> 	";   
			
			
			}
			
			function ActivateAccount()
			{ 
				if (isset($_GET['code'])) 
				{ 	
			   		$this->code = $this->CoreMethods->SQLInjection($_GET['code']);
				    
					$this->Query->Query_Select("SELECT * FROM users WHERE U_Active = '0'");
					
					
					for ($i = 0; $i < $this->Query->GetSelectNumberOfRows(); $i++)
					{
						 $this->row = $this->Query->GetNextSelectRow();
						 
						 if ($this->code == $this->row['U_ActivationCode'])
						 {
						 	$this->Query->Query_Update("UPDATE users SET U_Active = '1' WHERE U_ID = '".$this->row['U_ID']."'" );
						 	echo "<p>You have activated your account... </p>";
						 }
						
					}
						
				 }	
				
			}
			
			function RecoverPassword()
			{ 
				
				if (isset($_POST['SubmitForget']))
				{ 
				   	$this->email = $this->CoreMethods->SQLInjection($_POST['Email'])	;
					if (!$this->email)
					{
						echo "<p>Please insert your email...</p>";
						
					}
					else
					{
						if ( !$this->CoreMethods->CheckEMailValid($this->email))
						{
							 echo "<p style=\"color:red\"> Email Not Valid </p>";
						}
						else
						{
						   	$this->Query->Query_Select("SELECT * FROM users WHERE U_Email = '" . $this->email . "'");	
							if ($this->Query->GetSelectNumberOfRows() == 0)
							{
								echo "The email supplied does not exist in out system.";
							}
							else
							{
								 $this->row = $this->Query->GetNextSelectRow();
								 mail( $this->email,'Password Recovery', "Your password: " . $this->row['U_Password'] );
								
								echo "Email sent with your password. Please check your Inbox and Spam filter"; 
							}	
						}
						
					}
					
				} 
				echo $this->FormForgotPassword();
				
				
			}
			
			function LogoutUser($backlink)
			{  
				 if (isset($_SESSION['U_ID']))
				 {
				 	
				 	if (strcmp($_SESSION['U_ID'],"") == 0)
					{  
						echo "<p style=\"color:red\" > Error: No user Logged in... </p>";
					
					}
					else
					{      
						
						
						//session_destroy();
						session_unset();
					    	echo "<p style=\"color:blue\" > You have logged out... </p>";
						header('Location: '.$backlink ); 
					
					 		
					}
				 } 
				
				 
			
			}
			
	    
			
			function TotalUserAccounts($styleRow1, $styleRow2)
			{
				
				$this->Query->Query_Select("SELECT * FROM users ORDER BY U_ID");
				$a = 1;//counter for style
				
				echo "<p> Accounts: " . $this->Query->GetSelectNumberOfRows() . "</p>";
				for ($i = 0; $i < $this->Query->GetSelectNumberOfRows(); $i++)	
				{                         
					if ($a==1)
					{
						$this->row = $this->Query->GetNextSelectRow(); 
						  
						echo "<div class=\"".$styleRow1."\"> 
									<table cellpadding=\"5\" cellspacing=\"6\" border=\"0\">
											<tr>									
												<td>ID: </td>
												<td> ". $this->row['U_ID'] . "</td>
												<td></td>
											</tr><tr>
												<td></td>
												<td>Email: </td>
												<td>". $this->row['U_Email'] . "</td>
											</tr>
											<tr>
												<td></td>  
												<td>Username: </td>
												<td>" . $this->row['U_Username'] . " </td>
											</tr> 
											<tr>
												<td></td>  
												<td>Name: </td>
												<td>" . $this->row['U_FirstName'] . "  " . $this->row['U_LastName'] . " </td>
											</tr>
										</table>
						             </div> ";				
					             
					    $a = 2;	
					}
					else if($a==2)
					{
					    	$this->row = $this->Query->GetNextSelectRow(); 	
						  
					   		echo "<div class=\"".$styleRow2."\"> 
									<table cellpadding=\"5\" cellspacing=\"6\" border=\"0\">
											<tr>									
												<td>ID: </td>
												<td> ". $this->row['U_ID'] . "</td>
												<td></td>
											</tr><tr>
												<td></td>
												<td>Email: </td>
												<td>". $this->row['U_Email'] . "</td>
											</tr>
											<tr>
												<td></td>  
												<td>Username: </td>
												<td>" . $this->row['U_Username'] . " </td>
											</tr> 
											<tr>
												<td></td>  
												<td>Name: </td>
												<td>" . $this->row['U_FirstName'] . "  " . $this->row['U_LastName'] . " </td>
											</tr>
										</table>
						             </div> ";
						$a=1;
					}
				}	
			
			}

		
		}
		
         

	
   /*
	$Account = new Login();
      $Account->TotalUserAccounts("a","b");
    	$Account->LoginUser("aa", "" );
    $Account->RegisterAccount("aa");
     $Account->ActivateAccount();
	$Account->RecoverPassword();
	$Account->LogoutUser();
	
	echo $_SESSION['U_ID'];
	echo $_SESSION['U_Email'];
	*/
	?>

</body>
</html>