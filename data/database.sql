CREATE TABLE User (
    User_ID INT PRIMARY KEY,
    Username VARCHAR(255),
    Email VARCHAR(255),
    Password VARCHAR(255)
);

CREATE TABLE Album (
    Album_ID INT PRIMARY KEY,
    Title VARCHAR(255),
    Release_Date DATE,
    Cover VARCHAR(255)
);

CREATE TABLE Playlist (
    Playlist_ID INT PRIMARY KEY,
    Name VARCHAR(255),
    Description TEXT,
    Creation_Date DATE,
    Duration INT,
    User_ID INT,
    FOREIGN KEY (User_ID) REFERENCES User(User_ID)
);

CREATE TABLE Artist (
    Artist_ID INT PRIMARY KEY,
    Name VARCHAR(255),
    Bio TEXT,
    Photo VARCHAR(255)
);

CREATE TABLE Favorite (
    Favorite_ID INT PRIMARY KEY,
    Addition_Date DATE,
    User_ID INT,
    FOREIGN KEY (User_ID) REFERENCES User(User_ID)
);

CREATE TABLE History (
    History_ID INT PRIMARY KEY,
    Listen_Date DATE,
    User_ID INT,
    FOREIGN KEY (User_ID) REFERENCES User(User_ID)
);

CREATE TABLE Track (
    Track_ID INT PRIMARY KEY,
    Title VARCHAR(255),
    Duration INT,
    Release_Date DATE,
    Cover VARCHAR(255),
    Album_ID INT,
    History_ID INT,
    FOREIGN KEY (Album_ID) REFERENCES Album(Album_ID),
    FOREIGN KEY (History_ID) REFERENCES History(History_ID)
);

-- Many-to-Many Tables
CREATE TABLE Track_Album (
    Track_ID INT,
    Album_ID INT,
    FOREIGN KEY (Track_ID) REFERENCES Track(Track_ID),
    FOREIGN KEY (Album_ID) REFERENCES Album(Album_ID)
);

CREATE TABLE Track_Artist (
    Track_ID INT,
    Artist_ID INT,
    FOREIGN KEY (Track_ID) REFERENCES Track(Track_ID),
    FOREIGN KEY (Artist_ID) REFERENCES Artist(Artist_ID)
);

CREATE TABLE Track_Playlist (
    Track_ID INT,
    Playlist_ID INT,
    FOREIGN KEY (Track_ID) REFERENCES Track(Track_ID),
    FOREIGN KEY (Playlist_ID) REFERENCES Playlist(Playlist_ID)
);

CREATE TABLE User_Playlist (
    User_ID INT,
    Playlist_ID INT,
    FOREIGN KEY (User_ID) REFERENCES User(User_ID),
    FOREIGN KEY (Playlist_ID) REFERENCES Playlist(Playlist_ID)
);
