<?php

use Cake\Datasource\ConnectionManager;

$connection = ConnectionManager::get('default');
$results = $connection->execute('SELECT * FROM tuote')->fetchAll('assoc');

$data = file_get_contents('php://input');
echo $data;

 ?>
