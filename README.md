# React-Nodejs-Mysql-Todolist

## DB kurulumu

xampp indirilmesi gerekiyor.

https://www.apachefriends.org/tr/download.html

Kurulum tamamlandıktan sonra programı açın.
Ardından Apache ve Mysql serverları start edilmeli.

Serverlar ayağa kalktıktan sonra şu url ile (https://localhost/phpmyadmin) phpmyadmin sayfasına erişilip, "todolist" isminde boş bir db oluşturulmalı.

example.env dosyasının adı .env ismiyle değiştirilmeli. Dikkat edilmesi gereken şey, xampp'te ayağa kalkan mysql serverının portu ile env dosyasındaki mysql portunun aynı olması, genelde 3306 portundan ayağa kalkar ama kontrol etmekte fayda var.

# Konsola yazılacak kodlar

## Server klasörü içerisinde

npm install --save

knex migrate:latest (dbdeki tabloları oluşturur)

knex seed:run (dbdeki tablolara hazır verileri insert eder)

npm start

## Client klasörü içerisinde

npm install --save

npm start

# Test için user bilgileri
Seed'lerde kullanıcı adı furkan, emre ve mahmut olan 3 kullanıcı oluşturuluyor. Hepsinin şifresi 123456.