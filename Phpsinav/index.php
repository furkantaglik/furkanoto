<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=
    , initial-scale=1.0">
    <title>Document</title>
</head>

<body>


    <?php

    // soru 1
    $bolumler = ["metal", "elektirik", "bilişim", "moda"];
    echo "<table border=1>";
    echo "<tr>";
    echo "<th>Bölümler</th>";
    echo "</tr>";
    foreach ($bolumler as $bolum) {
        echo "<tr>";
        echo "<td> $bolum </td> ";
        echo "</tr>";
    }
    echo "</table>";


    //soru 2
    $sayilar = [10, 10, 10, 10];
    $toplam = array_sum($sayilar);
    $elemanSayisi = count($sayilar);
    $ortalama = $toplam / $elemanSayisi;
    echo "ortalama: $ortalama";


    //soru 3
    $isimler = ["furkan", "ali", "ahmet", "mustafa", "anıl"];
    unset($isimler[1]); //verilen indeksi kaldırır diziden
    array_unshift($isimler, "ekin"); //dizinin başına ekler
    array_shift($isimler); //başından siler
    array_pop($isimler); //sonundan veri siler
    array_push($isimler, "goat"); // sonuna veri ekler
    print_r($isimler);


    //soru 4
    function sayHello($isim)
    {
        echo "Merhaba $isim";
    }
    sayHello("furkan");


    //soru 5
    $boy = 180;
    $kilo = 80;
    ekranayaz(vkiHesapla($boy, $kilo));
    function vkiHesapla($boy, $kilo)
    {
        $boy = $boy / 100;
        $boyHesapla = $boy * $boy;
        $vki = round(($kilo / $boyHesapla), 2);
        return $vki;
    }

    function ekranayaz($vki)
    {
        if ($vki < 18.5) {
            echo "<div style='color: lime'>" . $vki . "<span><br>Zayıf</span></div>";
        } else if ($vki >= 18.5 && $vki < 24.9) {
            echo "<div style='color: limegreen'>" . $vki . "<span><br>Sağlıklı</span></div>";
        } else if ($vki >= 25 && $vki < 29.9) {
            echo "<div style='color: orange'>" . $vki . "<span><br>Fazla Kilolu</span></div>";
        } else if ($vki >= 30 && $vki < 34.9) {
            echo "<div style='color: orange'>" . $vki . "<span><br>I. Derece Obezite</span></div>";
        } else if ($vki >= 35 && $vki < 39.9) {
            echo "<div style='color: red'>" . $vki . "<span><br>II. Derece Obezite</span></div>";
        } else if ($vki >= 40) {
            echo "<div style='color: maroon'>" . $vki . "<span><br>III. Derece Obezite</span></div>";
        }
    }


    //soru 6
    $sayilar2 = array(5, 3, 8, 1);
    $sayi = 10;
    $taban = 2;
    $uss = 3;

    abs($sayi); //mutlak değer
    sqrt($sayi); //karekök hesaplar
    pow($taban, $uss); //üssünü hesaplar
    round($sayi); //sayıyı yuvarlar
    floor($sayi); //aşşağıya yuvarlar
    ceil($sayi); //yukarıya yuvarlar
    echo min($sayilar2); // minimum değer
    echo max($sayilar2); // maksimum değer
    ?>
</body>

</html>