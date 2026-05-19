import { db } from "./index";

export const initDB = () => {
  // Create table
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS movies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      year INTEGER NOT NULL,
      description TEXT,
      rating REAL,
      genre TEXT,
      imageUrl TEXT
    )
  `;

  db.prepare(createTableQuery).run();

  // Check if table already has data
  const count = db.prepare("SELECT COUNT(*) as count FROM movies").get() as {
    count: number;
  };

  if (count.count === 0) {
    console.log("Seeding database... 🌱");

    const insert = db.prepare(`
      INSERT INTO movies (title, year, description, rating, genre, imageUrl)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const movies = [
      // 🎭 Drama
      [
        "The Shawshank Redemption",
        1994,
        "Two imprisoned men bond over years.",
        9.3,
        "drama",
        "https://picsum.photos/300/450",
      ],
      [
        "Forrest Gump",
        1994,
        "Life story of a simple man.",
        8.8,
        "drama",
        "https://picsum.photos/300/450",
      ],

      // 😂 Comedy
      [
        "The Mask",
        1994,
        "A man discovers a magical mask.",
        6.9,
        "comedy",
        "https://picsum.photos/300/450",
      ],
      [
        "Superbad",
        2007,
        "High school friends on a wild night.",
        7.6,
        "comedy",
        "https://picsum.photos/300/450",
      ],

      // 😱 Horror
      [
        "The Conjuring",
        2013,
        "Paranormal investigators help a family.",
        7.5,
        "horror",
        "https://picsum.photos/300/450",
      ],
      [
        "Get Out",
        2017,
        "A disturbing visit to a girlfriend's family.",
        7.7,
        "horror",
        "https://picsum.photos/300/450",
      ],
    ];

    const insertMany = db.transaction((movies) => {
      for (const movie of movies) {
        insert.run(...movie);
      }
    });

    insertMany(movies);
  }
};
