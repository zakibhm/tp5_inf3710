const { cp } = require('fs');
const {Client} = require('pg');
const client = new Client({
  user: "postgres",
    database: "hopital_bd",
    password: "zaki2003",
    port: 5432,          // Attention ! Peut aussi être 5433 pour certains utilisateurs
    host: "127.0.0.1",
    keepAlive: true
});
const id = 0;
client.connect();

async function getMedecins() {
  const existingMedecin = await client.query('SELECT * FROM Medecins WHERE idmedecin = $1', [id]);
  if (existingMedecin.rows.length === 0) {
    console.log('Medecin not found');
  }
  else
    console.log(existingMedecin)
}

(async () => {
  try {
    await getMedecins();
    // Any other code to execute after getMedecins() completes
  } catch (error) {
    console.error('Error:', error);
  } finally {
    client.end(); // Close the PostgreSQL client connection when done
  }
})();



// client.query(`SELECT idmedecin FROM Medecins`, (err, res) => {
//   if(!err)
//     console.log(res.rows);
//   else
//     console.log("this is an error :",err);

//   client.end();
// });