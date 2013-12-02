<?php
session_start();
if($_SESSION['admin']==1){
  if($_POST['title']){
    if(@file_put_contents($_POST["title"].".txt",$_POST["content"])){
      echo "File saved!";
    }else{
      echo "File could not be saved.";
    }
  }

  if($_GET['delete']){
    if(@unlink($_GET["delete"] . ".txt")){
      echo "File deleted. <a href=\"display.php\">Click here to go back to the listing.</a>";
    }else{
      echo "File could not be deleted.";
    }
  }

  
  $title = $_GET['open'];
  if (!$title){
    $title = $_POST['title'];
  }
  $filename = $title . ".txt";

  if(file_exists($filename)){
    $file = @fopen($filename,"r");
    $mode = "edit";
  }else{
    $mode = "create";
  }

  echo "In " . $mode . " mode.";?>

  <form action="create.php" method="post">
    <input type="text" name="title" value="<?php echo $title; ?>"/>
    <textarea name="content">
    <?php if($mode=="edit"){
      while(!feof($file)){
        echo fgets($file);
        fclose($file);
      }
    }else{
      if($_POST["content"]){
        echo $_POST["content"];
      }
    }?>
    </textarea>
    <input type="submit" value="Submit">
  </form>
<?php }else{
  echo "You are not logged in. <a href=\"login.php\">Click here to log in.</a>";
} ?>
