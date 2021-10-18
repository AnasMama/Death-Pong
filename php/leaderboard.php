<?php

require __DIR__ . "/fetch.php";


if (!empty($_GET)) {
    //nettoie les données des espaces avant et après
    $scoreToClean = array_map('trim', $_GET);

    //nettoie les données
    $player = ucwords(strtolower(filter_var($scoreToClean['player'], FILTER_SANITIZE_SPECIAL_CHARS)));
    $score = filter_var($scoreToClean['score'], FILTER_VALIDATE_INT);
    $timer = filter_var($scoreToClean['timer'], FILTER_VALIDATE_INT);

    //check si les paramètres ne sont pas vides
    $errors = [];
    if (empty($player)) {
        $errors = "player not existing or get values wrong";
    }
    if (empty($score)) {
        $errors = "score incorrect or get values wrong";
    }
    if (empty($timer)) {
        $errors = "timer incorrect or get values wrong";
    }

    $scoreToInsert = [
        'name' => $player,
        'score' => $score,
        'timer' => $timer,
    ];


    //Insère dans la base de donnée les infos
    $getScores = getAllScore();
    if (!$errors) {
        if (count($getScores) >= 10) {
            for ($i = 0; $i < count($getScores); $i++) {
                if ($scoreToInsert['score'] >= intval($getScores[$i]->score)) {
                    lastScoreRemove();
                    insertScore($scoreToInsert);
                    break;
                }
            }
        } else {
            insertScore($scoreToInsert);
        }

    }
}


$leaderboardPlayers = getAllScore();
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leaderboard</title>
</head>
<body>


<table>
    <tbody>
        <tr>
            <td>Name</td>
            <td>Timer</td>
            <td>Score</td>
        </tr>

        <?php foreach ($leaderboardPlayers as $leaderboardPlayer): ?>
        <tr>
            <td><?= $leaderboardPlayer->name ?></td>
            <td><?= $leaderboardPlayer->timer ?></td>
            <td><?= $leaderboardPlayer->score ?></td>
        </tr>
        <?php endforeach; ?>
    </tbody>
</table>


</body>
</html>



