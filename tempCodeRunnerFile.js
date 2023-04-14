const hash = bcrypt.hash(dbUsers[0].password, 10);
  dbUsers[0].password = hash;