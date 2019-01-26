create table uzytkownicy (
    nazwa_uzytkownika varchar primary key, 
    haslo varchar not null);


create table zdarzenia (
    id integer primary key autoincrement, 
    nazwa_zdarzenia char(30) not null, 
    data_zdarzenia datetime not null default CURRENT_TIMESTAMP,
    nazwa_uzytkownika varchar not null,
    foreign key(nazwa_uzytkownika) references uzytkownicy(nazwa_uzytkownika));



insert into uzytkownicy (nazwa_uzytkownika, haslo) values ('adm', 'haslo');

insert into zdarzenia(nazwa_zdarzenia, data_zdarzenia, nazwa_uzytkownika) values('Turniej Skokow narciarskich w Zakopanem', '15-01-19 15:30:00', 'adm');
insert into zdarzenia(nazwa_zdarzenia, data_zdarzenia, nazwa_uzytkownika) values ('Mundial', '08-06-18 18:00:00', 'adm');
insert into zdarzenia(nazwa_zdarzenia, data_zdarzenia, nazwa_uzytkownika) values ('Pilka nozna - Polska vs Afganistan', '11-09-18 20:30:00', 'adm');
