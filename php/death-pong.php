<!DOCTYPE html>
<html lang="en">

<head>
     <meta charset="UTF-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Death Pong of the Shadow of Love</title>
     <link rel="stylesheet" href="/style/style.css">
</head>

<body>
     <div class=header>
          <div class=header-page>
               <a href="/">Règle</a>
               <a href="/death-pong">Jeu</a>
               <a href="/credit">Crédit</a>
          </div>
          <h1>death-pong</h1>
          <audio src="public/style/assets/deathnotes-theme.mp3" autoplay></audio>

     </div>
     <div class="main">
          <section class="death-note">
               <div class="header-death-note">
                    <!-- <h2>A tuer :</h2> -->
                    <form class="firstname-form" method="post" action="traitement.php">
                         <label for="firstname" class="firstnam-text">La personne a tuer : </label>
                         <input type="text" class="firstname-input" name="firstname" placeholder="Prénom" size="30" maxlength="25" value="" autofocus />

                         <input type="submit" name="send" value="Tuer" class="firstname-submit">

                    </form>
                    <div class="timer"></div>
                    <div class="score"></div>
               </div>
               <div class="death-list">
                    <h2>Liste des morts : </h2>
                    <ul class="death-person">
                         <!-- <li></li> -->
                    </ul>
               </div>
          </section>
          <section class="death-pong">
               <div class="pong-container">
                    <!-- <canvas id="myCanvas" widht="600" height="500"></canvas> -->
                    <canvas id="myCanvas" width="480px" height="530px"></canvas>
               </div>
          </section>
     </div>


     <script src="/index.js"></script>
</body>

</html>