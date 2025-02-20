<?php
require_once('bd.php');

function selectScore()
{
    try {
        $conexion = openDB();
        $sentenciaText = "SELECT * FROM scores";
        $sentencia = $conexion->prepare($sentenciaText);
        $sentencia->execute();
        $resultado = $sentencia->fetchAll(PDO::FETCH_ASSOC);
        closeDB();
        return $resultado;
    } catch (PDOException $e) {
        echo "<p>Error al obtener los datos: " . htmlspecialchars($e->getMessage()) . "</p>";
        return [];
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $scores = selectScore();
    echo "<h1>Puntuaciones Guardadas</h1>";
    
    if (!empty($scores)) {
        echo "<ul>";
        foreach ($scores as $score) {
            echo "<li>ID: " . htmlspecialchars($score['id_score']) . ", Punto: " . htmlspecialchars($score['punto']) . "</li>";
        }
        echo "</ul>";
    } else {
        echo "<p>No se encontraron puntuaciones.</p>";
    }
} else {
    echo "<p>Acceso no permitido. Por favor, usa el formulario en index.php.</p>";
}
?>
