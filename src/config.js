// Credenciales de ejemplo: las mismas que el servicio mysql de ../docker-compose.yml.
// "mysql" es el nombre de ese servicio. Para correr el backend fuera de Docker usa
// host "127.0.0.1" y port 3307.
export const dbConfig = {
    host: "some-mysql2",
    port: 3306,
    database: "tasks",
    user: "root",
    password: "root",
};
