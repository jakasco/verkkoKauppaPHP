<?php
$data = file_get_contents('php://input');
$nimi = json_decode( $data, true);
$nimi = array_values($nimi)[0];

$con = mysqli_connect("localhost","root","","verkkokauppa");
echo $nimi;
mysqli_query($con,"DELETE FROM tuote WHERE nimi = '$nimi'");
?>
