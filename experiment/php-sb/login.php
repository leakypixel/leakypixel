<?php
session_start();
include 'config.php';

if ($_POST['user']){
  if($_POST['user']==$adminusername && $_POST['pass']==$adminpassword){
    $_SESSION['admin'] = 1;
  }else{
    echo "Invalid username/password.";
  }
}

if($_POST['logout']){
  $_SESSION['admin'] = 1;
  session_destroy();
  echo "Logged out";
}

if($_SESSION['admin']==1 && !$_POST['logout']){
  echo "You are logged in.";?>
  <form action="login.php" method="post">
    <input type="submit" name="logout" value="Logout" />
  </form>
<?php }else{ ?>
  <form action="login.php" method="post">
    <input type="text" name="user" value="username" />
    <input type="password" name="pass" value="password" />
    <input type="submit" value="Submit" />
  </form>
<?php } ?>
