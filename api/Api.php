<?php
class Api {
    protected $servername = "localhost";
    protected $username = "root";
    protected $password = "";
    protected $dbname = "angulartest";

    protected $conn = null;

    function run() {
        $returnArray = array();

        $this->init();

        try {
            if (!isset($_REQUEST['action'])) {
                $this->getDefault();
            } elseif ($_REQUEST['action'] === 'soccer') {
                $this->getClubs();
            } elseif ($_REQUEST['action'] === 'setClub') {
                $this->saveClub();
            } elseif ($_REQUEST['action'] === 'deleteClub') {
                $this->deleteClub();
            } elseif ($_REQUEST['action'] === 'movies') {
                $this->getMovies();
            } elseif ($_REQUEST['action'] === 'setMovie') {
                $this->saveMovie();
            } elseif ($_REQUEST['action'] === 'deleteMovie') {
                $this->deleteMovie();
            } elseif ($_REQUEST['action'] === 'player') {
                $this->getPlayer();
            } elseif ($_REQUEST['action'] === 'setPlayer') {
                $this->savePlayer();
            } elseif ($_REQUEST['action'] === 'deletePlayer') {
                $this->deletePlayer();
            }else {
               $this->getDefault();
            }
        } catch (Exception $e) {
            $returnArray['message'] = $e->getMessage();
            echo json_encode($returnArray);
        }

        $this->conn->close();
    }

    function init() {
        header("Content-type: application/json");

        $this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);

        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    function getClubs() {
        $returnArray = array();
        $returnArray['soccer'] = array();

        $sql = "SELECT * FROM fussballclubs";
        $result = $this->conn->query($sql);

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                array_push($returnArray['soccer'], array_map("utf8_encode", $row));
            }
        }
        echo json_encode($returnArray);
    }

    function saveClub() {
        $this->saveClubToDatabase();
        $this->getClubs();
    }

    function saveClubToDatabase() {
        if(!isset($_REQUEST['club'])) throw new Exception('Variable Club nicht übergeben');

        $clubObject = json_decode($_REQUEST['club']);

        if(!isset($clubObject->name) || !isset($clubObject->trainer) || !isset($clubObject->stadionname)) {
            throw new Exception('Variable Club nicht richtig initialisiert');
        }

        $statement = $this->conn->prepare("INSERT INTO `fussballclubs` (`clubname`, `stadionname`, `trainer`) VALUES (?, ?, ?)");
        $statement->bind_param("sss", $clubObject->name, $clubObject->stadionname, $clubObject->trainer);
        $result = $statement->execute();
    }

    function deleteClub() {
        $this->deleteClubDatabase();
        $this->getClubs();
    }

     function deleteClubDatabase() {
        if(!isset($_REQUEST['id'])) throw new Exception('Variable clubId nicht übergeben');

        $clubId = $_REQUEST['id'];

        if(!isset($clubId)) throw new Exception('Variable clubId nicht richtig initialisiert');

        $statement = $this->conn->prepare("DELETE FROM `fussballclubs` WHERE `fussballclubs`.`id` = ? ");
        $statement->bind_param("i", $clubId);
        $result = $statement->execute();
        }

    function getMovies() {
        $returnArray = array();
        $returnArray['movies'] = array();

        $sql = "SELECT * FROM filme";
        $result = $this->conn->query($sql);

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                array_push($returnArray['movies'], array_map("utf8_encode", $row));
            }
        }
        echo json_encode($returnArray);
    }

    function saveMovie() {
        $this->saveMovieToDatabase();
        $this->getMovies();
    }

    function saveMovieToDatabase() {

        if(!isset($_REQUEST['mov'])) throw new Exception('Variable mov nicht übergeben');

        $movieObject = json_decode($_REQUEST['mov']);

        if(!isset($movieObject->filmname) || !isset($movieObject->beschreibung) || !isset($movieObject->regisseur)) {
            throw new Exception('Variable mov nicht richtig initialisiert');
        }

        $statement = $this->conn->prepare("INSERT INTO `filme` (`filmname`, `beschreibung`, `regisseur`) VALUES (?, ?, ?)");
        $statement->bind_param("sss", $movieObject->filmname, $movieObject->beschreibung, $movieObject->regisseur);
        $result = $statement->execute();
    }

    function deleteMovie() {
        $this->deleteMovieDatabase();
        $this->getMovies();
    }

    function deleteMovieDatabase() {
        if(!isset($_REQUEST['id'])) throw new Exception('Variable movieId nicht übergeben');

        $movieId = $_REQUEST['id'];

        if(!isset($movieId)) throw new Exception('Variable movieId nicht richtig initialisiert');

        $statement = $this->conn->prepare("DELETE FROM `filme` WHERE `filme`.`id` = ? ");
        $statement->bind_param("i", $movieId);
        $result = $statement->execute();
    }

    function getPlayer() {
        $returnArray = array();
        $returnArray['player'] = array();

        $sql = "
            SELECT
                spieler.id AS id,
                spieler.name AS name,
                spieler.alter AS 'alter',
                spieler.preis AS preis,
                fussballclubs.id AS club_id,
                fussballclubs.clubname AS clubname,
                fussballclubs.stadionname AS stadionname,
                fussballclubs.trainer AS trainer,
                fussballclubs.id AS club_id
            FROM spieler
            LEFT JOIN fussballclubs ON spieler.club_id = fussballclubs.id
        ";

        $result = $this->conn->query($sql);

        if ($result->num_rows > 0) {
           while($row = $result->fetch_assoc()) {
               array_push($returnArray['player'], array_map("utf8_encode", $row));
           }
        }
        echo json_encode($returnArray);
    }

    function savePlayer() {
        $this->savePlayerToDatabase();
        $this->getPlayer();
    }

    function savePlayerToDatabase() {
        if(!isset($_REQUEST['player'])) throw new Exception('Variable player nicht übergeben');

        $playerObject = json_decode($_REQUEST['player']);

        if(!isset($playerObject->name) || !isset($playerObject->alter) || !isset($playerObject->preis)) {
            throw new Exception('Variable player nicht richtig initialisiert');
        }

        $statement = $this->conn->prepare("INSERT INTO `spieler` (`name`, `alter`, `preis`, `club_id`) VALUES (?, ?, ?, ?)");
        $statement->bind_param("siii", $playerObject->name, $playerObject->alter, $playerObject->preis, $playerObject->club->id);
        $result = $statement->execute();
    }

    function deletePlayer() {
        $this->deletePlayerDatabase();
        $this->getPlayer();
    }

    function deletePlayerDatabase() {
        if(!isset($_REQUEST['id'])) throw new Exception('Variable playerId nicht uebergeben');

        $playerId = $_REQUEST['id'];

        if(!isset($playerId)) throw new Exception('Variable playerId nicht richtig initialisiert');

        $statement = $this->conn->prepare("DELETE FROM `spieler` WHERE `spieler`.`id` = ? ");
        $statement->bind_param("i", $playerId);
        $result = $statement->execute();
    }

    function getDefault() {
        $this->getPlayer();
    }
}

$api = new Api();
$api->run();