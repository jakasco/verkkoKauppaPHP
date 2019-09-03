<?php

 $data = file_get_contents('php://input');


 $con = mysqli_connect("localhost","root","","verkkokauppa");

 if (mysqli_connect_errno())
   {
   echo "Failed to connect to MySQL: " . mysqli_connect_error();
   }

$result = mysqli_query($con,"SELECT * FROM ostoskori WHERE tuoteId = '$id'");
if (mysqli_num_rows($result) > 0) {
    echo "kori tyhjä";
} else {

    $result= mysqli_query($con,"SELECT nimi, id FROM tuote WHERE id = '$id'");
    if (mysqli_num_rows($result) > 0) {
    $rows = array();
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    echo json_encode($rows);
  }
}
 ?>
