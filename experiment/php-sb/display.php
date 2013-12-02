<?php
session_start();
if($_GET['open']){
  $filename =  $_GET['open'] . ".txt";
  if(!file_exists($filename)){
    die("There is no blog entry with that name.");
  }else{
    $file = @fopen($filename,"r");
  }
  while(!feof($file)){
    echo fgets($file) . "<br />";
  }
  fclose($file);
}else{
  $directory = "./";
  $texts = glob("*.txt");
  foreach($texts as $text){
    $name = basename($text, ".txt");
    echo "<div class=\"entry\">";
    echo "<a href=\"display.php?open=" . $name . "\">" . $name . "</a>";
    if($_SESSION['admin']==1){
      echo "<a href=\"create.php?open=" . $name . "\">" . "Edit" . "</a>";
      echo "<a href=\"create.php?delete=" . $name . "\">" . "Delete" . "</a>";
    }
    echo "</div>";
  }
} ?>
