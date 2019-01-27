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