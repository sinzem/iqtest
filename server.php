<?php
$_POST = json_decode(file_get_contents("php://input"), true);/* (эта строчка нужна, чтобы перекодировать json - php с ним не работает) */
echo var_dump($_POST); 
// (var_dump - позволит нам увидеть данные, которые приходят с клиента - берет данные, превращает их в строку и показывает обратно на клиенте - ответ от сервера)