<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user_id = $_POST['user_id'];
    $game_name = $_POST['game_name'];

    
    $host = 'localhost';
    $db = 'geek_games';
    $user = 'root';
    $pass = '';

    try {
        // Create a new PDO instance
        $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Insert the user ID and game name into the database
        $stmt = $pdo->prepare("INSERT INTO users (user_id, game_name) VALUES (:user_id, :game_name)");
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':game_name', $game_name);
        $stmt->execute();

        // Store the user_id in a session variable
        $_SESSION['user_id'] = $user_id;

        // Return success response
        echo "Account created successfully!";
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }

    // Close the database connection
    $pdo = null;
}
?>
