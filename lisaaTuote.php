<?php

$data = file_get_contents('php://input');
//haetaan tuote id
$arr = json_decode( $data, true);
$nimi = array_values($arr)[0];
$tiedot = array_values($arr)[1];
$varastossa = array_values($arr)[2];
$hinta = array_values($arr)[3];

 $con = mysqli_connect("localhost","root","","verkkokauppa");

 if (mysqli_connect_errno())
   {
   echo "Failed to connect to MySQL: " . mysqli_connect_error();
   }
mysqli_query($con,"INSERT INTO tuote VALUES(DEFAULT,'$nimi','$tiedot','$varastossa', '$hinta')") or die(mysqli_error($con));

echo "INSERT INTO tuote VALUES('$nimi','$tiedot','$varastossa', '$hinta')";
 ?>
