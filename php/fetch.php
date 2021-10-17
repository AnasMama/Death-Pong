<?php


const DB_HOST = 'localhost';
const DB_NAME = 'death_pong';
const DB_USER = 'Asa';
const DB_PASSWORD = 'necrlB6i2_#4LSPaJlcu';


function getConnection(): PDO
{
    return new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8', DB_USER, DB_PASSWORD);
}


function getAllScore(): array
{
    $connection = getConnection();
    $query = 'SELECT * FROM leaderboard ORDER BY score DESC';
    $statement = $connection->query($query);
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_OBJ);
}


function insertScore(array $scoreToInsert)
{
    $connection = getConnection();
    $query = 'INSERT INTO leaderboard (name, score, timer) VALUES (:name, :score, :timer)';
    $statement = $connection->prepare($query);
    $statement->bindValue(':name', $scoreToInsert['name'], PDO::PARAM_STR);
    $statement->bindValue(':score', $scoreToInsert['score'], PDO::PARAM_INT);
    $statement->bindValue(':timer', $scoreToInsert['timer'], PDO::PARAM_INT);
    $statement->execute();
}

function lastScoreRemove()
{
    $connection = getConnection();
    $query = 'DELETE FROM leaderboard ORDER BY score LIMIT 1';
    $statement = $connection->query($query);
    $statement->execute();
}

