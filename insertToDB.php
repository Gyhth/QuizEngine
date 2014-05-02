<?php
     // Open a DB connection to the specified host so we can write the command
     try
     {
          //Assign the major variables, such as what user to use in the database,
          //Password, where the db is, what db we're connecting to, etc.
          $user = "";
          $password = "";
          $host = "localhost";
          $dbase = "contacts";      
          $dsn = 'mysql:host='.$host.';dbname='.$dbase.';';
          $dbh = new PDO($dsn, $user, $password);
     }
     catch (Exception $e) {
          die("Unable to open connection: " . $e->getMessage());
     }
     $firstName = $_POST['firstname'];
     $lastName = $_POST['lastname'];
     $email = $_POST['email'];
     if (isset($_POST['optin']) && $_POST['optin'] == "true") {
          $contactable = true;
     }
     else {
          $contactable = false;
     }
     try {
          $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
          $dbh->beginTransaction();
          $insertSQL = "INSERT INTO contacts VALUES(:firstname, :lastname, :email, :contactable)";
          $prepInsert = $dbh->prepare($insertSQL);
          $prepInsert->bindParam(':firstname',$firstName, PDO::PARAM_STR);
          $prepInsert->bindParam(':lastname',$lastName, PDO::PARAM_STR);
          $prepInsert->bindParam(':email',$email, PDO::PARAM_STR);
          $prepInsert->bindParam(':contactable',$contactable,PDO::PARAM_INT);
          $prepInsert->execute();
          $dbh->commit();
     }
     catch (Exception $e) {
          $dbh->rollBack();
          die($e->getMessage());
     }

?>
