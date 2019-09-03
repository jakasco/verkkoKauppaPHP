<?php
$data = file_get_contents('php://input');
$id = json_decode( $data, true);
$id = array_values($id)[0];

$con = mysqli_connect("localhost","root","","verkkokauppa");
echo $id;
mysqli_query($con,"DELETE FROM ostoskori WHERE tuoteId = '$id'");
?>
