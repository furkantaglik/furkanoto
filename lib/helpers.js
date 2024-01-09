export function formatDate(tarihMetni) {
  if (!tarihMetni) {
    return "Bekleniyor.";
  }
  const tarih = new Date(tarihMetni);

  const gunler = [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
  ];
  const aylar = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  const gun = tarih.getDate();
  const ay = tarih.getMonth();
  const yil = tarih.getFullYear();
  const haftaninGunu = tarih.getDay();

  const formattedTarih = `${gunler[haftaninGunu]} ${gun} ${aylar[ay]} ${yil}`;

  return formattedTarih;
}
