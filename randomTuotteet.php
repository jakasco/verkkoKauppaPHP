<?php
 $con = mysqli_connect("localhost","root","","verkkokauppa");
 if (mysqli_connect_errno())
   {
   echo "Failed to connect to MySQL: " . mysqli_connect_error();
   }
$result = mysqli_query($con,"SELECT * FROM tuote ORDER BY RAND() LIMIT 30");
if (mysqli_num_rows($result) > 0) {
$rows = array();
while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}

echo json_encode($rows);

} else {
  $arr = array('Tuotteet' => 0);
  echo json_encode($arr);
}
 ?>
