<?php

 $data = file_get_contents('php://input');
//haetaan tuote id
$id = json_decode( $data, true);
$id = array_values($id)[0];

 $con = mysqli_connect("localhost","root","","verkkokauppa");

 if (mysqli_connect_errno())
   {
   echo "Failed to connect to MySQL: " . mysqli_connect_error();
   }
//tarkista onko tuote jo ostoskorissa
$result = mysqli_query($con,"SELECT * FROM ostoskori WHERE tuoteId = '$id'");
if (mysqli_num_rows($result) > 0) {
    echo "korissa";
} else {
    //laita ostoskoriin jos ei ole jo
    echo $id;
    mysqli_query($con,"INSERT INTO ostoskori VALUES ('$id')");
}
 ?>
