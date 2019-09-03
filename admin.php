<?php
/**
 * The Front Controller for handling every request
 *
 * CakePHP(tm) : Rapid Development Framework (https://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (https://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (https://cakefoundation.org)
 * @link          https://cakephp.org CakePHP(tm) Project
 * @since         0.2.9
 * @license       MIT License (https://opensource.org/licenses/mit-license.php)
 */

 use Cake\Routing\Router;

 // Using a scoped route builder.
 Router::scope('/', function ($routes) {
     $routes->connect('/', ['controller' => 'Articles', 'action' => 'index']);
 });

 // Using the static method.
 Router::connect('/', ['controller' => 'Articles', 'action' => 'index']);
