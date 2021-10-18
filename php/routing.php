<?php

$urlPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if ('/' === $urlPath) {
    require __DIR__ . '/home.php';
} elseif ('/credit' === $urlPath ) {
    require __DIR__ . '/credit.php';
} elseif ('/death-pong' === $urlPath) {
    require __DIR__ . '/death-pong.php';
} elseif ('/leaderboard' === $urlPath) {
    require __DIR__ . '/leaderboard.php';
}else {
    header('HTTP/1.1 404 Not Found');
}