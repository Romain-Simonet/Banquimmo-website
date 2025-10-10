<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $mail = new PHPMailer(true);

    try {
        // --- CONFIG MAILTRAP ---
        $mail->isSMTP();
        $mail->Host       = 'sandbox.smtp.mailtrap.io';
        $mail->SMTPAuth   = true;
        $mail->Port       = 2525;
        $mail->Username   = 'eb10b9c91e84b5';  // ✅ Tes identifiants Mailtrap
        $mail->Password   = '7f65f7206b536e';  // ✅ Tes identifiants Mailtrap
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

        // --- EXPÉDITEUR / DESTINATAIRE ---
        $mail->setFrom('no-reply@banquimmo.fr', 'Banquimmo');
        $mail->addAddress('rsimonet@banquimmo.fr'); // ou ton adresse de test

        $mail->CharSet = 'UTF-8';
        $mail->Encoding = 'base64';

        // --- CONTENU DU MAIL ---
        $mail->isHTML(true);
        $mail->Subject = 'Nouveau message depuis le site Banquimmo';

        $body = "
        <h2>Nouvelle demande de contact</h2>
        <p><strong>Nom :</strong> {$_POST['nom']}</p>
        <p><strong>Email :</strong> {$_POST['email']}</p>
        <p><strong>Téléphone :</strong> {$_POST['telephone']}</p>
        <p><strong>Type de prêt :</strong> {$_POST['type_pret']}</p>
        <p><strong>Montant estimé :</strong> {$_POST['montant']}</p>
        <p><strong>Ville :</strong> {$_POST['ville']}</p>
        <p><strong>Message :</strong> {$_POST['message']}</p>
        ";

        $mail->Body = $body;

        // --- ENVOI ---
        $mail->send();

        // --- CONFIRMATION + REDIRECTION ---
        echo "<script>
          window.location.href = '../html/thanks.html';
        </script>";
        exit;

    } catch (Exception $e) {
        echo "<h2 style='color:red; text-align:center;'>❌ Erreur : le mail n'a pas pu être envoyé.</h2>";
        echo "<pre>{$mail->ErrorInfo}</pre>";
    }
}
?>
