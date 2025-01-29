<?php
$to = "fuki150212@gmail.com"; // 送信先のメールアドレス
$subject = "新しい意見・要望が届きました";
$number = $_POST['number'];
$name = $_POST['name'];
$comment = $_POST['comment'];
$body = "学籍番号: $number \n氏名: $name \nご意見:\n$message";
$headers = "From: fuki150212@gmail.com";

// メールを送信
if (mail($to, $subject, $body, $headers)) {
    echo "意見・要望を送信しました！";
} else {
    echo "送信に失敗しました。";
}
?>