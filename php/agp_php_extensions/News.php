
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
	include_once("Core/DB_Core.php");  
	
?>
</head>

<body>

	<?php
	        
         
		$Session->LoginLogoutWindow("?test=LOGIN","?test=LOGOUT","?test=CREATEACCOUNT", "?test=FORGOTPASSWORD", "?test=ACCOUNT", "?test=ADMINACCOUNT", "");
	          
	       
		   if (isset($_GET['test']))
		   {
				if ($_GET['test'] == 'LOGIN')
				{   
					$Account->LoginUser("a","");
					
				}
				else if($_GET['test'] == 'LOGOUT') 
				{
					$Account->LogoutUser("");
				}
			    
			    
		   }
	  
		   ?>
      <?php



	
   

	
	class News
	{    
		
		private $CSS; //stores css cascade stylesheet 
		private $PostTitle;
		private $PostBody;
		private $PostDate;
		private $Post_U_ID;
		private $PostID;
		private $QueryTempHolder;
		
		//Custom Object Intances
		private	$CoreMethods;		//Instance of core methods
		private   $Query;		
			
		function __construct()
		{     
		   
			$this->CheckUserPriviledge();
		    
			$this->CoreMethods = new core_Utilities_Method(); 
			$this->Query = new core_db_Query_Handler(); 
			
		}
		
		private function CheckUserPriviledge()
		{
		   if (isset($_SESSION['U_Priviledge']))	
			{
			    	if ($_SESSION['U_Priviledge'] != 2)
			 	{
			 		die("No enough priviledges to be here!");
			 	}
			}
		
		}
		function Create_a_Post($css)
		{    
		    
			$this->CheckUserPriviledge();   
			
		    if (isset($_POST['SubmitCreatePost']))	
		    {
		    	    $this->PostTitle = $this->CoreMethods->SQLInjection($_POST['title']);
		    	    $this->PostBody	 = $this->CoreMethods->SQLInjection($_POST['news']) ;
			    $this->PostDate	 = $this->CoreMethods->TimeDateCurrentServer_PHP_TO_MYSQL();
			    $this->Post_U_ID = $_SESSION['U_ID'];
			    
			    $this->QueryTempHolder = "INSERT INTO news (N_Title, N_Body, N_Date, U_ID) VALUES ('" . $this->PostTitle . "', '". $this->PostBody."', '" . $this->PostDate . "' , '" . $this->Post_U_ID . "')";
			    $this->Query->Query_Insert( $this->QueryTempHolder );
			         						
		    
		    }
		    else
		    {     $this->CheckUserPriviledge();     
		    		echo 	$this->Form_create_a_Post();
		    }
		
		
		}
		
		private function  Form_create_a_Post()
		{       
			
		    return "<div id=\"" . $this->CSS ."\">
							<form action=\"\" method=\"post\">
							<p>Create a New Post</p>
								<table cellpadding=\"6\" cellspacing=\"6\" border=\"0\">
									
								    	<tr>
										<td>Post Title:</td>
										<td><input type=\"text\" name=\"title\" size=78  /> </td>
									</tr> 
									<tr>
										<td>Post Content: </td>
										<td><textarea name=\"news\" cols=60 rows=14> </textarea></td>
								    
									<tr>
										<td colspan=\"2\" align=\"right\"><input type=\"submit\" name=\"SubmitCreatePost\" value=\"Create Post\" /></td>
									</tr>
									
								</table>
							</form>
						</div>   
				
				
						";    
			
		
		}
		
	
	
	
	
	}
	
	$c = new News();
	$c->Create_a_Post("a");

?>


</body>
</html>